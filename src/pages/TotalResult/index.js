import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../../components/Modal";
import ProjectAddModalView from "../../components/ProjectAddModalView";

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
`;

export default function TotalResult() {
  const [modalFlag, setModalFlag] = useState(false);

  function handleIntervieweeAddBtnClick() {
    console.log("click project add button");
    openAddIntervieweeModal();
  }

  function closeAddIntervieweeModal() {
    setModalFlag(false);
  }

  function openAddIntervieweeModal() {
    setModalFlag(true);
  }

  return (
    <>
      {modalFlag && (
        <Modal onClick={closeAddIntervieweeModal}>
          <ProjectAddModalView />
        </Modal>
      )}
      <div><button onClick={handleIntervieweeAddBtnClick}>CLICK ME!</button></div>
    </>
  );
}
