import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { ScaleLoader } from "react-spinners";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const MediaReview = ({ id, MediaType, user }) => {
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);

  //getting reviews (Firestore) documents
  const query = collection(db, `reviews/${id}-${MediaType}/review`);
  const [docs, loading, error] = useCollectionData(query);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (docs) {
      setReviews(docs);
    }
  }, [docs]);

  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 650);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user || isLoading) {
      return;
    } else if (commentText === "") {
      toast.error("Please write a review", {
        position: "bottom-left",
        autoClose: 3900,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          fontFamily: "Arial",
          fontSize: "17px",
          fontWeight: "bold",
          color: "red",
          borderRadius: "5px",
          padding: "10px",
        },
      });
      return;
    }

    setIsLoading(true);
    const date = new Date();

    const commentsDocRef = doc(
      db,
      `reviews/${id}-${MediaType}/review/${user?.uid}-${date}`
    );

    const docData = {
      uid: user?.uid,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
      text: commentText,
      createdAt: date,
    };

    await setDoc(commentsDocRef, docData, { merge: true });

    toast.success("Your Review have been added !", {
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

    setIsLoading(false);
    setCommentText(""); // Clear the textarea after submitting the comment
  };

  const handleRemove = async (comment) => {
    if (!user || isLoading) {
      return;
    }

    setIsLoading(true);

    const confirmDelete = await Swal.fire({
      title: "Are you sure you want to delete this review?",
      text: "This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#2196f3",
    });

    if (confirmDelete.isConfirmed) {
      // Code to delete the comment
      const commentsDocRef = doc(
        db,
        `reviews/${id}-${MediaType}/review/${
          user?.uid
        }-${comment?.createdAt.toDate()}`
      );

      const docSnapshot = await getDoc(commentsDocRef);

      if (docSnapshot.exists()) {
        //Document already exists

        deleteDoc(commentsDocRef)
          .then(() => {
            toast.success("Review removed !", {
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
            toast.error("Error in Removing Review.", {
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
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {!firstLoading ? (
        <StyledSection>
          <div
            className="section__header mb-2"
            style={{
              textDecorationLine: "underline",
              textDecorationColor: "#FFBA08",
              textDecorationThickness: "4px",
              paddingLeft: "0.5rem",
              textUnderlineOffset: "0.25rem",
            }}
          >
            <h2>REVIEWS ({reviews.length})</h2>
          </div>

          <div className="rightbar">
            <div className="rightbarWrapper">
              {reviews?.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="comment-row">
                    <Link to={"/profile"}>
                      <img
                        src={comment.photoURL}
                        alt="User profile"
                        className="postProfileImg"
                      />
                    </Link>
                    <div>
                      <div className="commentHeader">
                        <Link to={"/profile"} className="customLinkStyle">
                          <span className="commentUsername">
                            {comment.displayName}
                          </span>
                        </Link>
                        <span className="commentDate">
                          {formatDistanceToNow(comment?.createdAt.toDate(), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-and-icon">
                    <div className="commentText">{comment.text}</div>
                    {comment.uid === user?.uid && (
                      <span className="commentRemove">
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => handleRemove(comment)}
                        />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <div className="comment">
                <div className="comment-wrapper">
                  <div className="comment-top">
                    <textarea
                      placeholder="Write a comment..."
                      className="comment-input"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                  </div>
                  <hr className="comment-hr" />
                  <form className="comment-bottom" onSubmit={handleSubmit}>
                    <button className="comment-button" type="submit">
                      Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </StyledSection>
      ) : (
        <div
          style={{
            alignItems: "center",
            textAlign: "center",
            paddingTop: "0.5rem",
          }}
        >
          <ScaleLoader
            color="gray"
            height={300}
            width={20}
            loading={firstLoading}
            margin={10}
          />
        </div>
      )}
    </>
  );
};

const StyledSection = styled.section`
  width: 80%;

  .text-and-icon {
    display: flex;
    justify-content: space-between;
  }

  .commentRemove {
    cursor: pointer;
    margin-left: auto;
  }
  .comment-wrapper {
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    border-radius: 10px;
    padding: 10px;
  }

  .comment-top {
    display: flex;
    align-items: center;
  }

  .comment-profile-img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .comment-input {
    width: 100%;
    height: 110px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    resize: none;
    font-size: 15px;
  }

  .comment-input:focus {
    border: 2px solid #333;
  }

  .comment-hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 10px 0;
  }

  .comment-bottom {
    display: flex;
    justify-content: flex-start;
  }

  .comment-button {
    background-color: #1877f2;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .comment-button:hover {
    background-color: #166fe5;
  }

  .customLinkStyle:hover {
    color: #333;
    text-decoration: underline;
  }

  .rightbar {
    overflow-y: auto;
    padding: 10px;

    border-radius: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }

  .rightbar::-webkit-scrollbar {
    width: 8px;
  }

  .rightbar::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
  }

  .rightbarWrapper {
    padding: 2px 2px 2px 2px;
  }

  .comment-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .comment {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .comment:not(:first-child) {
    border-top: 3px solid lightgray;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .postProfileImg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .commentHeader {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .commentUsername {
    font-weight: bold;
    margin-right: 9px;
    text-decoration: underline;
  }

  .commentDate {
    display: flex;
    font-size: 12px;
    color: #919191;
    text-align: right;
    justify-content: flex-end;
  }

  .commentText {
    overflow-wrap: break-word;
    font-weight: 500;
    font-size: 1.11rem;
    padding: 5px 0;
    overflow: auto;
  }
`;

export default MediaReview;
