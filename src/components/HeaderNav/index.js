import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderNavWrapper = styled.div`
margin: 0 40px;
font-size: 1.5rem;
cursor: pointer;

&:first-child {
  margin-left: 80px;
}

&:last-child {
  margin-left: auto;
  margin-right: 80px;
  text-align: end;
}

&:hover {
  color: ${({ theme }) => theme.Aero};
}

a {
  text-decoration: none;
  &:link {
    color: black;
  }
  &:visited {
    color: black;
  }
  &:hover {
    color: ${({ theme }) => theme.Aero};
  }
}
`;

export default function HeaderNav({ onClick, path, title }) {
  return (
    <HeaderNavWrapper>
      <Link onClick={onClick} to={path}>{title}</Link>
    </HeaderNavWrapper>
  );
}
