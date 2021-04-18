import React, { useState } from "react";
import recognizeMicrophone from "watson-speech/speech-to-text/recognize-microphone";

import { getSpeechToTextToken } from "../../api";

export default function VoiceToTextTestPage() {
  const [text, setText] = useState([]);
  
  async function onClickButton() {
    const { accessToken, serviceUrl } = await getSpeechToTextToken();

    const micRecognizer = recognizeMicrophone({
      accessToken,
      model: "ko-KR_BroadbandModel", //ko-KR_NarrowbandModel
      objectMode: true,
      format: true,
      timestamps: true,
      url: serviceUrl,
    });

    micRecognizer.on("data", (data) => {
      console.log(data);
      const msg = data.results[0].alternatives[0].transcript;
      setText(text.concat(msg));
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
      <div>{text.join(" ")}</div>
    </div>
  );
}
