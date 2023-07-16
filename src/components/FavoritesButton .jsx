import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

const FavoritesButton = React.memo(({ item, user, MediaType }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Useruid = user?.uid;

  const favoritesDocRef = doc(
    db,
    `users/${Useruid}/favorites/${item?.id}-` + MediaType
  );

  const handleFavorites = useCallback(async () => {
    if (!user || isLoading) {
      return;
    }

    setIsLoading(true);

    const docSnapshot = await getDoc(favoritesDocRef);

    if (docSnapshot.exists()) {
      //Document already exists

      deleteDoc(favoritesDocRef)
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
    } else {
      // Document does not exist yet. Creating...
      const docData = {
        id: item.id,
        itemType: MediaType,
        title: MediaType === "movie" ? item.title : null,
        name: MediaType === "tv" ? item.name : null,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        overview: item.overview,
        createdAt: new Date(),
      };

      await setDoc(favoritesDocRef, docData, { merge: true });

      toast.success("Added to favorites!", {
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
    }
    setIsLoading(false);
    setIsFavorite(!isFavorite);
  }, [
    user,
    isLoading,
    favoritesDocRef,
    isFavorite,
    item.id,
    item.title,
    item.name,
    item.poster_path,
    item.backdrop_path,
    item.overview,
    MediaType,
  ]);

  useEffect(() => {
    getDoc(favoritesDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    });
  }, [Useruid, favoritesDocRef]);

  return (
    <StyledSection>
      <button className="favorites-button" onClick={handleFavorites}>
        {isLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            style={{
              color: "red",
              textShadow: "0px 0px 4px #fff",
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          <FontAwesomeIcon icon={faHeart} color={isFavorite ? "red" : "gray"} />
        )}
      </button>
    </StyledSection>
  );
});

const StyledSection = styled.section`
  // CSS Animation
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .favorites-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
    font-size: 25px;
    font-weight: bold;
    text-transform: uppercase;
    padding-left: 16px;
    padding-right: 25px;
  }

  .favorites-button:hover {
    transform: translateY(-2px);
  }
`;

export default FavoritesButton;
