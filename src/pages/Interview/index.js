import Video from "../../components/Video";

export default function Interview({ peers, videoRef, isInterviewer }) {
  return (
    <>
      {peers?.map((peer) => (
        <video srcObject={peer} playsInline autoPlay></video>
      ))}
    </>
  );
}
