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
    border-radius: 0 0 3px 0;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
`;

export default function InterviewRightTab({ tabName, tabIcon, onClick, children, isOpened }) {
  return (
    <TabWrapper>
      <TabButton borderRadius="5px 0 0 5px" name={tabName} icon={tabIcon} onClick={onClick} />
      {isOpened && <div className="tab-content">{children}</div>}
    </TabWrapper>
  );
}
