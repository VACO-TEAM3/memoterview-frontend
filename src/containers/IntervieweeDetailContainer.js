import { useDispatch } from "react-redux";

import IntervieweeDetail from "../pages/IntervieweeDetail";
import { loginUser } from "../redux/reducers/user";

export default function IntervieweeDetailContainer() {
  const dispatch = useDispatch();

  return (
    <>
      <IntervieweeDetail />
    </>
  );
}
