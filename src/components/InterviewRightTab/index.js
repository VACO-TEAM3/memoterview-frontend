import styled from "styled-components";

import TabButton from "../TabButton";

const TabWrapper = styled.div`
  position: absolute;
  right: 0;

  display: flex;
  margin-bottom: 0.5rem;

  .tab-content {
    min-height: 1rem;
    padding-bottom: 2rem;
    background: white;
    border-radius: 0 0 0 3px;
    box-shadow: 10px 19px 15px rgba(0, 0, 0, 0.30), 20px 15px 12px rgba(0, 0, 0, 0.22);
    z-index: 3;
  }
`;

export default function InterviewRightTab({ tabName, tabIcon, onClick, children, isOpened }) {
  return (
    <TabWrapper>
      <TabButton isLeft={false} borderRadius="5px 0 0 5px" name={tabName} icon={tabIcon} onClick={onClick} />
      {isOpened && <div className="tab-content">{children}</div>}
    </TabWrapper>
  );
}
