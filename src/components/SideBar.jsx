import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SideBar = ({ user }) => {
  return (
    <StyledSection>
      <div
        className="sidebar"
        style={{
          backgroundColor: "#282c34",
          color: "#ffffff",
          height: "100%",
          position: "fixed",
          left: 0,
          top: 0,
          width: 200,
          zIndex: 1,
        }}
      >
        <div className="brand">
          <a href="/">
            <div className="container">SCE-Movie-Social</div>
          </a>
        </div>
        {user && (
          <div className="user-avatar">
            <img
              src={user?.photoURL}
              alt={user?.photoURL}
              className="avatar-image"
            />
            <h2 className="avatar-name">{user.displayName}</h2>
          </div>
        )}

        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            marginTop: "2rem",
          }}
        >
          <Link to="/admin">
            <li style={{ padding: 16 }}>Dashboard</li>
          </Link>
          <Link to="/activeusers">
            <li style={{ padding: 16 }}>Users</li>
          </Link>
          <Link to="/adminMessages">
            <li style={{ padding: 16 }}>Messages</li>
          </Link>
          <Link to="/postsReports">
            <li style={{ padding: 16 }}>Posts-Reports</li>
          </Link>
          <Link to="/addAdmin">
            <li style={{ padding: 16 }}>Add Admins</li>{" "}
          </Link>
        </ul>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  .sidebar {
    background-color: #282c34;
    color: #ffffff;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    z-index: 1;
  }

  .sidebar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .sidebar li {
    padding: 16px;
  }

  .sidebar li:hover {
    background-color: #555;
  }

  .sidebar li.active {
    background-color: #4caf50;
  }
  .brand {
    font-size: 1.09rem;
    margin-bottom: 1rem;
    text-align: center;
    padding-top: 0.5rem;

    .container {
      cursor: pointer;
      gap: 0.4rem;
      font-weight: 900;
      text-transform: uppercase;
      transition: 0.1s ease-in-out;
      color: white;
      text-decoration: underline;
      &:hover {
        color: #023e8a;
      }
    }
  }
  .user-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .avatar-name {
    font-size: 18px;
    font-weight: bold;
  }
`;

export default SideBar;
