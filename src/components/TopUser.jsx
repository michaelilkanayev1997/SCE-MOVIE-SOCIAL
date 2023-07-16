import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import OtherUserProfile from "./OtherUserProfile";

const TopUser = ({ user }) => {
  const [userPopUp, setUserPopUp] = useState(false);

  const viewUser = () => {
    setUserPopUp(true);
  };

  return (
    <>
      {userPopUp && (
        <OtherUserProfile setUserPopUp={setUserPopUp} postUser={user} />
      )}
      <StyledSection>
        <Link
          onClick={() => {
            viewUser();
          }}
          className="customLinkStyle"
        >
          <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={user?.photoURL} alt="" />
            <span className="sidebarFriendName">{user?.displayName}</span>
          </li>
        </Link>
      </StyledSection>
    </>
  );
};

const StyledSection = styled.section`
  .customLinkStyle:hover {
    color: #002d62;
    font-weight: bold;
    text-decoration: underline;
  }
  .sidebarFriend {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding-left: 15px;
    font-size: 1.1rem;
  }

  .sidebarFriendImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
`;

export default TopUser;
