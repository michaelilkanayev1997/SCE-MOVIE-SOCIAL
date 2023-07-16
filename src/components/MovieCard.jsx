import React from "react";
import "../scss/movie-card.scss";
import { Link } from "react-router-dom";
import Button from "./Button";
import apiConfig from "../api/apiConfig";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import photoComingSoon from "../assets/photo-coming-soon.jpg";
import { UserAuth } from "../context/AuthContext";
import Typography from "@mui/material/Typography";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { OutlineButton } from "../components/Button";

const MovieCard = (props) => {
  const item = props.item;
  const type = props.MediaType;
  const { user } = UserAuth() ?? {};

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <>
      <div
        className="movie-card"
        style={{
          backgroundImage:
            item.poster_path || item.backdrop_path
              ? `url(${bg})`
              : `url(${photoComingSoon})`,
        }}
      >
        <Link to="/detail" state={{ item: item, MediaType: type }}>
          {user ? (
            <Button>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", marginTop: "1rem" }}
              >
                Read More
              </Typography>
              <div style={{ paddingTop: "3px" }}>
                <ReadMoreIcon fontSize="large" />
              </div>
            </Button>
          ) : (
            <OutlineButton className="small">
              <Link to="/login">sign in to view more</Link>
            </OutlineButton>
          )}
        </Link>
      </div>
      <h3>{item.title || item.name}</h3>
    </>
  );
};

export default MovieCard;
