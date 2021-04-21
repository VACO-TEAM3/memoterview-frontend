export async function mediaStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    return stream;
  } catch (error) {
    console.error(error);
  }
}

export const mediaOptions = {
  audioOff(stream) {
    return stream.getAudioTracks()[0].stop();
  },
  audioOn(stream) {
    return stream.getAudioTrack()[0].enable();
  },
  videoOff(stream) {
    return stream.getVideoTracks()[0].stop();
  },
  videoOn(stream) {
    return stream.getVideoTracks()[0].enable();
  },
};
