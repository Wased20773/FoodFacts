import { useEffect, useRef, useState } from 'react';
import VoiceButton from './components/VoiceButton';
import FoodResultCard from './components/FoodResultCard';
import { detectIntent } from './utils/intentDetector';
import { searchFood } from './api/foodApi';
import type { FoodProduct } from './types/food';
import type { NutrientSlot } from './utils/slots';
import './App.css'
import Loading from './components/Loading';
import CompareResultsCard from './components/CompareResultsCard';
import MessageToast from './components/MessageToast';
import type { Toast } from './types/toast';

function App() {
  const [transcript, setTranscript] = useState<string>('');
  const latestTranscriptRef = useRef<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<FoodProduct | null>(null);
  const [secondProduct, setSecondProduct] = useState<FoodProduct | null>(null);
  const [selectedNutriment, setSelectedNutriment] = useState<NutrientSlot | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // For textarea height adjustment
  // const MIN_TEXTAREA_HEIGHT: number = 40;

  async function handleVoiceCommand(command: string) {
    const detected = detectIntent(command);
    setSelectedNutriment(null);
    setShowResults(false);
    setIsLoading(true);

    let message: string = '';
    
    try {
      switch (detected.intent) {
        case 'SearchFoodIntent': {
          const productName = detected.slots.productName;

          if (!productName) {
            message += 'Please say a product name';
            setResponseMessage(message);
            speak(message);
            return;
          }

          const data = await searchFood(productName);
          const product = data.products[0];

          if (!product) {
            message += `I could not find ${productName}`;
            setResponseMessage(message);
            speak(message);
            return;
          }

          message += `I found ${product.product_name}...`;

          if (product.brands) {
            message += ` This product is from ${product.brands}...`;
          }

          if (product.nutriments?.['energy-kcal_100g']) {
            message += aboutNutriment('calories', product.nutriments?.['energy-kcal_100g']);
          }

          if (product.nutriscore_grade) {
            message += ` Its Nutri-Score is ${product.nutriscore_grade.toUpperCase()}... ${isNutriscoreGood(product.nutriscore_grade)}`;
          }

          if (product.nutriments) {
            message += ` You can view its full ingredients and nutriments listed in the displayed card.`
          }

          setSelectedProduct(product);
          setSecondProduct(null);
          setResponseMessage(message);
          speak(message);
          setIsLoading(false);
          setShowResults(true);
          break;
        }

        case 'ProductNutritionIntent': {
          const productName = detected.slots.productName;
          const nutrient = detected.slots.nutrient;

          if (!productName || !nutrient) {
            message += 'Please say a product and nutrient';
            setResponseMessage(message);
            speak(message);
            return;
          }

          const data = await searchFood(productName);
          const product = data.products[0];

          if (!product) {
            message += `I could not find ${productName}`;
            setResponseMessage(message);
            speak(message);
            return;
          }

          setSelectedProduct(product);
          setSecondProduct(null);

          const value = getNutrientValue(product, nutrient);

          if (value === undefined || value === null) {
            message += `I could not find ${nutrient} information for ${product.product_name}`;
            setResponseMessage(message);
            speak(message);
            return;
          }

          message += `${product.product_name} has ${value} ${getNutientUnit(nutrient)} of ${nutrient} per 100 grams.`;
          message += aboutNutriment(nutrient, value);
          
          setSelectedNutriment(nutrient);
          setResponseMessage(message);
          speak(message);
          setIsLoading(false);
          setShowResults(true);
          break;
        }

        case 'CompareProductsIntent': {
          const productName = detected.slots.productName;
          const secondProductName = detected.slots.secondProductName;

          if (!productName || !secondProductName) {
            message += 'Please say two products to compare';
            setResponseMessage(message);
            speak(message);
            return;
          }

          const firstData = await searchFood(productName);
          const secondData = await searchFood(secondProductName);

          const firstProduct = firstData.products[0];
          const comparedProduct = secondData.products[0];

          if (!firstProduct && !comparedProduct) {
            message += `Sorry, I could not find ${productName} and ${secondProductName} as products`;
            setResponseMessage(message);
            speak(message);
            return;
          }

          if (!firstProduct) {
            message += `Sorry, I could not find ${productName} as a product`;
            setResponseMessage(message);
            speak(message);
            return;
          }

          if (!comparedProduct) {
            message += `Sorry, I could not find ${secondProductName} as a product`;
            setResponseMessage(message);
            speak(message);
            return;
          }

          message += `Comparing ${firstProduct.product_name} and ${comparedProduct.product_name}.`;

          message += compareNutriment(
            'calories',
            firstProduct.product_name ?? 'First Product',
            firstProduct.nutriments?.['energy-kcal_100g'] ?? 0,
            comparedProduct.product_name ?? 'Second Product',
            comparedProduct.nutriments?.['energy-kcal_100g'] ?? 0,
          );

          message += compareNutriment(
            'sugar',
            firstProduct.product_name ?? 'First Product',
            firstProduct.nutriments?.sugars_100g ?? 0,
            comparedProduct.product_name ?? 'Second Product',
            comparedProduct.nutriments?.sugars_100g ?? 0,
          );

          message += compareNutriment(
            'fat',
            firstProduct.product_name ?? 'First Product',
            firstProduct.nutriments?.fat_100g ?? 0,
            comparedProduct.product_name ?? 'Second Product',
            comparedProduct.nutriments?.fat_100g ?? 0,
          );

          message += compareNutriment(
            'protein',
            firstProduct.product_name ?? 'First Product',
            firstProduct.nutriments?.proteins_100g ?? 0,
            comparedProduct.product_name ?? 'Second Product',
            comparedProduct.nutriments?.proteins_100g ?? 0,
            true, // higher protein is better
          );

          message += compareNutriment(
            'salt',
            firstProduct.product_name ?? 'First Product',
            firstProduct.nutriments?.salt_100g ?? 0,
            comparedProduct.product_name ?? 'Second Product',
            comparedProduct.nutriments?.salt_100g ?? 0,
          );

          message += compareNutriment(
            'sodium',
            firstProduct.product_name ?? 'First Product',
            firstProduct.nutriments?.sodium_100g ?? 0,
            comparedProduct.product_name ?? 'Second Product',
            comparedProduct.nutriments?.sodium_100g ?? 0,
          );

          if (firstProduct.nutriscore_grade && comparedProduct.nutriscore_grade) {
            if (firstProduct.nutriscore_grade === 'not-applicable' || comparedProduct.nutriscore_grade === 'not-applicable') {
              message += ` Although, one of them does not have a nutriscore so i cannot say for certain which one is better.`  
            } else if (firstProduct.nutriscore_grade < comparedProduct.nutriscore_grade) {
              message += ` ${firstProduct.product_name} has a better Nutri-Score.`;
            } else if (firstProduct.nutriscore_grade > comparedProduct.nutriscore_grade) {
              message += ` ${comparedProduct.product_name} has a better Nutri-Score.`;
            } else message += ` However, they both have the same Nutriscore grade of ${firstProduct.nutriscore_grade.toUpperCase()}`
          } else {
            message += ` Although, one of them does not have a nutriscore so i cannot say for certain which one is better.`
          }

          setSelectedProduct(firstProduct);
          setSecondProduct(comparedProduct);
          setResponseMessage(message);
          speak(message);
          setIsLoading(false);
          setShowResults(true);
          break;
        }

        case 'UnknownIntent': {
          message += 'Sorry, I did not understand. Try saying: search for Nutella, how much sugar does Nutella have, or compare Nutella and apple slices';
          setResponseMessage(message);
          speak(message);
          setIsLoading(false);
          setShowResults(true);
          break;
        }
      }
    } catch (error) {
      console.error('Voice command error:', error);
      setIsLoading(false);

      setSelectedProduct(null);
      setSecondProduct(null);

      message += error instanceof Error ? error.message : 'The Open Food Facts database is currently unavailable.';

      setResponseMessage(message);
      speak(message);
      addToast(message);
    }
  }

  function getNutrientValue(product: FoodProduct, nutrient: string): number | undefined {
    switch (nutrient) {
      case 'calories':
        return product.nutriments?.['energy-kcal_100g'];

      case 'sugar':
        return product.nutriments?.sugars_100g;

      case 'fat':
        return product.nutriments?.fat_100g;

      case 'protein':
        return product.nutriments?.proteins_100g;

      case 'salt':
        return product.nutriments?.salt_100g;

      case 'sodium':
        return product.nutriments?.sodium_100g;

      default:
        return undefined;
    }
  }

  function getNutientUnit(nutrient: string): string {
    if (nutrient === 'calories') {
      return 'kcal';
    }

    if (nutrient === 'nutriscore' || nutrient === 'nutri-score') {
      return '';
    }

    return 'grams';
  }

  function aboutNutriment(nutriment: NutrientSlot, value: number): string {
    // Calories
    if (nutriment === 'calories') {
      if (value === 0) return ' It has zero calories.';
      if (value < 80) return ' It is relatively low in calories.';
      if (value <= 150) return ' It contains a moderate amount of calories.';
      if (value <= 300) return ' It is relatively high in calories.'
      return ' It is high in calories';
    }

    // Sugar
    if (nutriment === 'sugar') {
      if (value === 0) return ' It has zero sugar.';
      if (value < 5) return ' It is relatively low in sugar.';
      if (value <= 20) return ' It contains a moderate amount of sugar.';
      return ' It is relatively high in sugar.';
    }

    // Fat
    if (nutriment === 'fat') {
      if (value === 0) return ' It has zero fat'
      if (value < 3) return ' It is relatively low in fat.';
      if (value <= 17) return ' It contains a moderate amount of fat.';
      return ' It is relatively high in fat.';
    }

    // Protein
    if (nutriment === 'protein') {
      if (value === 0) return ' It has zero protein';
      if (value < 5) return ' It is relatively low in protein.';
      if (value <= 20) return ' It is a good source of protein.';
      return ' It is very high in protein.';
    }

    // Salt
    if (nutriment === 'salt') {
      if (value === 0) return ' It has zero salt';
      if (value < 0.3) return ' It is relatively low in salt.';
      if (value <= 1.5) return ' It contains a moderate amount of salt.';
      return ' It is relatively high in salt.';
    }

    // Sodium
    if (nutriment === 'sodium') {
      if (value === 0) return ' It has zero sodium';
      if (value < 0.12) return ' It is relatively low in sodium.';
      if (value <= 0.6) return ' It contains a moderate amount of sodium.';
      return ' It is relatively high in sodium.';
    }

    return '';
  }

  function compareNutriment(
    nutriment: string,
    firstProductName: string,
    firstValue: number,
    secondProductName: string,
    secondValue: number,
    higherIsBetter: boolean = false,
  ): string {
    if (firstValue === 0 && secondValue === 0) return ` Both products have zero ${nutriment}.`
    if (firstValue === 0) return ` ${firstProductName} has no ${nutriment} compared to ${secondProductName}.`
    if (secondValue === 0) return ` ${secondProductName} has no ${nutriment} compared to ${firstProductName}. `
    if (firstValue === secondValue) return ` Both products have the same ${nutriment} value.`
    
    if (higherIsBetter) {
      return firstValue > secondValue
        ? ` ${firstProductName} has more ${nutriment}.`
        : ` ${secondProductName} has more ${nutriment}.`;
    }

    return firstValue < secondValue
      ? ` ${firstProductName} has less ${nutriment}.`
      : ` ${secondProductName} has less ${nutriment}.`;
  }

  function isNutriscoreGood(value: string): string {
    switch (value.toUpperCase()) {
      case 'A':
        return ' It has an excellent Nutri-Score.';
      case 'B':
        return ' It has a good Nutri-Score.';
      case 'C':
        return ' It has an average Nutri-Score.';
      case 'D':
        return ' It has a below average Nutri-Score.';
      case 'E':
        return ' It has a poor Nutri-Score.';
      default:
        return '';
    }
  }

  function startListening(): void {
    if (recognitionRef.current) return;

    const RecognitionClass:
      | SpeechRecognitionConstructor
      | undefined = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!RecognitionClass) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    
    const recognition: SpeechRecognition = new RecognitionClass();

    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    latestTranscriptRef.current = '';

    recognition.onstart = (): void => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent): void => {
      let text: string = '';

      for (let i: number = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      latestTranscriptRef.current = text.trim();
      setTranscript(text.trim());
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = (): void => {
      recognitionRef.current = null;
      setIsListening(false);
      if (latestTranscriptRef.current) {
        handleVoiceCommand(latestTranscriptRef.current);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }
  
  function stopListening(): void {
    recognitionRef.current?.stop();
  }

  function toggleListening(): void {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }

  function speak(message: string): void {
    getVoices();

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);

    utterance.voice = selectedVoiceRef.current;
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.25;

    window.speechSynthesis.speak(utterance);
  }

  // A test function to see all the available voices
  function getVoices(): void {
    const voices = speechSynthesis.getVoices();

    voices.forEach((voice) => {
        console.log(
            voice.name,
            voice.lang,
            voice.default
        );
    });
  }

  useEffect(() => {
    function loadVoices(): void {
        const voice = window.speechSynthesis
            .getVoices()
            .find((voice) => voice.name === 'Google UK English Male');

        selectedVoiceRef.current = voice ?? null;
    }

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
        window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  function handleTranscriptChange(value: string): void {
    // Below is used for textarea to grow its height upward 
    // const textarea = event.target;

    // textarea.style.height =`${MIN_TEXTAREA_HEIGHT}px`;
    // textarea.style.height = `${Math.max(
    //   textarea.scrollHeight,
    //   MIN_TEXTAREA_HEIGHT
    // )}px`;
    // 
    // setTranscript(textarea.value);

    setTranscript(value);
  }

  function addToast(message: string): void {
    const id = Date.now();

    setToasts(prev => [ ...prev, { id, message } ]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 8000);
  }

  return (
    <div className='app-container'>
      <h1 className='heading-interface'>Food Facts VUI</h1>

      {/* Loading View */}
      {isLoading ?  (
        <Loading/>
      ) : selectedProduct && secondProduct ? (
        /* Compare Foods */
        <CompareResultsCard firstProdcut={selectedProduct} secondProduct={secondProduct}/>
      ) : (
        /* Searched foods */
        <section className={`result-section ${showResults ? 'loading-results' : ''}`}>
          <FoodResultCard
            product={selectedProduct}
            selectedNutriment={selectedNutriment}
          />
        </section>
      )}

      {/* Toast */}
      <div className='toast-stack'>
        {toasts.map(toast => (
          <MessageToast key={toast.id} message={toast.message} />
        ))}
      </div>
      
      {/* For rendering compared results */}

      <VoiceButton isListening={isListening} loading={isLoading} showResults={showResults} onClick={toggleListening} />

      <section id='transcript-section'>
        <input
          className='voice-input-field'
          type='text'
          value={transcript}
          placeholder='Ask me something...'
          onChange={(event) => handleTranscriptChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleVoiceCommand(transcript);
            }
          }}
        />
      </section>
    </div>
  )
}

export default App

/*
{
            code: '3017620422003',
            product_name: 'Nutella',
            brands: 'Nutella, Yum yum',
            image_front_url: 'https://images.openfoodfacts.org/images/products/500/016/803/6991/front_en.32.400.jpg',
            ingredients_text: 'Sucre, huile de palme, NOISETTES 13%, cacao maigre 7,4%, LAIT écrémé en poudre 6,6%, LACTOSERUM en poudre, émulsifiants: lécithines [SOJA), vanilline. Sans gluten.',
            nutriments: {
              'energy-kcal_100g': 539,
              sugars_100g: 56.3,
              fat_100g: undefined,
              proteins_100g: undefined,
            },
            nutriscore_grade: 'e'
          }
*/
