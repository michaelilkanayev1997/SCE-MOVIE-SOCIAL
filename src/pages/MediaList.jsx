import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMediaListByPage } from "../api/axiosClient.js";
import { Grid } from "@mui/material";
import MediaItem from "../components/MediaItem.jsx";
import GlobalLoading from "../components/GlobalLoading.jsx";

const MediaList = ({ mediaType }) => {
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState(() => {
    const storedMedia = localStorage.getItem("media");
    return storedMedia ? JSON.parse(storedMedia) : [];
  });
  const [page, setPage] = useState(() => {
    if (mediaType === "movie") {
      const storedPage = localStorage.getItem("MovieMediaPage");
      return storedPage ? parseInt(storedPage) : 1;
    } else {
      const storedPage = localStorage.getItem("TvMediaPage");
      return storedPage ? parseInt(storedPage) : 1;
    }
  });
  const [totalPages, setTotalPages] = useState(() => {
    const storedTotalPages = localStorage.getItem("MediaTotalPages");
    return storedTotalPages ? parseInt(storedTotalPages) : 1;
  });

  async function handlePageChange(newPage = 1) {
    setPage(newPage);

    const Response = await getMediaListByPage(mediaType, "popular", newPage);
    setMedia(Response.results);
    setTotalPages(Response.total_pages);
    localStorage.setItem("media", JSON.stringify(Response.results));

    if (mediaType === "movie") {
      localStorage.setItem("MovieMediaPage", newPage);
    } else {
      localStorage.setItem("TvMediaPage", newPage);
    }

    localStorage.setItem("MediaTotalPages", Response.total_pages);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    const getMedia = async () => {
      const Response = await getMediaListByPage(mediaType, "popular", page);
      setMedia(Response.results);
      setTotalPages(Response.total_pages);
      localStorage.setItem("media", JSON.stringify(Response.results));
      if (mediaType === "movie") {
        localStorage.setItem("MovieMediaPage", page);
      } else {
        localStorage.setItem("TvMediaPage", page);
      }
      localStorage.setItem("MediaTotalPages", Response.total_pages);
      setLoading(false);
    };
    getMedia();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType]);

  return (
    <>
      {loading ? (
        <GlobalLoading />
      ) : (
        <StyledSection>
          <h1>{mediaType === "movie" ? "Movies" : "TVs"}</h1>
          <div>
            <Grid
              className="media"
              container
              spacing={1}
              sx={{ marginRight: "-8px!important" }}
            >
              {media.map((media, index) => (
                <Grid item xs={6} sm={5} md={3} key={index}>
                  <div style={{ padding: "1.5rem", paddingTop: "4.5rem" }}>
                    <MediaItem media={media} mediaType={mediaType} />
                  </div>
                </Grid>
              ))}
            </Grid>
            <div className="page-button">
              {page > 1 && (
                <button onClick={() => handlePageChange(page - 1)}>
                  Previous
                </button>
              )}
              {media.length !== 0 &&
                Array.from(
                  { length: totalPages > 10 ? 10 : totalPages },
                  (_, i) => {
                    const pageNum =
                      page > 5 && totalPages > 10 ? page - 5 + i : i + 1;
                    return pageNum <= totalPages ? (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={pageNum === page ? "active" : ""}
                      >
                        {pageNum}
                      </button>
                    ) : null;
                  }
                )}

              {page < totalPages && (
                <button onClick={() => handlePageChange(page + 1)}>Next</button>
              )}
            </div>
          </div>
        </StyledSection>
      )}{" "}
    </>
  );
};

const StyledSection = styled.section`
  h1 {
    padding-top: 1.5rem;
    font-size: 3.5rem;
    text-align: center;
    margin-bottom: -1rem;
    color: orange;
    font-weight: bold;
    text-decoration: underline;
    text-decoration-color: gray;
    text-decoration-thickness: 4px;
    text-underline-offset: 0.4em;
  }
  .page-button {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    padding-top: 4.5rem;
    padding-bottom: 2rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .page-button button {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    background-color: #ffffff;
    color: #333333;
    border: none;
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    white-space: nowrap;
    font-weight: bold;
  }

  .page-button button:hover,
  .page-button button:focus {
    background-color: #333333;
    color: #ffffff;
  }

  .mediaTypebutton {
    display: flex;
    justify-content: center;
    align-items: center;
    .selected {
      background-color: #333333;
      color: #ffffff;
    }

    button {
      background-color: white;
      color: #333333;
      border: none;
      margin: 0.5rem;
      cursor: pointer;
      border-radius: 0.25rem;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
    }
    button:focus {
      background-color: #4444;
      color: #ffffff;
    }
  }
  .page-button button.active {
    background-color: #333333;
    color: #ffffff;
  }

  .page-button button + button {
    margin-left: 0.5rem;
  }
`;

export default MediaList;
