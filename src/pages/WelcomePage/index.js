import React, { useState } from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const InnerPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40vw;;
  height: 60vh;
  background-color: ${({ theme }) => theme.BabyPowder};
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.5rem;
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  font-size: 1.5rem;
`;

const EditField = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40%;
`;

const Input = styled.input`
  margin: 5px 20px;
  padding: 3px 10px 0;
  width: 70%;
  height: 30px;
  font-size: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
`;

export default function WelcomePage({ onAskPermissionBtnClick }) {
  return (
    <>
      <PageWrapper>
        <InnerPageWrapper>
          <Title>면접방 입장을 위해 하단의 정보를 입력해주세요</Title>
          <InputWrapper>
            <EditField>
              <Label>이름: </Label>
              <Input></Input>
            </EditField>
            <EditField>
              <Label>이메일: </Label>
              <Input></Input>
            </EditField>
          </InputWrapper>
          <ButtonWrapper>
            <Button onClick={onAskPermissionBtnClick}>면접방 입장</Button>
          </ButtonWrapper>
        </InnerPageWrapper>
      </PageWrapper>
    </>
  );
}
