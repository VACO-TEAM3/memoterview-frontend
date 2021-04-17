import React, { useState } from "react";
import styled from "styled-components";

import { MENU_TITLE, MENUS } from "../../constants/projects";
import { checkActive } from "../../utils/index";

const MenuWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Menu = styled.div`
  margin: 30px 0;
  color: ${(props) => (props.active ? props.theme.spanishBlue : "black")};
  font-size: 1rem;
  cursor: pointer;
`;

export default function ProjectsSideNavMenu({ onMenuChange }) {
  const [state, setState] = useState(MENUS.MY);

  function handleMenuClick(e) {
    const selectMenu = e.target.dataset.menu;

    if (state !== selectMenu) {
      setState(selectMenu);
      onMenuChange && onMenuChange(selectMenu);
    }
  }

  return (
    <MenuWrapper>
      <Menu
        active={checkActive(state, MENUS.MY)}
        data-menu={MENUS.MY}
        onClick={handleMenuClick}
      >
        {MENU_TITLE[MENUS.MY]}
      </Menu>
      <Menu
        active={checkActive(state, MENUS.JOINED)}
        data-menu={MENUS.JOINED}
        onClick={handleMenuClick}
      >
        {MENU_TITLE[MENUS.JOINED]}
      </Menu>
    </MenuWrapper>
  );
}
