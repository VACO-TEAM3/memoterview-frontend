<<<<<<< HEAD
<<<<<<< HEAD
import Video from "../../components/Video";

export default function Interview() {
=======
import { useParams } from "react-router-dom";

import Video from "../../components/Video";

export default function Interview() {
  const params = useParams();

  console.log(params);
  console.log(25);
>>>>>>> [ADD] connect to camera
=======
import Video from "../../components/Video";

export default function Interview() {
>>>>>>> [ADD] success multiple peer connetion
  return (
    <Video />
  );
}
