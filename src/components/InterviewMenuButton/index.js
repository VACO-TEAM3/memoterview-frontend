import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const InterviewMenuButtonWrapper = styled.div`
  display: flex;
  color: white;
  align-items: center;
  font-size: 1.8rem;
  margin: 0.7rem 0 2.5rem 0.3rem;
  cursor: pointer;

  .interview-button-name {
    margin: 0 0.2rem;
    font-size: 0.95rem;
  }
`;

export default function InterviewMenuButton({ onClick, icon, name }) {
  return (
    <InterviewMenuButtonWrapper onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <h6 className="interview-button-name">{name}</h6>
    </InterviewMenuButtonWrapper>
  );
}
