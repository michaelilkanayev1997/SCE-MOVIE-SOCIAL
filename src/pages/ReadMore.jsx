import React, { useEffect } from "react";
import styled from "styled-components";
import BackgroundImage from "../assets/socialmedia.png";

const ReadMore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <StyledReadMore>
        <h1>Extended information about the site</h1>
        <section className="about">
          <div className="row">
            <div className="column">
              <p>ggg</p>
              <div
                className="about-img"
                style={{ backgroundImage: `url(${BackgroundImage})` }}
              ></div>
            </div>
            <div className="column">
              <div className="tabs"></div>

              <div className="tab-content">
                <div className="content">
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "1.2rem",
                    }}
                  >
                    Our site is first and foremost a social site designed to
                    connect users (students) through movies and series.
                    <th></th>
                  </p>
                  <p>
                    After logging in, a profile page is created for you - the
                    user, where you can update your personal details and also
                    add a profile picture. In addition to this, you will be able
                    to enter the posts page, where you can read posts that other
                    users have written about movies and series that they have
                    chosen to visit, you can respond to them on the post, like
                    it, save it in your favorites, and also report if necessary.
                  </p>
                  <p>
                    On the home page, you can see movies and series by
                    categories. There is also the option to search and filter
                    movies and series. You can enter any movie or series and get
                    extended information about it, such as the trailer, actors,
                    synopsis, similar movies, the ability to rate the movie, as
                    well as a place to write your own post.
                  </p>
                  <p>
                    In the end, the goal of our website is to create a social
                    platform based on movies and series, connecting users
                    through shared interests and discussions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </StyledReadMore>
    </>
  );
};

const StyledReadMore = styled.div`
  h1 {
    margin-top: 1rem;
    font-size: 70px;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .about {
    padding: 5rem 3rem 3rem 3rem;
    background: white;
  }

  .row {
    display: flex;
    justify-content: space-around;
  }

  .row .column {
    width: 40%;
  }

  .about-img {
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left;
    height: 60%;
    width: 100%;
  }

  .content {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .content p {
    padding-bottom: 1rem;
    font-size: 16px;
    line-height: 1.8;
    font-weight: 400;
    color: #999;
  }

  @media screen and (max-width: 768px) {
    .about {
      padding: 2rem 1rem 3rem 1rem;
    }

    .row {
      flex-direction: column;
    }

    .about-img {
      height: 1000px;
    }

    .row .column {
      width: 100%;
    }
  }
`;

export default ReadMore;
