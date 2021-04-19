let stream;

async function mediaStream() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    return stream;
  } catch (error) {
    console.error(error);
  }
}

export const mediaStreaming = {
  Initialize() {
    return mediaStream();
  },
  getStream() {
    return stream;
  },
};
