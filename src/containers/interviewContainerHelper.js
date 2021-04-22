
import { useState } from "react";

import IntervieweeResumeModalView from "../components/IntervieweeResumeModalView";
import Modal from "../components/Modal";
import Interview from "../pages/Interview";

export default function InterviewContainerHelper() {
  const [modalFlag, setModalFlag] = useState(false);

  function handleIntervieweeResumeShowingBtnClick() {
    openIntervieweeResumeModal();
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
            onCancleBtnClick={closeIntervieweeResumeModal}
          />
        </Modal>
      )}
      <Interview onIntervieweeResumeShowingBtnClick={handleIntervieweeResumeShowingBtnClick}/>
    </>
  );
};
