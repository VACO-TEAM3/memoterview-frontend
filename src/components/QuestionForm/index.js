import React from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
  width: 30%;
`;

export default function QuestionForm({ onSubmit, value, onChange }) {
  return (
    <FormWrapper>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <button type="submit">+</button>
      </form>
    </FormWrapper>
  );
}
