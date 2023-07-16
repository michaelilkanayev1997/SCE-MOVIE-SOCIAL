/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const resetFields = () => {
    setEmail("");
    setMessage("");
    setFullName("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) {
      return;
    } else if (email === "" || fullName === "" || message === "") {
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
    } else if (message.length < 15) {
      toast.error("A message must be at least 15 characters long!", {
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
    const messageDocRef = doc(db, `admin messages/${randomId}`);

    const docData = {
      displayName: fullName,
      id: randomId,
      message: message,
      email: email,
      createdAt: date,
    };

    await setDoc(messageDocRef, docData, { merge: true });

    toast.success("Your message have been sent !", {
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
    <>
    <Styledcontactus>
    <div className="contact-info">
        <h1>Contact Us</h1>
        <p>Email: sce-movie-social@ac.sce.ac.il</p>
        <p>Address: Haim Nachman Bialik 56, Beer Sheva, 84100, Israel</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
        <div className="p1">
      
    we would love to respond to your queries and help you. <br></br>
    Please feel free to got in touch with us. <br></br>
    <br></br>
        </div>
        <label htmlFor="name" className="form-label">
            Full Name*
          </label>
          <div className="input-group">
            <input
              type="name"
              id="name"
              value={fullName}
              className="form-input"
              onChange={handleFullNameChange}
            />
            </div>
          <label htmlFor="email" className="form-label">
            Email Address*
          </label>
          <div className="input-group">
            <input
              type="email"
              id="email"
              className={`form-input ${emailError ? "form-input-error" : ""}`}
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="error-message">Please enter your email address</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            className="form-input"
            value={message}
            onChange={handleMessageChange}
          ></textarea>
        </div>
        <button type="submit" className="form-button">
          Send Message
        </button>
        <br></br>
      </form>
    </Styledcontactus>
      
    </>
  );
};



 

const Styledcontactus = styled.div`
/* Font Awesome Library */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.contact-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  color: lightgray;
}

.form-label {
  margin-bottom: 10px;
  font-size: 18px;
  color: lightgray;
}

.form-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.form-input-error {
  border: 1px solid red;
}

.error-message {
  margin-top: 5px;
  color: red;
  font-size: 14px;
}

.form-button {
  background-color: #007bff;
  color: #fff;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-button:hover {
  background-color: #0069d9;
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 50px auto;
  font-size: 2rem;
}

.contact-info h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.contact-info p {
  font-size: 16px;
  color: lightgray;
  margin-bottom: 10px;
}

.contact-info i {
  font-size: 24px;
  color: #007bff;
  margin-right: 10px;
}

`;

export default ContactUs;
