import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import photoComingSoon from "../assets/photo-coming-soon.jpg";
import apiConfig from "../api/apiConfig";
import { UserAuth } from "../context/AuthContext";
import Typography from "@mui/material/Typography";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { OutlineButton } from "../components/Button";

const MediaItem = ({ media, mediaType }) => {
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const { user } = UserAuth() ?? {};

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setPosterPath(
      apiConfig.w500Image(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );

    if (mediaType === "movie") {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split("-")[0]
      );
    }
  }, [media, mediaType]);

  return (
    <div
      className="movie-card"
      style={{
        backgroundImage:
          media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
            ? `url(${posterPath})`
            : `url(${photoComingSoon})`,
        marginBottom: "2rem",
        height: "25rem",
        textShadow: "10px",
      }}
    >
      {/* movie or tv item */}
      {media && (
        <>
          <div>
            <Link
              to={mediaType !== "person" ? "/detail" : "/personDetails"}
              state={{
                item: mediaType !== "person" ? media : media.id,
                MediaType: mediaType,
              }}
            >
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
                  <div>
                    <Link to="/login">sign in to view more</Link>
                  </div>
                </OutlineButton>
              )}
            </Link>
            <h2>{releaseDate ? "(" + releaseDate + ")" : ""}</h2>
          </div>
          <h3>{title}</h3>
        </>
      )}
      {/* movie or tv item */}
    </div>
  );
};

export default MediaItem;
