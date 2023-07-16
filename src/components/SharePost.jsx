import React, { useState } from "react";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

const SharePost = ({ user, MediaType, item }) => {
  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user || isLoading) {
      return;
    } else if (postText === "") {
      toast.error("A post cannot be empty!", {
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
    } else if (postText.length < 50) {
      toast.error("A post must be at least 50 characters long!", {
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

    const randomId = uuidv4();
    const postDocRef = doc(db, `posts/${randomId}`);

    const docData = {
      user: {
        uid: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
      },
      favorites: {},
      likes: {},
      title: MediaType === "movie" ? item?.title : item?.name,
      id: randomId,
      imgURL: item.backdrop_path ? item.backdrop_path : item.poster_path,
      text: postText,
      createdAt: date,
      mediaType: MediaType,
      item: item,
    };

    await setDoc(postDocRef, docData, { merge: true });

    toast.success("Your Post have been added !", {
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
    setPostText(""); // Clear the textarea after submitting the post

    navigate("/posts");
  };

  return (
    <StyledSection>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={user?.photoURL}
              alt={user?.photoURL}
            />
            <textarea
              placeholder={"What's in your mind " + user?.displayName + "?"}
              className="shareInput"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
          <hr className="shareHr" />
          <form className="shareBottom" onSubmit={handleSubmit}>
            <button className="shareButton" type="submit">
              Share
            </button>
          </form>
        </div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  .share {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .shareWrapper {
    background-color: #fff;
    width: 90%;
    max-width: 700px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .shareTop {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }

  .shareProfileImg {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }

  .shareInput {
    flex: 1;
    border: none;
    outline: none;
    font-size: 18px;
    padding: 10px;
    border-radius: 20px;
    background-color: #f0f2f5;
    height: 100px;
    resize: none;
  }

  .shareHr {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    height: 1px;
    background-color: #ddd;
  }

  .shareBottom {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .shareButton {
    background-color: #1877f2;
    color: #fff;
    border: none;
    outline: none;
    font-size: 18px;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }

  .shareButton:hover {
    background-color: #166fe5;
  }
`;

export default SharePost;
