import styled from "styled-components";

import image from "../assets/images/main.png";
import Header from "../components/Header";
import LoginButton from "../components/LoginButton";
import RotateText from "../components/RotatingText";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.White};
`;

const Content = styled.div`
  display: flex;
  margin-top: 3.5rem;
  height: calc(100vh - 3.5rem);
`;

const Logo = styled.div`
  padding-left: 1.8rem;
  font-family: 'Cutive Mono', monospace;
  font-size: 1.4rem;
  color: #1d2546;
`;

const ContentSide = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30vh;
  width: 40vw;
  color: #1d2546;
`;

const ContentTextWrapper = styled.div`
  position: absolute;
  left: 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
`;

const InfoWrapper = styled.div`
  margin-top: 40px;
`;

const ContentImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentImage = styled.img`
  width: 50vw;
`;

const ContentText = styled.p`
  margin: 0;
  font-size: 1.5rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 60px;
`;

const rotatingWords = [
  {
    color: "#10AC84",
    text: "interview.",
  },
  {
    color: "#FFB100",
    text: "question.",
  },
  {
    color: "#8C271E",
    text: "candidate.",
  }
];

export default function LoginPage({ onSuccess, onFailure }) {
  return (
    <PageWrapper>
      <Header>
        <Logo>
          Memoterview
        </Logo>
      </Header>
      <Content>
        <ContentSide>
          <ContentTextWrapper>
            <RotateText staticText={"Memo your"} rotatingWords={rotatingWords} />
            <InfoWrapper>
              <ContentText>Boost your Hire with Memoterview</ContentText>
              <ContentText>Save your interviewee, remind your interview</ContentText>
            </InfoWrapper>
            <ButtonWrapper>
              <LoginButton onSuccess={onSuccess} onFailure={onFailure} />
            </ButtonWrapper>
          </ContentTextWrapper>
        </ContentSide>
        <ContentImageWrapper>
          <ContentImage className="main-image" src={image} alt="interviewing people" />
        </ContentImageWrapper>
      </Content>
    </PageWrapper>
  );
}
