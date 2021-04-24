import styled from "styled-components";

import QuestionForm from "../QuestionForm";

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .question-list {
    margin-left: 1rem;

    .question-list-content {
      display: flex;
    }
  }
`;

export default function QuestionBoard({ question, questions, onChange, onSubmit }) {
  return (
    <BoardWrapper>
      <QuestionForm 
        onSubmit={onSubmit} 
        value={question} 
        onChange={onChange} 
      />
      <div className="question-list">
        {questions?.map((question, index) => (
          <div className="question-list-content" key={index}>
            <input type="checkbox" />
            <div>{question}</div>
          </div>
        ))}
      </div>
    </BoardWrapper>
  );
}
