import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <StyledSection>
      <div className="not-found-container">
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-message">
          Oops! The page you are looking for cannot be found.
        </p>
        <Link className="not-found-link" to="/">
          Go back to homepage
        </Link>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  .not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
  }

  .not-found-title {
    font-size: 5rem;
    color: #444444;
    text-align: center;
    margin-bottom: 1rem;
  }

  .not-found-message {
    font-size: 2rem;
    color: #666666;
    text-align: center;
    margin-bottom: 2rem;
  }

  .not-found-link {
    background-color: #0077b6;
    color: #ffffff;
    font-size: 1.5rem;
    padding: 1rem 2rem;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #023e8a;
    }
  }
`;

export default NotFound;
