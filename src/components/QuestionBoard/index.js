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

export default function QuestionBoard({ questions, onChange }) {
  console.log("questions", questions);
  return (
    <BoardWrapper>
      <div className="question-list">
        {questions?.map((question, index) => (
          <div className="question-list-content" key={index}>
            <div>{question.title}</div>
          </div>
        ))}
        <button onClick={onChange}>refresh</button>
      </div>
    </BoardWrapper>
  );
}
