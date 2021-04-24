import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const IconButtonWrapper = styled.div`
  width: 1.2rem;
  color: #3193C4;
  z-index: 2;
  background: white;
  margin-bottom: 0.6rem;
  padding: 0.3rem 0;
  border-radius: 0 5px 5px 0;
  cursor: pointer;

  :hover {
    color: white;
    background: #3193C4;
  }

  .icon {
    font-size: 1rem;
    margin-left: 0.2rem;
    margin-bottom: 0.3rem;
  }

  .icon-name {
    font-size: 0.8rem;
    font-weight: bold;
    writing-mode: vertical-rl;
    /* text-orientation: upright; */
    line-height: 1.5;
    /* letter-spacing: 0.12rem; */
  }
`;

export default function IconButton({ icon, onClick, name }) {
  return (
    <IconButtonWrapper onClick={onClick}>
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="icon-name">
        {name}
      </div>
    </IconButtonWrapper>
  );
}
