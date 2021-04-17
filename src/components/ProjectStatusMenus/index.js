import React from "react";
import styled from "styled-components";

import { STATUS_MENUS } from "../../constants/projects";
import useMenus from "../../hooks/useMenus";

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
  const { menuState, handleMenuClick, checkActive } = useMenus({
    defaultMenus: STATUS_MENUS.ACTIVE,
    onMenuChange: onStatusMenuChange,
  });

  return (
    <ProjectStatusMenusWrapper>
      <StatusMenu
        active={checkActive(menuState, STATUS_MENUS.ACTIVE)}
        data-menu={STATUS_MENUS.ACTIVE}
        onClick={handleMenuClick}
      >
        {STATUS_MENUS.ACTIVE}
      </StatusMenu>
      <StatusMenu
        active={checkActive(menuState, STATUS_MENUS.CLOSED)}
        data-menu={STATUS_MENUS.CLOSED}
        onClick={handleMenuClick}
      >
        {STATUS_MENUS.CLOSED}
      </StatusMenu>
    </ProjectStatusMenusWrapper>
  );
}
