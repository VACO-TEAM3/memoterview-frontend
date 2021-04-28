import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const TabButtonWrapper = styled.div`
  width: 1.2rem;
  max-height: 8.5rem;
  color: #3193C4;
  z-index: 2;
  background: white;
  margin-bottom: 0.6rem;
  padding: 0.3rem 0;
  border-radius: ${props => props.borderRadius};
  box-shadow: ${props => props.isLeft ? "10px 15px 12px -5px rgba(0, 0, 0, 0.22)" : "-10px 15px 12px -5px rgba(0, 0, 0, 0.22)"};
  cursor: pointer;

  :hover {
    color: white;
    background: #3193C4;
    border: 1px solid white;
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
    line-height: 1.5;
    letter-spacing: 0.05rem;
  }
`;

export default function TabButton({ isLeft, borderRadius, icon, onClick, name }) {
  return (
    <TabButtonWrapper isLeft={isLeft} borderRadius={borderRadius} onClick={onClick}>
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="icon-name">
        {name}
      </div>
    </TabButtonWrapper>
  );
}
