import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const UserIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: ${props => props.backgroundColor};
  border-radius: 50%;
  font-size: ${props => props.iconSize};
`;

function UserIcon({ backgroundColor, iconColor, size, iconSize, avatar }) {
  return (
    <UserIconWrapper backgroundColor={backgroundColor} size={size} iconSize={iconSize}>
      { avatar
        ? <img src={avatar} />
        : <FontAwesomeIcon icon={faUser} color={iconColor}/>
      }
    </UserIconWrapper>
  );
}

UserIcon.defaultProps = {
  backgroundColor: "black",
  iconColor: "white",
  size: "50px",
  iconSize: "30px",
};

export default React.memo(UserIcon);
