import debounce from "lodash.debounce";
import React, { useState } from "react";
import styled from "styled-components";

import { searchInterviewers } from "../../api";
import useToken from "../../hooks/useToken";
import ModalView from "../ModalView";
import ProjectEvaluationOptionAddBar from "../ProjectEvaluationOptionAddBar";
import ProjectOptionItem from "../ProjectOptionItem";
import SearchField from "../SearchField";

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
  const { token } = useToken();

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleEvaluationOptionAdd(evaluationOption) {
    setEvaluationOptions(evaluationOptions.concat(evaluationOption));
  }

  function handleEvaluationOptionDelete(deleteOptionId) {
    setEvaluationOptions(
      evaluationOptions.filter((option) => option !== deleteOptionId)
    );
  }

  function handleSelectInterviewer(interviewer) {
    if (
      !participants.find((participant) => participant.id === interviewer.id)
    ) {
      setParticipants(participants.concat(interviewer));
    }
  }

  const handleSearchInputChange = debounce(
    async (searchValue, viewSearchList) => {
      const result = await searchInterviewers({ email: searchValue, token });
      const searchList = result.data;

      viewSearchList(searchList);
    },
    200
  );

  function handleParticipantOptionDelete(deleteOptionId) {
    console.log(deleteOptionId, participants);
    setParticipants(
      participants.filter((participant) => participant.id !== deleteOptionId)
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
            id={evaluationOption}
            option={evaluationOption}
            onOptionDelete={handleEvaluationOptionDelete}
          />
        ))}
      </EditField>
      <EditField>
        <Label>참여 면접관</Label>
        <SearchField
          onSearchInputChange={handleSearchInputChange}
          onSelectSearchResult={handleSelectInterviewer}
        />
        {participants.length < 4 && participants.map((participant) => (
          <ProjectOptionItem
            key={participant.id}
            id={participant.id}
            option={participant.name}
            onOptionDelete={handleParticipantOptionDelete}
          />
        ))}
      </EditField>
      <BtnGroup></BtnGroup>
    </ModalView>
  );
}
