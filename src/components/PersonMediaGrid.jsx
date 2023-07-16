import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { OutlineButton } from "./Button";
import { getPersonMedia } from "../api/axiosClient";
import MediaItem from "./MediaItem";

const PersonMediaGrid = ({ personId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;

  useEffect(() => {
    const getMedias = async () => {
      const response = await getPersonMedia(personId);

      if (response) {
        const mediasSorted = response.sort(
          (a, b) => getReleaseDate(b) - getReleaseDate(a)
        );
        setMedias([...mediasSorted]);
        setFilteredMedias([...mediasSorted].splice(0, skip));
      }
    };

    getMedias();
  }, [personId]);

  const getReleaseDate = (media) => {
    const date =
      media.media_type === "movie"
        ? new Date(media.release_date)
        : new Date(media.first_air_date);
    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
        {filteredMedias.map((media, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <div style={{ padding: "1rem", paddingTop: "4.5rem" }}>
              <MediaItem media={media} mediaType={media.media_type} />
            </div>
          </Grid>
        ))}
      </Grid>
      <div
        className="button_load_more"
        style={{
          paddingTop: "3.5rem",
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        {filteredMedias.length < medias.length && (
          <OutlineButton onClick={onLoadMore}>load more</OutlineButton>
        )}
      </div>
    </>
  );
};

export default PersonMediaGrid;
