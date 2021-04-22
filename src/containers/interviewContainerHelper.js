
import { useState } from "react";
import { useParams } from "react-router-dom";

import { getIntervieweeResumeAPI } from "../api";
import IntervieweeResumeModalView from "../components/IntervieweeResumeModalView";
import Modal from "../components/Modal";
import useToken from "../hooks/useToken";
import Interview from "../pages/Interview";

export default function InterviewContainer() {
  const [modalFlag, setModalFlag] = useState(false);
  const [url, setUrl] = useState("");
  const { intervieweeId, projectId } = useParams();
  const { token } = useToken();

  function handleIntervieweeResumeShowingBtnClick() {
    openIntervieweeResumeModal();
    //const result = await getIntervieweeResumeAPI(projectId, intervieweeId, token);
    //setUrl(result);
  }

  function closeIntervieweeResumeModal() {
    setModalFlag(false);
  }

  function openIntervieweeResumeModal() {
    setModalFlag(true);
  }

  return (
    <>
      {modalFlag && (
        <Modal onClick={closeIntervieweeResumeModal}>
          <IntervieweeResumeModalView
            url={url}
            onCancleBtnClick={closeIntervieweeResumeModal}
          />
        </Modal>
      )}
      <Interview onIntervieweeResumeShowingBtnClick={handleIntervieweeResumeShowingBtnClick}/>
    </>
  );
};
