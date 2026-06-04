import { useRef, useState } from 'react';
import VoiceButton from './components/VoiceButton';
import './App.css'
import FoodResultCard from './components/FoodResultCard';

function App() {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const MIN_TEXTAREA_HEIGHT: number = 40;

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

    recognition.onstart = (): void => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent): void => {
      let text: string = '';

      for (let i: number = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = (): void => {
      recognitionRef.current = null;
      setIsListening(false);
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

  function handleTranscriptChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const textarea = event.target;

    textarea.style.height =`${MIN_TEXTAREA_HEIGHT}px`;
    textarea.style.height = `${Math.max(
      textarea.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;

    setTranscript(textarea.value);
  }

  return (
    <div className='app-container'>
      <h1 className='heading-interface'>Food Facts VUI</h1>

      {/* For rendering searched foods */}
      <section>
        <FoodResultCard
          product={{
            code: '11fedfsadaf',
            product_name: 'Nutella',
            brands: 'Nutella, Yum yum',
            image_front_url: 'https://images.openfoodfacts.org/images/products/000/008/017/6800/front_en.273.400.jpg',
            ingredients_text: 'Sucre, huile de palme, NOISETTES 13%, cacao maigre 7,4%, LAIT écrémé en poudre 6,6%, LACTOSERUM en poudre, émulsifiants: lécithines [SOJA), vanilline. Sans gluten.',
            nutriments: {
              'energy-kcal_100g': 539,
              sugars_100g: 56.3,
              fat_100g: undefined,
              proteins_100g: undefined,
            },
            nutriscore_grade: 'e'
          }}
        />
      </section>

      {/* For rendering compared results */}


      <VoiceButton isListening={isListening} onClick={toggleListening} />

      <section id='transcript-section'>
        <textarea
          className='voice-input-field'
          value={transcript}
          placeholder='Ask me something...'
          onChange={handleTranscriptChange}
        ></textarea>
      </section>
    </div>
  )
}

export default App
