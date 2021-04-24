import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import TotalResultIntervieweeColumn from "./TotalResultIntervieweeColumn";
import TotalResultIntervieweeRow from "./TotalResultIntervieweeRow";

const TotalResultIntervieweeListHeaderWrapper = styled(TotalResultIntervieweeRow)`
  background-color: ${({ theme }) => theme.Aero};
`;

export default function TotalResultIntervieweeListHeader({ onAddBtnClick }) {
  return (
    <TotalResultIntervieweeListHeaderWrapper>
      <TotalResultIntervieweeColumn>면접자 이름</TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn>이메일</TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn></TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn>
        <FontAwesomeIcon icon={faPlus} onClick={onAddBtnClick} />
      </TotalResultIntervieweeColumn>
    </TotalResultIntervieweeListHeaderWrapper>
  );
}
