import { useState } from "react";

import { createIntervieweeAPI } from "../api";
import IntervieweeAddModalView from "../components/IntervieweeAddModalView";
import Modal from "../components/Modal";
import useToken from "../hooks/useToken";
import TotalResult from "../pages/TotalResult";

export default function TotalResultContainer() {
  const [modalFlag, setModalFlag] = useState(false);
  const { token } = useToken();

  // mock projectId
  const projectId = "607ea8dc06a4055a315ad0cc";

  function handleIntervieweeAddBtnClick() {
    console.log("click interviewee add button");
    openAddIntervieweeModal();
  }

  function closeAddIntervieweeModal() {
    setModalFlag(false);
  }

  function openAddIntervieweeModal() {
    setModalFlag(true);
  }

  async function handleFormSubmitBtnClick({ pdf, intervieweeInfo }){
    try {
      await createIntervieweeAPI({ token, projectId, pdf, intervieweeInfo });
      closeAddIntervieweeModal();
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <>
      {modalFlag && (
        <Modal onClick={closeAddIntervieweeModal}>
          <IntervieweeAddModalView
            onCancleBtnClick={closeAddIntervieweeModal}
            onFormSubmitBtnClick={handleFormSubmitBtnClick}
          />
        </Modal>
      )}
      <TotalResult onIntervieweeAddBtnClick={handleIntervieweeAddBtnClick}/>
    </>
  );
};
