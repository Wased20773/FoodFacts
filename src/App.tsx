import { useRef, useState } from 'react';
import VoiceButton from './components/VoiceButton';
import FoodResultCard from './components/FoodResultCard';
import { detectIntent } from './utils/intentDetector';
import { searchFood } from './api/foodApi';
import type { FoodProduct } from './types/food';
import './App.css'

function App() {
  const [transcript, setTranscript] = useState<string>('');
  const latestTranscriptRef = useRef<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<FoodProduct | null>(null);
  const [secondProduct, setSecondProduct] = useState<FoodProduct | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // for textarea height adjustment
  const MIN_TEXTAREA_HEIGHT: number = 40;

  async function handleVoiceCommand(command: string) {
    const detected = detectIntent(command);

    try {
      switch (detected.intent) {
        case 'SearchFoodIntent': {
          const productName = detected.slots.productName;
  
          if (!productName) {
            setResponseMessage('Please say a product name. ');
            return;
          }
  
          const data = await searchFood(productName);
          const product = data.products[0];
  
          if (!product) {
            setResponseMessage(`I could not find ${productName}. `);
            return;
          }
  
          setSelectedProduct(product);
          setSecondProduct(null);
          setResponseMessage(`I found ${product.product_name}. `);
          break;
        }
  
        case 'ProductNutritionIntent': {
          const productName = detected.slots.productName;
          const nutrient = detected.slots.nutrient;
  
          if (!productName || !nutrient) {
            setResponseMessage('Please say a product and nutrient. ');
            return;
          }
  
          const data = await searchFood(productName);
          const product = data.products[0];
  
          if (!product) {
            setResponseMessage(`I could not find ${productName}. `);
            return;
          }
  
          setSelectedProduct(product);
          setSecondProduct(null);
  
          const value = getNutrientValue(product, nutrient);
  
          if (value === undefined || value === null) {
            setResponseMessage(`I could not find ${nutrient} information for ${product.product_name}. `);
            return;
          }
  
          setResponseMessage(`${product.product_name} has ${value} ${getNutientUnit(nutrient)} of ${nutrient} per 100 grams. `);
          break;
        }
  
        case 'CompareProductsIntent': {
          const productName = detected.slots.productName;
          const secondProductName = detected.slots.secondProductName;
  
          if (!productName || !secondProductName) {
            setResponseMessage('Please say two products to compare.');
            return;
          }
  
          const firstData = await searchFood(productName);
          const secondData = await searchFood(secondProductName);
  
          const firstProduct = firstData.products[0];
          const comparedProduct = secondData.products[0];
  
          if (!firstProduct || !comparedProduct) {
            setResponseMessage('I could not find one of the products.');
            return;
          }
  
          setSelectedProduct(firstProduct);
          setSecondProduct(comparedProduct);
          setResponseMessage(`Comparing ${firstProduct.product_name} and ${comparedProduct.product_name}.`);
          break;
        }
  
        case 'UnknownIntent': {
          setResponseMessage(
            'Sorry, I did not understand. Try saying: search for Nutella, how much sugar does Nutella have, or compare Nutella and apple slices.'
          );
          break;
        }
      }
    } catch (error) {
      console.error('Voice command error:', error);

      setSelectedProduct(null);
      setSecondProduct(null);

      if (error instanceof Error) {
        setResponseMessage(error.message);
      }

      setResponseMessage('The Open Food Facts database is currently unavailable. ');
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

  return (
    <div className='app-container'>
      <h1 className='heading-interface'>Food Facts VUI</h1>

      {/* For rendering searched foods */}
      <section className='result-section'>
        <FoodResultCard
          product={selectedProduct}
        />
      </section>

      {/* For rendering compared results */}


      <VoiceButton isListening={isListening} onClick={toggleListening} />

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
