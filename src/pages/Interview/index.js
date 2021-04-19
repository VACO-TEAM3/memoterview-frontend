import { useParams } from "react-router-dom";

import Video from "../../components/Video";

export default function Interview() {
  const params = useParams();

  console.log(params);
  console.log(25);
  return (
    <Video />
  );
}
