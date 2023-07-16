import React, { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import GlobalLoading from "../components/GlobalLoading";
import photoComingSoon from "../assets/photo-coming-soon.jpg";
import apiConfig from "../api/apiConfig";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";

const FavoritesPage = () => {
  const { user } = UserAuth() ?? {};
  const [favorites, setFavorites] = useState([]);
  const [count, setCount] = useState(0);
  const [onRequest, setOnRequest] = useState(false);

  //getting users favorites -(Firestore) documents
  const query = collection(db, `users/${user?.uid}/favorites`);
  const [docs, loading, error] = useCollectionData(query);

  useEffect(() => {
    if (docs) {
      docs.sort((a, b) => b.createdAt - a.createdAt); //sort
      setFavorites(docs);

      if (error) toast.error(error.message);

      setCount(docs.length);
    }
  }, [docs, error]);

  const onRemove = (favorite) => {
    if (onRequest) return;
    setOnRequest(true);

    deleteDoc(
      doc(
        db,
        `users/${user?.uid}/favorites/${favorite?.id}-${favorite?.itemType}`
      )
    )
      .then(() => {
        toast.success("Removed from favorites!", {
          position: "bottom-left",
          autoClose: 3900,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            fontFamily: "Arial",
            fontSize: "17px",
            fontWeight: "bold",
            color: "#4CAF50",
            borderRadius: "5px",
            paddingLeft: "10px",
          },
        });
      })
      .catch((error) => {
        toast.error("Error in Removing from favorites.", {
          position: "bottom-left",
          autoClose: 3900,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            fontFamily: "Arial",
            fontSize: "15px",
            fontWeight: "bold",
            color: "red",
            borderRadius: "5px",
            padding: "10px",
          },
        });
      });

    setOnRequest(false);
  };

  return (
    <StyledSection>
      <>
        {loading || !user ? (
          <GlobalLoading />
        ) : (
          <>
            <h1>Favorites</h1>
            <h2>{`Amount: (${count})`}</h2>
            <div className="card-container">
              {favorites?.map((favorite, index) => (
                <div className="card-wrapper" key={index}>
                  <div
                    className="movie-card"
                    style={{
                      backgroundImage: favorite.poster_path
                        ? `url(${apiConfig.w500Image(favorite.poster_path)})`
                        : `url(${photoComingSoon})`,
                    }}
                  >
                    <Link
                      to="/detail"
                      state={{ item: favorite, MediaType: favorite.itemType }}
                    >
                      {user ? (
                        <Button>
                          <div style={{ scale: "1.4", paddingTop: "3px" }}>
                            <PlayArrowIcon />
                          </div>
                        </Button>
                      ) : null}
                    </Link>
                    <h3 className="movie-title">{favorite.title}</h3>
                    <LoadingButton
                      fullWidth
                      variant="contained"
                      sx={{
                        marginTop: 1,
                        backgroundColor: "#c62828",
                        "&:hover": {
                          backgroundColor: "red",
                        },
                      }}
                      startIcon={<DeleteIcon />}
                      loadingPosition="start"
                      loading={onRequest}
                      onClick={() => onRemove(favorite)}
                    >
                      remove
                    </LoadingButton>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </StyledSection>
  );
};

const StyledSection = styled.div`
  .card-wrapper {
    padding-bottom: 3rem;
  }
  h2 {
    position: relative;
    display: inline-block;
    padding-bottom: 4px;
    font-weight: bold;
    margin-bottom: 2rem;
    text-decoration: underline;
    text-decoration-color: gray;
    text-decoration-thickness: 4px;
    text-underline-offset: 0.4em;
    text-align: left;
    margin-left: 10rem;
  }

  h1 {
    font-size: 4rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    text-decoration: underline;
    text-decoration-color: orange;
    text-decoration-thickness: 9px;
    text-underline-offset: 0.4em;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.25rem;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 9rem;
  }

  .movie-card {
    width: 200px;
    height: 300px;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    position: relative;
    border-radius: 30px;
  }

  .movie-card:hover {
    transform: scale(1.05);
  }

  .movie-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
  }

  .movie-card h3 {
    margin: 0;
    padding: 1rem;
    color: #fff;
    font-size: 1.2rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }

  @media screen and (max-width: 768px) {
    .movie-card {
      width: 150px;
      height: 225px;
    }

    .movie-card h3 {
      font-size: 1rem;
    }
  }
`;

export default FavoritesPage;
