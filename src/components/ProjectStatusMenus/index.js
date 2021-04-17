import React, { useState } from "react";
import styled from "styled-components";

import { STATUS_MENUS } from "../../constants/projects";
import { checkActive } from "../../utils";

const ProjectStatusMenusWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  padding-left: 50px;
  height: 40px;
`;

const StatusMenu = styled.span`
  margin: 0 40px;
  color: ${(props) => (props.active ? props.theme.spanishBlue : "black")};
  font-size: 1.3rem;
  cursor: pointer;
`;

export default function ProjectStatusMenus({ onStatusMenuChange }) {
  const [state, setState] = useState(STATUS_MENUS.ACTIVE);

  function handleStatusMenuClick(e) {
    const selectMenu = e.target.dataset.menu;

    if (state !== selectMenu) {
      setState(selectMenu);
      onStatusMenuChange && onStatusMenuChange(selectMenu);
    }
  }

  return (
    <ProjectStatusMenusWrapper>
      <StatusMenu
        active={checkActive(state, STATUS_MENUS.ACTIVE)}
        data-menu={STATUS_MENUS.ACTIVE}
        onClick={handleStatusMenuClick}
      >
        {STATUS_MENUS.ACTIVE}
      </StatusMenu>
      <StatusMenu
        active={checkActive(state, STATUS_MENUS.CLOSED)}
        data-menu={STATUS_MENUS.CLOSED}
        onClick={handleStatusMenuClick}
      >
        {STATUS_MENUS.CLOSED}
      </StatusMenu>
    </ProjectStatusMenusWrapper>
  );
}
