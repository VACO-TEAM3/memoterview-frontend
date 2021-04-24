import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const IconButtonWrapper = styled.div`
  width: 5%;
  height: 5%;
  margin-left: 15%;
  font-size: 30px;
  color: transparent;
  color: #3193C4;
  z-index: 2;

  :hover {
    color: white;
  }
`;

export default function IconButton({ icon, onClick }) {
  return (
    <IconButtonWrapper>
      <FontAwesomeIcon 
        icon={icon} 
        onClick={onClick} 
      />
    </IconButtonWrapper>
  );
}
