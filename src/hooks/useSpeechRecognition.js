import { useState } from "react";

import { startSpeechRecognition, stopSpeechRecognition } from "../utils/speechRecognition";

export default function useSpeechRecognition() {
  const [recogText, setRecogText] = useState();

  function handleRecognitionStart() {
    console.log("init recogText");
    setRecogText("");
  }

  function handleRecognitionResult(transcript) {
    setRecogText(transcript);
  }

  function startRecognition() {
    startSpeechRecognition({
      onRecognitionStart: handleRecognitionStart,
      onRecognitionResult: handleRecognitionResult,
    });
  };

  return { recogText, startRecognition, stopRecognition: stopSpeechRecognition };
}
