import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchMedia } from "../api/axiosClient.js";
import { Grid } from "@mui/material";
import MediaItem from "../components/MediaItem.jsx";

const Search = () => {
  const [media, setMedia] = useState(() => {
    const storedMedia = localStorage.getItem("SearchMedia");
    return storedMedia ? JSON.parse(storedMedia) : [];
  });
  const [search, setSearch] = useState(() => {
    const storedSearch = localStorage.getItem("search");
    return storedSearch ? storedSearch : "";
  });
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("page");
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [totalPages, setTotalPages] = useState(() => {
    const storedTotalPages = localStorage.getItem("totalPages");
    return storedTotalPages ? parseInt(storedTotalPages) : 1;
  });
  const [mediaType, setmediaType] = useState(() => {
    const storedMediaType = localStorage.getItem("mediaType");
    return storedMediaType ? storedMediaType : "";
  });

  function handlePageChange(newPage) {
    setPage(newPage);
    handleSearch(null, newPage); // Pass the new page value as a parameter
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const mediaTypeChange = (type) => {
    setPage(1);
    setmediaType(type);
  };

  async function handleSearch(event, pageNum = 1) {
    if (event) {
      event.preventDefault();
    }

    if (search.trim().length === 0) {
      setMedia([]);
      setPage(1);
      setTotalPages(1);
      localStorage.removeItem("SearchMedia");
      localStorage.removeItem("page");
      localStorage.removeItem("totalPages");
      localStorage.removeItem("search");
    } else {
      const Response = await SearchMedia(mediaType, search, pageNum);
      setMedia(Response.results);
      setTotalPages(Response.total_pages);
      localStorage.setItem("SearchMedia", JSON.stringify(Response.results));
      localStorage.setItem("page", pageNum);
      localStorage.setItem("totalPages", Response.total_pages);
      localStorage.setItem("search", search);
    }
  }

  useEffect(() => {
    handleSearch(null, page);
    localStorage.setItem("mediaType", mediaType);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType]);

  return (
    <StyledSection>
      <div>
        <form onSubmit={handleSearch}>
          <div className="Search-input">
            <input
              autoFocus
              value={search}
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Media"
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </div>
        </form>
        <div className="mediaTypebutton">
          <button
            type="button"
            className={mediaType === "movie" ? "selected" : ""}
            onClick={() => mediaTypeChange("movie")}
          >
            Movie
          </button>
          <button
            type="button"
            className={mediaType === "tv" ? "selected" : ""}
            onClick={() => mediaTypeChange("tv")}
          >
            TV
          </button>
          <button
            type="button"
            className={mediaType === "person" ? "selected" : ""}
            onClick={() => mediaTypeChange("person")}
          >
            Person
          </button>
        </div>

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
            <button onClick={() => handlePageChange(page - 1)}>Previous</button>
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
  );
};

const StyledSection = styled.section`
  .Search-input {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Search-input input {
    border-radius: 10px;
    font-size: 18px;
    height: 40px;
    width: 40%;
    background-color: rgba(204, 204, 204, 0.8);
    border: 2px solid black;
    padding-left: 10px;
    font-weight: bold;
  }
  .Search-input input:focus {
    transition: 0.3s;
    width: 40%;
    color: black;
    background-color: lightgoldenrodyellow;
  }
  .search-button {
    margin-left: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #0077ff;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .search-button:hover {
    background-color: #0066cc;
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

export default Search;
