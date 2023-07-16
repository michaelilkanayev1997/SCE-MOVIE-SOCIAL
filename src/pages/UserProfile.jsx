import React, { useEffect, useState } from "react";
import styled from "styled-components";
import userIcon from "../assets/profileIcon.jpg";
import ProfileForm from "../components/ProfileForm";
import { UserAuth } from "../context/AuthContext";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import GlobalLoading from "../components/GlobalLoading";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const UserProfile = () => {
  const { user, isLoading, userFirestoreDoc } = UserAuth() ?? {};
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async () => {
    if (!imageUpload) {
      toast.error("Please select an image to upload.", {
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
      return;
    }

    if (!imageUpload.type.startsWith("image/")) {
      toast.error("Only image files are allowed.", {
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
      return;
    }

    setLoading(true);
    const imageRef = ref(storage, `profileImage/${user.uid}`);

    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setImageUrl(url);
            updateProfile(user, {
              photoURL: url,
            }).catch((error) => {
              console.log(error);
              toast.error("Failed to upload image.");
              return;
            });
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
            toast.error("Error getting the image url");
            return;
          });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
        return;
      });

    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, { photoURL: imageUrl }, { merge: true });

    setImageUpload(null);
    setLoading(false);

    toast.success("Uploaded file Successfully!", {
      position: "bottom-left",
      autoClose: 4500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        fontFamily: "Arial",
        fontSize: "15px",
        fontWeight: "bold",
        color: "#4CAF50",
        borderRadius: "5px",
        padding: "10px",
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      setImageUrl(user.photoURL);
    }
  }, [user]);

  return (
    <StyledSection>
      {isLoading ? (
        <GlobalLoading />
      ) : (
        <div className="profile-wrapper">
          <div className="profile">
            <div className="profile_info">
              <h1 className="unique-heading">Profile Settings</h1>
              <p>Here you can manage your personal profile.</p>
            </div>
            <div className="profile_box">
              <div className="profile_box_img">
                <img
                  src={user ? imageUrl : userIcon}
                  alt={imageUrl}
                  className="avatar-image"
                />
                <label htmlFor="imageUpload" className="upload-btn">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                  disabled={loading}
                />
                <button onClick={handleImageUpload} disabled={!imageUpload}>
                  Save Image
                </button>
              </div>
              <div className="profile_box_form">
                <ProfileForm userFirestoreDoc={userFirestoreDoc} user={user} />
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  .profile-wrapper {
    display: flex;
    justify-content: center;
  }
  .profile_box_form {
    margin-left: 3rem;
  }
  .profile {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
  }

  .unique-heading {
    font-size: 36px;
    color: #ff8c00;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
  }

  .unique-heading::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -30px;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #ff8c00;
    border-radius: 5px;
  }
  .profile_info {
    width: 100%;
    padding-top: 2rem;
    margin: 0 auto;
    text-align: center;
    border-bottom: 1px solid var(--shadow-dark-color);
  }

  .profile_info h1 {
    font-size: 4rem;
    line-height: 0.5;
  }

  .profile_info p {
    padding-top: 2.2rem;
    font-size: 1.1rem;
    width: 85%;
    line-height: 1.2;
    padding-bottom: 0.5rem;
  }
  .profile_box {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin-top: 3rem;
    gap: 3rem;
    align-items: flex-start;
  }
  .profile_box_img {
    margin-top: 2rem;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120%;
  }
  .avatar-image {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    object-position: center;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
    overflow: hidden;
    display: block;
  }
  .upload-btn {
    cursor: pointer;
    background-color: #4caf50;
    color: white;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    transition: all 0.3s ease-in-out;
  }

  .upload-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }

  input[type="file"] {
    display: none;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: none;
    outline: none;
  }

  button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  button:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }

  .toast-custom-error button[aria-label="close"]:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media screen and (max-width: 600px) {
    .profile {
      padding: 10px;
    }

    .unique-heading {
      font-size: 24px;
      margin-bottom: 10px;
    }

    .unique-heading::after {
      height: 3px;
      bottom: -5px;
    }

    .avatar-image {
      width: 100px;
      height: 100px;
      margin-bottom: 10px;
    }
  }
`;

export default UserProfile;
