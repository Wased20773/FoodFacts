import { useRef, useState } from 'react';
import VoiceButton from './components/VoiceButton';
import './App.css'

function App() {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  function startListening(): void {
    const SpeechRecognitionConstructor:
      | SpeechRecognitionConstructor
      | undefined = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    
    const recognition: SpeechRecognition = new SpeechRecognitionConstructor();

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
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }
  
  function stopListening(): void {
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  function toggleListening(): void {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }

  return (
    <>
      <h1>Food Facts VUI</h1>

      <VoiceButton isListening={isListening} onClick={toggleListening} />

      <section id='transcript-section'>
        <h2>Transcript</h2>
        <p>{transcript || 'Say something...'}</p>
      </section>
    </>
  )
}

export default App
