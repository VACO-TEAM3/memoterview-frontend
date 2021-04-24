import React from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  width: 30%;
  margin: 1rem;

  .question-form {
    display: flex;
  }
`;

export default function QuestionForm({ onSubmit, value, onChange }) {
  return (
    <FormWrapper>
      <form className="question-form" onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <button className="" type="submit">+</button>
      </form>
    </FormWrapper>
  );
}
