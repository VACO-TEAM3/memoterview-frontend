import React, { useState } from "react";
import styled from "styled-components";

import ModalView from "../ModalView";

const EditField = styled.div`
  margin: 20px;
`;

const Label = styled.div`
  margin: 5px;
  font-size: 1.3rem;
  font-weight: 450;
`;

const Input = styled.input`
  margin: 5px 20px;
  padding: 3px 10px 0;
  width: 80%;
  height: 30px;
  font-size: 1rem;
`;

const BtnGroup = styled.div``;

export default function IntervieweeAddModalView({ onFormSubmitBtnClick, onCancleBtnClick }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [intervieweeInfo, setIntervieweeInfo] = useState({ name: "", email: "" });

  function handleInputChange(e) {
    e.preventDefault();

    const intervieweeInputType = e.target.name;
    const value = e.target.value;

    setIntervieweeInfo({
      ...intervieweeInfo,
      [intervieweeInputType]: value,
    });
  }

  function handleFileSelected(e) {
    const selectedFile = e.target.files[0];
    setSelectedFile(selectedFile);
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    onFormSubmitBtnClick({ pdf: selectedFile, intervieweeInfo });
  }

  return (
    <ModalView padding="15px" width="800px" height="400px">
      <form onSubmit={handleFormSubmit}>
        <EditField>
          <Label>이름</Label>
          <Input name="name" value={intervieweeInfo.name} onChange={handleInputChange} />
        </EditField>
        <EditField>
          <Label>이메일</Label>
          <Input name="email" value={intervieweeInfo.email} onChange={handleInputChange} />
        </EditField>
        <EditField>
          <Label>이력서</Label>
          <Input onChange={handleFileSelected} type="file" accept="application/pdf" />
        </EditField>
        <button type="submit">submit</button>
      </form>
      <BtnGroup><button onClick={onCancleBtnClick}>취소</button></BtnGroup>
    </ModalView>
  );
};
