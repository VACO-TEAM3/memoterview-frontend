import Video from "../../components/Video";

export default function Interview({ peers, videoRef, isInterviewer }) {
  return (
    <Video peers={peers} videoRef={videoRef} />
  );
}
