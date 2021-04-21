import Video from "../../components/Video";

export default function Interview({ peers, videoRef, isInterviewer }) {
  return (
    <>
      {peers?.map((peer) => (
        <Video srcObject={peer} playsInline autoPlay></Video>
      ))}
    </>
  );
}
