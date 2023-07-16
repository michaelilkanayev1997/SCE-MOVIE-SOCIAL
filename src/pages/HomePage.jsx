/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import HeroSlide from "../components/HeroSlide";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/Button";
import HomeMediaSlide from "../components/HomeMediaSlide";
import { UserAuth } from "../context/AuthContext";
import PopUp from "../components/PopUp";

const HomePage = () => {
  const { user, isLoading, userIsBlocked } = UserAuth() ?? {};
  const [PopUpTime, setPopUpTime] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setPopUpTime(false);
    }, 2000);
    setTimeoutId(id);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {!isLoading && !user && !PopUpTime && !userIsBlocked && <PopUp />}
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div
            className="section__header mb-2"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#FFBA08",
              textDecorationThickness: "4px",
              textUnderlineOffset: "0.5rem",
            }}
          >
            <h2>Upcoming Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <HomeMediaSlide
            key="upcoming-movies"
            type="movie"
            MediaName="upcoming"
          />
        </div>

        <div className="section mb-3">
          <div
            className="section__header mb-2"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#FFBA08",
              textDecorationThickness: "4px",
              textUnderlineOffset: "0.5rem",
            }}
          >
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <HomeMediaSlide
            key="top-rated-movies"
            type="movie"
            MediaName="top_rated"
          />
        </div>

        <div className="section mb-3">
          <div
            className="section__header mb-2"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#FFBA08",
              textDecorationThickness: "4px",
              textUnderlineOffset: "0.5rem",
            }}
          >
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <HomeMediaSlide key="trending-tv" type="tv" MediaName="popular" />
        </div>

        <div className="section mb-3">
          <div
            className="section__header mb-2"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#FFBA08",
              textDecorationThickness: "4px",
              textUnderlineOffset: "0.5rem",
            }}
          >
            <h2>Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <HomeMediaSlide key="top-rated-tv" type="tv" MediaName="top_rated" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
