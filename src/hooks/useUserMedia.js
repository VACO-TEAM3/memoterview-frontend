import { useEffect, useState } from "react";

export default function useUserMedia(mediaOption) {
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    async function getLocalStream(constraints) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        setLocalStream(stream);
        navigator.mediaDevices.getUserMedia(constraints);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(localStream);
    if (!localStream) {
      getLocalStream(mediaOption);

      return;
    }

    return () => {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [localStream, mediaOption]);

  return { localStream };
}
