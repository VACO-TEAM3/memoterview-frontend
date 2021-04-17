import React, { useState } from "react";
import styled from "styled-components";

import { MENU_TITLE,MENUS } from "../../constants/projects";

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

  function checkActive(state, menu) {
    return state === menu;
  }

  function handleMenuClick(e) {
    const title = e.target.textContent;
    const selectMenu = Object.keys(MENU_TITLE).find(key => MENU_TITLE[key] === title);
    
    if (state !== selectMenu) {
      setState(selectMenu);
      onMenuChange && onMenuChange(selectMenu);
    }
  }

  return (
    <MenuWrapper>
      <Menu active={checkActive(state, MENUS.MY)} onClick={handleMenuClick}>{MENU_TITLE[MENUS.MY]}</Menu>
      <Menu active={checkActive(state, MENUS.JOIND)} onClick={handleMenuClick}>{MENU_TITLE[MENUS.JOIND]}</Menu>
    </MenuWrapper>
  );
}
