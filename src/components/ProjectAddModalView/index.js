import React, { useState } from "react";
import styled from "styled-components";

import ModalView from "../ModalView";
import ProjectEvaluationOptionAddBar from "../ProjectEvaluationOptionAddBar";
import ProjectOptionItem from "../ProjectOptionItem";

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
  padding: 3px 10px 0;
  width: 80%;
  height: 30px;
  font-size: 1rem;
`;

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

  function handleEvaluationOptionDelete(deleteOption) {
    setEvaluationOptions(
      evaluationOptions.filter((option) => option !== deleteOption)
    );
  }

  //todo. modalview padding, width, height 상수화
  // 최대 평가옵션, 면접관 상수화
  return (
    <ModalView padding="20px" width="700px" height="600px">
      <EditField>
        <Label>인터뷰 제목</Label>
        <Input value={title} onChange={handleTitleChange} />
      </EditField>
      <EditField>
        <Label>평가 옵션</Label>
        {evaluationOptions.length < 4 && (
          <ProjectEvaluationOptionAddBar
            onEvaluationOptionAdd={handleEvaluationOptionAdd}
          />
        )}
        {evaluationOptions.map((evaluationOption) => (
          <ProjectOptionItem
            key={evaluationOption + evaluationOptions.length}
            option={evaluationOption}
            onOptionDelete={handleEvaluationOptionDelete}
          />
        ))}
      </EditField>
      <EditField>
        <Label>참여 면접관</Label>
        <Input />
      </EditField>
      <BtnGroup></BtnGroup>
    </ModalView>
  );
}
