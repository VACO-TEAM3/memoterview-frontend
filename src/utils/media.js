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
