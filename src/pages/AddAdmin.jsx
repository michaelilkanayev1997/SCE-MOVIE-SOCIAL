import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { UserAuth } from "../context/AuthContext";
import styled from "styled-components";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

const AddAdmin = () => {
  const { user } = UserAuth() ?? {};
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  //getting admins (Firestore) documents
  const usersRef = collection(db, "users");

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the entered email matches the regex pattern
    const isValidEmail = emailRegex.test(enteredEmail);

    // Update the email state and display an error if the email is invalid
    setEmail(enteredEmail);
    setIsValidEmail(isValidEmail);
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const resetFields = () => {
    setEmail("");
    setDisplayName("");
  };

  const handleAddAdmin = async () => {
    if (isLoading) {
      return;
    } else if (email === "" || displayName === "") {
      toast.error("A field cannot be empty!", {
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
    } else if (!isValidEmail) {
      toast.error("Not a Valid Email !", {
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
    const myUsersRefQuery = query(usersRef, where("email", "==", email));

    const newAdmin = [];
    // execute the query and process the results
    getDocs(myUsersRefQuery)
      .then(async (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // add each document's data to the docs array
          newAdmin.push(doc.data());
        });

        const adminsDocRef = doc(db, `admins/${newAdmin[0]?.uid}`);

        const docData = {
          displayName: newAdmin[0]?.displayName,
          createdAt: new Date(),
        };

        await setDoc(adminsDocRef, docData, { merge: true });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    toast.success("New Admin have been added !", {
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
    resetFields();
  };

  return (
    <div style={{ padding: "5rem", marginLeft: "10rem", paddingTop: "6rem" }}>
      <SideBar user={user} />

      <CenterContainer>
        <InputWrapper>
          <Title>Add Admin:</Title>
          <InputLabel>Email:</InputLabel>
          <InputField
            type="email"
            placeholder="Enter the email"
            onChange={handleEmailChange}
            value={email}
          />
          <InputLabel>Display Name:</InputLabel>
          <InputField
            type="name"
            placeholder="Enter the Display Name"
            onChange={handleDisplayNameChange}
            value={displayName}
          />
          <div className="button">
            <Button onClick={handleAddAdmin}>Add</Button>
          </div>
        </InputWrapper>
      </CenterContainer>
    </div>
  );
};

const Button = styled.button`
  display: inline-block;
  background-color: #0070f3;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 100%;
  &:hover {
    background-color: #0052cc;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.4);
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  text-decoration: underline;
  text-decoration-color: orange;
  text-decoration-thickness: 4px;
  text-underline-offset: 0.4em;
  padding-bottom: 1.5rem;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InputWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  & > * {
    margin-bottom: 8px;
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.5rem;
  }
`;

const InputLabel = styled.label`
  font-size: 1.1rem;
  margin-bottom: 4px;
`;

const InputField = styled.input`
  height: 40px;
  width: 500px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #222;
  font-size: 19px;
  color: #fff;
  background-color: #222;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.4);
  }
`;

export default AddAdmin;
