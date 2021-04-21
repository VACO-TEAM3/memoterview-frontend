import React, { useEffect, useState } from "react";

export default function VoiceToTextTestPage() {
  const [text, setText] = useState([]);
  const [record, setRecord] = useState(false);

  // Speech Recognition 관련 Side Effect
  useEffect(() => {
    if (record) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition = null;

      if (SpeechRecognition) {
        recognition = new SpeechRecognition();

        recognition.onstart = function () {
          console.log(
            "Voice recognition started. Try speaking into the microphone."
          );
        };

        recognition.lang = "ko";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = function (event) {
          const transcript = [...event.results].reduce(
            (acc, result) => acc + result[0].transcript,
            ""
          );
          setText(text.concat(transcript));
        };

        recognition.start();
      } else {
        console.error("Speech recognition not supported 😢 (Use Chrome Browser)");
      }

      return () => recognition.stop();
    }
  }, [record, text]);

  return (
    <div>
      <button id="button" onClick={handleClickRecord}>
        {record ? "녹음 시작" : "녹음 종료"}
      </button>
      {/* <button id="button" onClick={onClickGoogleButton}>
        {record ? "구글 음성인식 종료" : "구글 음성인식 시작"}
      </button> */}

      <h1>{text.join(" ")}</h1>
    </div>
  );
}
