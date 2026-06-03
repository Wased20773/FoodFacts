import './VoiceButton.css'

type VoiceButtonProps = {
  isListening: boolean;
  onClick: () => void;
}

export default function VoiceButton({ isListening, onClick }: VoiceButtonProps): React.JSX.Element {
  return (
    <div className='speak-button-container'>
      {/* Orbs */}
      <div
        className={`orb-1 ${isListening ? 'active' : ''}`}
      ></div>
      <div
        className={`orb-2 ${isListening ? 'active' : ''}`}
      ></div>

      {/* Button */}
      <button 
        className={`${isListening ? 'speaking-active' : ''}`}
        id='speak-button'
        type='button'
        onClick={onClick}
      >
        { isListening ? 'Listening' : 'Say Something' }
      </button>
    </div>
  )
}