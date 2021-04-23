import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const InterviewButtonWrapper = styled.div`
  margin-top: 30%;
  margin-left: 15%;
  font-size: 30px;
  color: transparent;

  :hover {
    color: white;
  }
`;

export default function InterviewSideBarButton({ icon, onClick }) {
  return (
    <InterviewButtonWrapper>
      <FontAwesomeIcon 
        icon={icon} 
        onClick={onClick} 
      />
    </InterviewButtonWrapper>
  );
}
