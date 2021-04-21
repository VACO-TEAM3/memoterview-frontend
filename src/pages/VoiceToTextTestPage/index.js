import React, { useState } from "react";
import { ReactMic } from "react-mic";
import recognizeMicrophone from "watson-speech/speech-to-text/recognize-microphone";

import { getSpeechToTextToken } from "../../api";

export default function VoiceToTextTestPage() {
  const [text, setText] = useState([]);
  const [record, setRecord] = useState(false);

  function onClickKaKaoButton() {
    setRecord(!record);
  }

  function onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  async function onStop(recordedBlob) {
    console.log("recordedBlob is: ", recordedBlob);

    console.log(JSON.stringify(recordedBlob));

    let form = new FormData();
    form.append("file", recordedBlob.blob);

    console.log(form);

    const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/api/speech-to-text/kakao`, {
      method: "POST",
      body: form,
    });
  }


  async function onClickIBMButton() {
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
      <button id="button" onClick={onClickIBMButton}>
        IBM 실시간 음성인식
      </button>
      <button id="button" onClick={onClickKaKaoButton}>
        {record ? "카카오 음성인식 종료" : "카카오 음성인식 시작"}
      </button>
      {/* <button id="button" onClick={onClickGoogleButton}>
        {record ? "구글 음성인식 종료" : "구글 음성인식 시작"}
      </button> */}
      <ReactMic
        record={record} // defaults -> false.  Set to true to begin recording
        visualSetting="sinewave" // defaults -> "sinewave".  Other option is "frequencyBars"
        onStop={onStop} // required - called when audio stops recording
        onData={onData} // optional - called when chunk of audio data is available
        strokeColor="#000000" // sinewave or frequency bar color
        backgroundColor="#FF4081" // background color
        mimeType="audio/wav" // defaults -> "audio/webm".  Set to "audio/wav" for WAV or "audio/mp3" for MP3 audio format (available in React-Mic-Gold)
        // echoCancellation={true} // defaults -> false
        // noiseSuppression={true} // defaults -> false
        channelCount={1} // defaults -> 2 (stereo).  Specify 1 for mono.
        // bitRate={256000} // defaults -> 128000 (128kbps).  React-Mic-Gold only.
        sampleRate={16000} // defaults -> 44100 (44.1 kHz).  It accepts values only in range: 22050 to 96000 (available in React-Mic-Gold)
        // timeSlice={3000} // defaults -> 4000 milliseconds.  The interval at which captured audio is returned to onData callback (available in React-Mic-Gold).
      />
      <h1>{text.join(" ")}</h1>
    </div>
  );
}
