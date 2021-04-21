import styled from "styled-components";

const BoardWrapper = styled.div`
  display: flex;
  width: 100px;
  height: 200px;
  background: white;
`;

export default function QuestionBoard({ question, questions, onChange, onSubmit }) {
  return (
    <BoardWrapper>
      <form onSubmit={onSubmit}>
        <input type="text" value={question} onChange={onChange} />
        <button type="submit">+</button>
      </form>
      <div>
        {questions?.map((question) => (
          <>
            <input type="checkbox"></input>
            <div>{question}</div>
          </>
        ))}
      </div>
    </BoardWrapper>
  );
}
