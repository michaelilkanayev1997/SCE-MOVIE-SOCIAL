import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp } from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialInstagram,
} from "react-icons/ti";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

const Profile = ({ user, userFirestoreDoc }) => {
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [degree, setDegree] = useState("Bachelor's Degree");
  const [track, setTrack] = useState("Academic Preparatory Program");
  const [degreeYear, setDegreeYear] = useState("First");

  const updateUser = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid);

      const docData = {
        website: website !== undefined ? website : "",
        instagram: instagram !== undefined ? instagram : "",
        facebook: facebook !== undefined ? facebook : "",
        linkedin: linkedin !== undefined ? linkedin : "",
        degree: degree !== undefined ? degree : "Bachelor's Degree",
        track: track !== undefined ? track : "Academic Preparatory Program",
        degreeYear: degreeYear !== undefined ? degreeYear : "First",
      };

      await setDoc(docRef, docData, { merge: true });

      toast.success("Document updated Successfully!", {
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
          paddingLeft: "10px",
        },
      });
    } else {
      console.log("no user to update");
    }
  };

  useEffect(() => {
    setWebsite(userFirestoreDoc?.website);
    setInstagram(userFirestoreDoc?.instagram);
    setFacebook(userFirestoreDoc?.facebook);
    setLinkedin(userFirestoreDoc?.linkedin);
    setDegree(userFirestoreDoc?.degree);
    setDegreeYear(userFirestoreDoc?.degreeYear);
    setTrack(userFirestoreDoc?.track);
  }, [userFirestoreDoc]);

  return (
    <StyledSection>
      <div className="form">
        <div className="form_box">
          <form>
            <div className="form_box_input">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                placeholder={user?.displayName}
                className="form_box_input_userName"
                disabled
              />
            </div>
            <div className="form_box_input">
              <label htmlFor="email">Email</label>
              <div className="form_box_input_box">
                <div className="form_box_input_box_icon">
                  <HiOutlineMail />
                </div>
                <input type="text" placeholder={user?.email} disabled />
              </div>
            </div>
            <div className="form_box_input">
              <label htmlFor="degree">Degree</label>
              <div className="container p-5">
                <select
                  className="custom-select"
                  onChange={(e) => setDegree(e.target.value)}
                  value={degree}
                >
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                </select>
              </div>
            </div>
            <div className="form_box_input">
              <label htmlFor="track">Track</label>
              <div className="container p-5">
                <select
                  className="custom-select"
                  onChange={(e) => setTrack(e.target.value)}
                  value={track}
                >
                  <option value="Academic Preparatory Program">
                    Academic Preparatory Program
                  </option>
                  <option value="Computer Sciences">Computer Sciences</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Visual Communication">
                    Visual Communication
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Electrical and Electronics Engineering">
                    Electrical and Electronics Engineering
                  </option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Industrial Engineering and Management">
                    Industrial Engineering and Management
                  </option>
                  <option value="Chemical Engineering">
                    Chemical Engineering
                  </option>
                  <option value="Green Engineering">Green Engineering</option>
                </select>
              </div>
            </div>
            <div className="form_box_input">
              <label htmlFor="degreeYear">Degree Year</label>
              <div className="container p-5">
                <select
                  className="custom-select"
                  onChange={(e) => setDegreeYear(e.target.value)}
                  value={degreeYear}
                >
                  <option value="First">1</option>
                  <option value="Second">2</option>
                  <option value="Third">3</option>
                  <option value="Fourth">4</option>
                  <option value="Fifth">5</option>
                </select>
              </div>
            </div>
            <div className="form_box_input">
              <label htmlFor="website">Website</label>
              <div className="form_box_input_box">
                <div className="form_box_input_box_icon">
                  <MdOutlineHttp />
                </div>
                <input
                  autoFocus
                  type="text"
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder={userFirestoreDoc?.website || "website"}
                />
              </div>
            </div>
            <div className="form_box_input_social">
              <div className="form_box_input">
                <label htmlFor="facebook">Facebook</label>
                <div className="form_box_input_box">
                  <div className="form_box_input_box_icon">
                    <TiSocialFacebook />
                  </div>
                  <input
                    autoFocus
                    type="text"
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder={
                      userFirestoreDoc?.facebook || "http://facebook"
                    }
                  />
                </div>
              </div>
              <div className="form_box_input">
                <label htmlFor="linkedin">Linkedin</label>
                <div className="form_box_input_box">
                  <div className="form_box_input_box_icon">
                    <TiSocialLinkedin />
                  </div>
                  <input
                    autoFocus
                    type="text"
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder={
                      userFirestoreDoc?.linkedin || "http://linkedin"
                    }
                  />
                </div>
              </div>
              <div className="form_box_input">
                <label htmlFor="instagram">Instagram</label>
                <div className="form_box_input_box">
                  <div className="form_box_input_box_icon">
                    <TiSocialInstagram />
                  </div>
                  <input
                    autoFocus
                    type="text"
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder={
                      userFirestoreDoc?.instagram || "http://instagram"
                    }
                  />
                </div>
              </div>
            </div>

            <div className="form_box_btn">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  updateUser();
                }}
              >
                Upload Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  /* Style for label */
  label {
    color: #fff;
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
    text-decoration: underline;
    text-decoration-color: orange;
    text-decoration-thickness: 4px;
    text-underline-offset: 0.4em;
  }
  input:focus {
    outline: none;
    box-shadow: 0px 4px 4px whitesmoke;
    border-color: #4267b2;
  }

  /* Style for input */
  input,
  select {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    margin-bottom: 20px;
    font-size: 11px;
    color: #333;
    font-family: inherit;
    box-sizing: border-box;
    outline: none;
    font-weight: bold;
  }

  /* Style for select */
  select.custom-select {
    display: block;
    width: 50%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1.2rem;
    line-height: 1.5;
    color: black;
    font-weight: bold;
    background-color: #fff;
    background-clip: padding-box;
    border: none;
    margin-bottom: 20px;
    font-family: inherit;
    box-sizing: border-box;
    outline: none;
  }

  .form {
    width: 100%;
  }
  .form_box_input {
    margin-top: 2rem;
  }
  .form_box_input label {
    display: block;
    width: 100%;
    margin-left: 1rem;
    font-weight: 700;
    font-size: 1.3rem;
  }
  .form_box_input_userName {
    width: 100%;
    border: 1px solid var(--icons-color);
    padding: 1rem;
    border-radius: 1rem;
    background-color: transparent;
    margin-top: 0.5rem;
    outline: none;
    font-size: 1.3rem;
  }
  .form_box_input::placeholder {
    font-size: 1.2rem;
    color: var(--icons-color);
  }
  .form_box_input_box {
    width: 100%;
    border: 1px solid var(--icons-color);
    border-radius: 1rem;
    align-items: center;
    display: flex;
    gap: 1rem;
    overflow: hidden;
  }
  .form_box_input_box_icon {
    font-size: 2rem;
    background-color: var(--icos-color);
    padding: 0.5rem 1rem;
    color: var(--main-bg-color);
    display: grid;
    cursor: pointer;
  }
  .form_box_input_box input {
    width: 70%;
    border: 0;
    background-color: transparent;
    color: white;
    font-size: 1.2rem;
  }
  .form_box_input_social {
    display: grid;
    grid-template-columns: repeat(0, 1fr);
    gap: 1rem;
  }
  .form_box_btn button {
    background-color: #ff8c00;
    border: none;
    color: #fff;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  .form_box_btn {
    width: 50%;
    align-items: center;
    text-align: center;
    margin-top: 30px;
    padding-bottom: 3rem;
  }
  @media screen and (max-width: 35em) {
    .form_box_input_social {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (min-width: 425px) and (max-width: 768px) {
    .form_box_input_social {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default Profile;
