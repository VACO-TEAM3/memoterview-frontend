import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import TotalResultListColumn from "../TotalResultListColumn";
import TotalResultListRow from "../TotalResultListRow";

const TotalResultListHeaderWrapper = styled(TotalResultListRow)`
  position: relative;
  background-color: ${({ theme }) => theme.Aero};
  border: 1px solid gray;
  font-size: 1.2rem;
`;

const TotalResultListFilterWrapper = styled(TotalResultListColumn)`
  position: absolute;
  right: 10px;
  width: 50px;
  height: 100%;

  svg {
    font-size: 1.5rem;
  }
`;

export default function TotalResultListHeader({ columnList, onFilterBtnClick }) {
  return (
    <TotalResultListHeaderWrapper>
      {columnList.map((columnItem) => <TotalResultListColumn key={columnItem}>{columnItem}</TotalResultListColumn>)}
      <TotalResultListFilterWrapper>
        <FontAwesomeIcon icon={faBars} onClick={onFilterBtnClick}/>
      </TotalResultListFilterWrapper>
    </TotalResultListHeaderWrapper>
  );
}
