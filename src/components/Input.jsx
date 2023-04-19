import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


export default function Input({ onSendMessage }) {
  const [text, setText] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (text !== "" || transcript !== ""  ) {
        var inputMessage = text != "" ? text : transcript;
        onSendMessage(inputMessage);
    }

    setText(""); 
  }

  return (
    <form className="send-container" onSubmit={onSubmit}>
      <input
        type="text"
        className="message-input"
        spellCheck="false"
        value={text || transcript} 
        onChange={onChange}
      />
 
      <button 
        type="submit"
        className="send-button">
          SEND
      </button>
      
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>

    </form>
  );
}
