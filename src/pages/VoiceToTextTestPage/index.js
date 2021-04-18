import React from "react";

export default function VoiceToTextTestPage() {
  function onClickButton() {
    
  }
  
  return (
    <div>
      <button id="button" onClick={onClickButton}>
        Listen To Microphone
      </button>
      <div>{this.state.text}</div>
    </div>
  );
}
