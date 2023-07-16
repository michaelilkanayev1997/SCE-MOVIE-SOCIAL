import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faFileAlt,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import TopUser from "./TopUser";

const PostsSideBar = ({ sortedLikes }) => {
  return (
    <StyledSection>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <a href="/userprofile">
              <li className="sidebarListItem">
                <span className="iconWrapper">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </span>
                <span className="sidebarListItemText">Profile</span>
              </li>
            </a>
            <a href="/favorites">
              <li className="sidebarListItem">
                <span className="iconWrapper">
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </span>
                <span className="sidebarListItemText">Favorites</span>
              </li>
            </a>
            <a href="/myPosts">
              <li className="sidebarListItem">
                <span className="iconWrapper">
                  <FontAwesomeIcon icon={faFileAlt} size="lg" />
                </span>
                <span className="sidebarListItemText">My Posts</span>
              </li>
            </a>
            <a href="/myFavorites">
              <li className="sidebarListItem">
                <span className="iconWrapper">
                  <FontAwesomeIcon icon={faBookmark} size="lg" />
                </span>
                <span className="sidebarListItemText">Favorite Posts</span>
              </li>
            </a>
            <div className="top-users">
              <hr className="sidebarHr" />
              <h2>Top 10 Users</h2>
              <ul className="sidebarFriendList">
                {sortedLikes?.slice(0, 10).map((post) => (
                  <TopUser user={post?.user} key={post?.id + post?.createdAt} />
                ))}
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  a:hover {
    color: #4a90e2;
    text-decoration: none;
    background-color: #f2f2f2;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  .sidebarFriendList::-webkit-scrollbar {
    width: 8px;
  }

  .sidebarFriendList::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
  }

  .sidebarFriendList {
    padding-top: 1rem;
  }
  .top-users {
    padding-top: 1rem;
    margin-top: -1rem;
    text-align: center;
    h2 {
      text-decoration: underline gray 1.5px;
    }
  }
  .sidebar::-webkit-scrollbar {
    width: 6px;
  }

  .sidebar::-webkit-scrollbar-track {
    background-color: gray;
  }

  .sidebar::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 5px;
  }

  /* Sidebar Styles */
  .sidebar {
    -webkit-box-shadow: 0px 0px 16px -6px rgba(0, 0, 0, 0.68);
    box-shadow: 2px 2px 16px -6px rgba(0, 0, 0, 0.68);
    width: 250px;
    height: 100%;
    overflow-y: scroll;
    padding: 10px;
  }

  .sidebarWrapper {
    height: 28%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sidebarList {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .iconWrapper {
    padding-left: 1.1rem;
  }

  .sidebarListItem {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .sidebarListItemText {
    font-size: 19px;
    font-weight: 500;
    padding-left: 1.1rem;
  }

  .sidebarHr {
    margin: 25px 0;

    height: 3px;
    background-color: #ccc;
  }

  /* Media Queries */
  @media screen and (max-width: 768px) {
    .sidebar {
      width: 200px;
    }

    .sidebarListItemText {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 576px) {
    .sidebar {
      width: 100%;
    }

    .sidebarListItem {
      margin-bottom: 10px;
    }

    .sidebarListItemText {
      font-size: 14px;
    }
  }
`;

export default PostsSideBar;
