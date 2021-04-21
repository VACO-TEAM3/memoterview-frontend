import styled from "styled-components";

import QuestionForm from "../QuestionForm";

const BoardWrapper = styled.div`
  display: flex;
  width: 50px;
  height: 100px;
  background: white;
`;

export default function QuestionBoard({ question, questions, onChange, onSubmit }) {
  return (
    <BoardWrapper>
      <QuestionForm 
        onSubmit={onSubmit} 
        value={question} 
        onChange={onChange} 
      />
      <div>
        {questions?.map((question, index) => (
          <div key={index}>
            <input type="checkbox" />
            <div>{question}</div>
          </div>
        ))}
      </div>
    </BoardWrapper>
  );
}
