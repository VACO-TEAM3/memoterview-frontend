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

  const interviewees = [
    {
      name: "이아무개",
      email: "leeamugae@gmail.com",
    },
    {
      name: "김아무개",
      email: "kimamugae@gmail.com",
    },
    {
      name: "최아무개",
      email: "choiamugae@gmail.com",
    },
    {
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      name: "민아무개",
      email: "minamugae@gmail.com",
    }
  ];

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
      <TotalResult onIntervieweeAddBtnClick={handleIntervieweeAddBtnClick} interviewees={interviewees}/>
    </>
  );
};
