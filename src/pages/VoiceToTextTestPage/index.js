import React, { useState } from "react";
import recognizeMicrophone from "watson-speech/speech-to-text/recognize-microphone";

import { getSpeechToTextToken } from "../../api";

export default function VoiceToTextTestPage() {
  const [text, setText] = useState();
  
  async function onClickButton() {
    const token = await getSpeechToTextToken();

    const micRecognizer = recognizeMicrophone({
      token,
      model: "ko-KR_BroadbandModel", //ko-KR_NarrowbandModel
      objectMode: true,
      format: true,
      timestamps: true,
    });

    micRecognizer.on("data", (data) => {
      console.log(data);
      setText(data.alternatives[0].transcript);
    });
    micRecognizer.on("error", (err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <button id="button" onClick={onClickButton}>
        Listen To Microphone
      </button>
      <div>{text}</div>
    </div>
  );
}
