import styled from "styled-components";

import image from "../assets/images/main.png";
import Header from "../components/Header";
import LoginButton from "../components/LoginButton";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.Aero};

  .header-button {
    width: 5rem;
    height: 2rem;
    background: white;
    border: 1px solid gray;
  }

  .header-right {
    margin-top: 0.7em;
    margin-right: 1em;
    text-align: end;
  }

  .content {
    display: flex;
    margin-top: 11rem;
    justify-content: center;
  }

  .main-image {
    width: 60em;
  }

  .content-side {
    display: flex;
    height: 100%;
    margin-right: 5rem;
    flex-direction: column;
    justify-content: center;
  }

  .content-button {
    text-align: center;
  }

  .content-text {
    text-align: center;
  }

  .content-text-style {
    color: white;
  }
`;

export default function LoginPage({ onSuccess, onFailure }) {
  function customButton({ onClick, disabled }) {
    return (
      <button classname="header-button" onClick={onClick} disabled={disabled}>Start</button>
    );
  }

  return (
    <PageWrapper>
      <Header>
        <div classname="header-right">
          <LoginButton onSuccess={onSuccess} onFailure={onFailure} customStyle={customButton} />
        </div>
      </Header>
      <div classname="content">
        <div classname="content-side">
          <div classname="content-text">
            <h1 classname="content-text-style">Remember your interviewee</h1>
            <h4 classname="content-text-style">Boost your Hire with Memoterview</h4>
            <h4 classname="content-text-style">Save your interviewee, remind your interview</h4>
          </div>
          <div classname="content-button">
            <LoginButton onSuccess={onSuccess} onFailure={onFailure} />
          </div>
        </div>
        <img classname="main-image" src={image} alt="interviewing people" />
      </div>
    </PageWrapper>
  );
}
