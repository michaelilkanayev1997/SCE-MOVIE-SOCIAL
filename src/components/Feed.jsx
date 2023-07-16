/* eslint-disable */
import React from "react";
import styled from "styled-components";

import Post from "./Post";

const Feed = ({ posts, user }) => {
  return (
    <StyledSection>
      <div className="feed">
        <div className="feedWrapper">
          {posts?.map((post, index) => (
            <div className="post" key={index}>
              <Post post={post} user={user} />
            </div>
          ))}
        </div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  .feed {
    flex: 5.5;
  }

  .feedWrapper {
    padding: 20px;
  }
`;

export default Feed;
