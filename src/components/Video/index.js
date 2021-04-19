import { useRef } from "react";

export default function Video() {
  const videoRef = useRef(null);

  try {
    async function getMediaStream() {
      const constraints = { video: true, audio: true };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      const video = videoRef.current;
      
      video.srcObject = mediaStream;
    }

    getMediaStream(); // 왜 이렇게 해야 비동기 작업이 되는건지 영문을 모르겠네..?
  } catch (error) {
    console.error(error);
  }
  return (
    <video ref={videoRef} autoPlay playsInline controls="false"></video>
  );
}
