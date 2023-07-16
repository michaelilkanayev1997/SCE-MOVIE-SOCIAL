/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Feed from "../components/Feed";
import PostsSideBar from "../components/PostsSideBar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import GlobalLoading from "../components/GlobalLoading";
import { UserAuth } from "../context/AuthContext";
import ScrollToTopIcon from "../components/ScrollToTopIcon";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostsPage = ({ myPosts, myFavorites }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sortedDocs, setSortedDocs] = useState([]);
  const [sortedLikes, setSortedLikes] = useState([]);
  const navigate = useNavigate();

  //getting posts (Firestore) documents
  const postsRef = collection(db, "posts");
  const [docs, loading, error] = useCollectionData(postsRef);

  const { user } = UserAuth() ?? {};

  // Sorting documents by createdAt date
  useEffect(() => {
    if (docs) {
      setIsLoading(true);
      if (myPosts && user) {
        const myPostsQuery = query(
          postsRef,
          where("user.uid", "==", user?.uid)
        );

        // execute the query and process the results
        getDocs(myPostsQuery)
          .then((querySnapshot) => {
            const myPosts = [];
            querySnapshot.forEach((doc) => {
              // add each document's data to the docs array
              myPosts.push(doc.data());
            });

            const sorted = myPosts.sort(
              (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
            );
            setSortedDocs(sorted);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      } else if (myFavorites && user) {
        // create a query to get only the documents where the "likes" field contains the user's UID as a key
        const myFavoritesQuery = query(
          postsRef,
          where(`favorites.${user?.uid}`, "==", "")
        );

        // execute the query and process the results
        getDocs(myFavoritesQuery)
          .then((querySnapshot) => {
            const myFavorites = [];
            querySnapshot.forEach((doc) => {
              // add each document's data to the docs array
              myFavorites.push(doc.data());
            });

            const sorted = myFavorites.sort(
              (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
            );
            setSortedDocs(sorted);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      } else {
        const sorted = docs.sort(
          (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
        );
        setSortedDocs(sorted);
      }

      // Create a new field that contains the length of the "likes" map
      const docsWithLikesLength = docs?.map((doc) => {
        const likesLength = Object.keys(doc.likes || {}).length;
        return { ...doc, likesLength };
      });

      // Sort the documents by the "likesLength" field in descending order
      const sortedLikes = docsWithLikesLength?.sort(
        (a, b) => b.likesLength - a.likesLength
      );

      const uniqueUsers = sortedLikes?.reduce((acc, doc) => {
        if (!acc[doc.user?.uid]) {
          acc[doc.user?.uid] = doc;
        }
        return acc;
      }, {});

      const uniqueLikesArray = Object.values(uniqueUsers);

      setSortedLikes(uniqueLikesArray);

      if (!user) {
        //Navigate to the "/" route
        navigate("/");
        toast.error("To enter the posts page, please Login.", {
          position: "bottom-left",
          autoClose: 4500,
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
      }

      setIsLoading(false); // Set isLoading to false after sorting is done
    }
  }, [docs, user]);

  return (
    <>
      {!user || loading || isLoading ? (
        <GlobalLoading />
      ) : (
        <StyledSection>
          <div className="homeContainer">
            <PostsSideBar sortedLikes={sortedLikes} />
            <Feed posts={sortedDocs} user={user} />
          </div>
          <ScrollToTopIcon />
        </StyledSection>
      )}
    </>
  );
};

const StyledSection = styled.section`
  .homeContainer {
    display: flex;
    width: 100%;
    background-color: #f0f2f5;
    color: black;
  }
`;

export default PostsPage;
