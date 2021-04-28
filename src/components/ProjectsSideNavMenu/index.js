import React from "react";
import styled from "styled-components";

import { MENU_TITLE, MENUS } from "../../constants/projects";
import useMenus from "../../hooks/useMenus";

const MenuWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const Menu = styled.div`
  margin: 30px 0;
  color: ${(props) => (props.active ? props.theme.SideBarMainFontColor : props.theme.SideBarRegularFontColor)};
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.SideBarMainFontColor};
  }
`;

function ProjectsSideNavMenu({ onMenuChange }) {
  const { menuState, handleMenuClick, checkActive } = useMenus({
    defaultMenus: MENUS.MY,
    onMenuChange: onMenuChange,
  });

  return (
    <MenuWrapper>
      <Menu
        active={checkActive(menuState, MENUS.MY)}
        data-menu={MENUS.MY}
        onClick={handleMenuClick}
      >
        {MENU_TITLE[MENUS.MY]}
      </Menu>
      <Menu
        active={checkActive(menuState, MENUS.JOINED)}
        data-menu={MENUS.JOINED}
        onClick={handleMenuClick}
      >
        {MENU_TITLE[MENUS.JOINED]}
      </Menu>
    </MenuWrapper>
  );
}

export default React.memo(ProjectsSideNavMenu);
