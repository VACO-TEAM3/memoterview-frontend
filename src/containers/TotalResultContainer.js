import { useState } from "react";
import { useParams } from "react-router";

import { createIntervieweeAPI } from "../api";
import IntervieweeAddModalView from "../components/IntervieweeAddModalView";
import Modal from "../components/Modal";
import useToken from "../hooks/useToken";
import TotalResult from "../pages/TotalResult";

export default function TotalResultContainer() {
  const [modalFlag, setModalFlag] = useState(false);
  const { projectId } = useParams();
  const { token } = useToken();

  const interviewees = [
    {
      id: 1,
      name: "정아무개",
      email: "chungamugae@gmail.com",
    },
    {
      id: 3,
      name: "최아무개",
      email: "choiamugae@gmail.com",
    },
    {
      id: 4,
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      id: 5,
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      id: 6,
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      id: 7,
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      id: 8,
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      id: 9,
      name: "민아무개",
      email: "minamugae@gmail.com",
    },
    {
      id: 10,
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
      console.log(pdf, intervieweeInfo);
      const result = await createIntervieweeAPI({ token, projectId, pdf, intervieweeInfo });
      console.log("returned", result);
      closeAddIntervieweeModal();
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <>
      {modalFlag && (
        <Modal onBackgroundClick={closeAddIntervieweeModal}>
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
