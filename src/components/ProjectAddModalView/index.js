import React, { useState } from "react";
import styled from "styled-components";

import ModalView from "../ModalView";
import ProjectEvaluationOptionAddBar from "../ProjectEvaluationOptionAddBar";

const EditField = styled.div`
  margin: 50px;
`;

const Label = styled.div`
  margin: 5px;
  font-size: 1.3rem;
  font-weight: 450;
`;

const Input = styled.input`
  margin: 5px 20px;
  width: 80%;
  height: 30px;
  font-size: 1rem;
`;

const OptionItem = styled.div``;

const BtnGroup = styled.div``;

export default function ProjectAddModalView() {
  const [title, setTitle] = useState("");
  const [evaluationOptions, setEvaluationOptions] = useState([]);
  const [participants, setParticipants] = useState([]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleEvaluationOptionAdd(evaluationOption) {
    setEvaluationOptions(evaluationOptions.concat(evaluationOption));
  }

  return (
    <ModalView padding="20px" width="700px" height="600px">
      <EditField>
        <Label>인터뷰 제목</Label>
        <Input value={title} onChange={handleTitleChange}/>
      </EditField>
      <EditField>
        <Label>평가 옵션</Label>
        {evaluationOptions.map((evaluationOption) => (
          <OptionItem>{evaluationOption}</OptionItem>
        ))}
        <ProjectEvaluationOptionAddBar
          onEvaluationOptionAdd={handleEvaluationOptionAdd}
        />
      </EditField>
      <EditField>
        <Label>참여 면접관</Label>
        <Input />
      </EditField>
      <BtnGroup></BtnGroup>
    </ModalView>
  );
}
