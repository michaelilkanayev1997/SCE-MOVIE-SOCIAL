/* eslint-disable */
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faThumbsUp,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import styled from "styled-components";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import Comments from "./Comments";
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import apiConfig from "../api/apiConfig";
import OtherUserProfile from "./OtherUserProfile";

const Post = ({ post, user }) => {
  const [likesAmount, setLikesAmount] = useState(
    Object.keys(post?.likes).length
  );
  const [isReported, setIsReported] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLikeLoading, setLikeIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [userPopUp, setUserPopUp] = useState(false);

  const postUser = post?.user;

  //getting comments (Firestore) documents
  const query = collection(db, `posts/${post?.id}/comments`);
  const [comments, loading, error] = useCollectionData(query);

  const sortedComments = comments?.sort(
    (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
  );

  const postDocRef = doc(db, `posts/${post?.id}`);

  const handleFavorite = async () => {
    if (!user || isLoading) {
      return;
    }
    setIsLoading(true);
    const docSnapshot = await getDoc(postDocRef);

    if (user?.uid in docSnapshot?.data()?.favorites) {
      //user has already Saved this post
      const docData = {
        favorites: { [user?.uid]: deleteField() },
      };

      setDoc(postDocRef, docData, { merge: true })
        .then(() => {
          toast.success("UnSaved !", {
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
      //user didn't favorited already this post , creating ...
      const docData = {
        favorites: { [user?.uid]: "" },
      };
      await setDoc(postDocRef, docData, { merge: true });

      toast.success("Saved !", {
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
  };

  const handleLike = async () => {
    if (!user || isLoading) {
      return;
    }

    setLikeIsLoading(true);
    const docSnapshot = await getDoc(postDocRef);

    if (user?.uid in docSnapshot?.data()?.likes) {
      //user has already liked this post
      const docData = {
        likes: { [user?.uid]: deleteField() },
      };

      setDoc(postDocRef, docData, { merge: true })
        .then(() => {
          setLikesAmount((prevCount) => prevCount - 1);
          toast.success("Disliked !", {
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
          toast.error("Error in Removing from likes.", {
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
      //user didn't liked already this post , creating ...
      const docData = {
        likes: { [user?.uid]: "" },
      };
      await setDoc(postDocRef, docData, { merge: true });

      setLikesAmount((prevCount) => prevCount + 1);

      toast.success("Liked !", {
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

    setLikeIsLoading(false);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    getDoc(postDocRef).then((docSnapshot) => {
      if (user?.uid in docSnapshot.data().likes) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }

      if (user?.uid in docSnapshot.data().favorites) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }

      if (
        docSnapshot?.data()?.reports !== undefined &&
        user?.uid in docSnapshot?.data()?.reports
      ) {
        setIsReported(true);
      } else {
        setIsReported(false);
      }
    });
  }, [post]);

  const handlePostDelete = async () => {
    if (!user || isLoading || isLikeLoading) {
      return;
    }

    const confirmDelete = await Swal.fire({
      title: "Are you sure you want to delete this post?",
      text: "This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#2196f3",
    });

    if (confirmDelete.isConfirmed) {
      // Code to delete the post
      const postDocRef = doc(db, `posts/${post?.id}`);

      const commentsCollectionRef = collection(
        db,
        `posts/${post?.id}/comments`
      );

      const docSnapshot = await getDoc(postDocRef);

      if (docSnapshot.exists()) {
        //Document already exists
        const commentsSnapshot = await getDocs(commentsCollectionRef);
        commentsSnapshot.forEach((comment) => {
          deleteDoc(comment.ref);
        });
        deleteDoc(postDocRef)
          .then(() => {
            window.location.reload(); // reload the page
            toast.success("Post removed !", {
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
            toast.error("Error in Removing Post.", {
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
  };

  const handleReport = async () => {
    if (!user || isLoading) {
      return;
    }

    setIsLoading(true);
    const docSnapshot = await getDoc(postDocRef);

    if (
      docSnapshot?.data()?.reports !== undefined &&
      user?.uid in docSnapshot?.data()?.reports
    ) {
      //user has already reported this post
      const docData = {
        reports: { [user?.uid]: deleteField() },
      };

      setDoc(postDocRef, docData, { merge: true })
        .then(() => {
          toast.success("Post has been UnReported !", {
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
          toast.error("Error in Removing from reports.", {
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
      //user didn't report already this post , creating ...
      const docData = {
        reports: { [user?.uid]: "" },
      };
      await setDoc(postDocRef, docData, { merge: true });

      toast.success("Post has been Reported !", {
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
    setIsReported(!isReported);
    setIsLoading(false);
  };

  const viewUser = () => {
    setUserPopUp(true);
  };

  const background = apiConfig.originalImage(post?.imgURL);

  return (
    <>
      {userPopUp && (
        <OtherUserProfile setUserPopUp={setUserPopUp} postUser={postUser} />
      )}
      <StyledSection>
        {showComments && (
          <div className="commentsSidebar">
            <Comments comments={sortedComments} user={user} post={post} />
          </div>
        )}
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <div
                  className="imageContainer"
                  style={{ position: "relative" }}
                >
                  <div style={{ position: "absolute", top: 0, left: 6 }}>
                    <ClipLoader
                      color="#979090"
                      size={35}
                      loading={!imageLoading}
                    />
                  </div>
                  <Link
                    onClick={() => {
                      viewUser();
                    }}
                  >
                    <img
                      className="postProfileImg"
                      src={postUser?.photoURL}
                      alt={postUser?.photoURL}
                      onLoad={() => setImageLoading(true)}
                    />
                  </Link>
                </div>
                <Link
                  onClick={() => {
                    viewUser();
                  }}
                  className="customLinkStyle"
                >
                  <span className="postUsername">{postUser?.displayName}</span>
                </Link>
                <span className="postDate">
                  {formatDistanceToNow(post?.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div
                className="postTopRight"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreVertIcon />
                {showMenu && (
                  <ul className="postMenu">
                    {postUser.uid !== user?.uid && (
                      <>
                        {!isReported ? (
                          <li className="postMenuItem" onClick={handleReport}>
                            Report
                          </li>
                        ) : (
                          <li className="postMenuItem" onClick={handleReport}>
                            UnReport
                          </li>
                        )}
                      </>
                    )}
                    {postUser.uid === user?.uid && (
                      <li className="postMenuItem" onClick={handlePostDelete}>
                        Delete
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
            <Link
              to="/detail"
              state={{ item: post?.item, MediaType: post?.mediaType }}
            >
              <div className="media-title">
                <h1>{post?.title}</h1>
              </div>
            </Link>
            <div className="postCenter">
              <span
                className="postText"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  lineHeight: "1.5",
                  color: "#333",
                  textShadow: "1px 1px 1px #ddd",
                }}
              >
                {post?.text}
              </span>
              <Link
                to="/detail"
                state={{ item: post?.item, MediaType: post?.mediaType }}
              >
                <img className="postImg" src={background} alt={post?.imgURL} />
              </Link>
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <span className="iconWrapper">
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
                    <FontAwesomeIcon
                      icon={faHeart}
                      color={isFavorite ? "#FF5733" : "#D1D1D1"}
                      onClick={handleFavorite}
                    />
                  )}
                </span>
                <span className="iconWrapper">
                  {isLikeLoading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      style={{
                        color: "#0066CC",
                        textShadow: "0px 0px 4px #fff",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      color={isLiked ? "#0066CC" : "#D1D1D1"}
                      onClick={handleLike}
                    />
                  )}
                </span>
                <span className="postLikeCounter">
                  {likesAmount} people like it
                </span>
              </div>
              <div className="postBottomRight">
                <span
                  className="postCommentText"
                  onClick={() => setShowComments(!showComments)}
                >
                  {comments?.length} comments
                </span>
              </div>
            </div>
          </div>
        </div>
      </StyledSection>
    </>
  );
};

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
  .postText {
    white-space: pre-line;
    overflow-wrap: break-word;
    word-wrap: break-word;
    max-width: 100%;
    max-height: 100%;
    font-size: 1.2rem;
  }
  .media-title {
    text-align: center;
    margin-bottom: 20px;
    text-decoration: underline gray 3px;
  }

  .media-title h1 {
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #333;
    margin: 0;
  }

  .commentsSidebar::-webkit-scrollbar {
    width: 8px; /* set the width of the scrollbar */
  }

  .commentsSidebar::-webkit-scrollbar-track {
    background: #f5f5f5; /* set the color of the scrollbar track */
  }

  .commentsSidebar::-webkit-scrollbar-thumb {
    background-color: #ccc; /* set the color of the scrollbar thumb */
    border-radius: 8px; /* round the edges of the scrollbar thumb */
    border: 2px solid #f5f5f5; /* add a border to the scrollbar thumb */
  }

  .commentsSidebar {
    max-height: 85vh;
    overflow-y: auto;
    float: right;
    width: 28%;
    height: auto;
    background-color: white;
    border-left: 1px solid #e6ecf0;
    border-radius: 10px;
    -webkit-box-shadow: 2px 2px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 2px 2px 16px -8px rgba(0, 0, 0, 0.68);
  }

  .customLinkStyle:hover {
    color: #333;
    text-decoration: underline;
  }
  .postTopRight {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    background-color: #f2f2f2;
  }

  .postTopRight:hover {
    background-color: #e2e2e2;
  }

  .postTopRight svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: #444;
  }

  .postMenu {
    position: absolute;
    top: 2rem;
    right: 0;
    width: 6.5rem;
    list-style: none;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    z-index: 1;
  }

  .postMenuItem {
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .postMenuItem:hover {
    background-color: #f2f2f2;
  }
  .post {
    width: 70%;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 16px -7px rgba(0, 0, 0, 0.68);
    box-shadow: 2px 2px 16px -7px rgba(0, 0, 0, 0.68);
    margin: 30px 0;
  }

  .postWrapper {
    padding: 10px;
  }

  .postTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .postTopLeft {
    display: flex;
    align-items: center;
  }

  .postProfileImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .postUsername {
    font-size: 21px;
    font-weight: 500;
    margin: 0 10px;
  }

  .postDate {
    font-size: 12px;
  }

  .postCenter {
    margin: 20px 0;
  }

  .postImg {
    margin-top: 20px;
    width: 100%;
    height: 500px;
    max-height: none;
    object-fit: contain;
  }

  .postBottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .postBottomLeft {
    display: flex;
    align-items: center;
  }
  .iconWrapper {
    font-size: 1.5em;
    margin-right: 5px;
    cursor: pointer;
    padding-left: 0.5rem;
  }

  .postLikeCounter {
    font-size: 16px;
    padding-left: 1.1rem;
  }

  .postCommentText {
    cursor: pointer;
    border-bottom: 1px dashed gray;
    font-size: 17px;
  }
`;

export default Post;
