import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const PopUp = () => {
  const [PopUpOpen, setPopUpOpen] = useState(true);
  const navigate = useNavigate();

  const sendToSignIn = () => {
    navigate("/login");
  };

  if (!PopUpOpen) return null;

  return (
    <>
      <StyledPopUp>
        <div className="overlay">
          <div className="popup">
            <div className="modalRight">
              <p className="closeBtn" onClick={() => setPopUpOpen(false)}>
                X
              </p>

              <div className="content">
                <h2>Welcome to SCE-MOVIE-SOCIAL!</h2>
                <p>
                  Sign UP now and you can enjoy detailed and rich content of
                  movies and series.
                </p>
                <p>
                  And in addition, you will be able to meet other students with
                  With a love for cinema like you.
                </p>
              </div>
              <div className="btnContainer">
                <button className="btnPrimary" onClick={sendToSignIn}>
                  <span className="bold">YES</span>, take me to Sign In
                </button>
                <button
                  className="btnOutline"
                  onClick={() => setPopUpOpen(false)}
                >
                  <span className="bold">NO</span>, thanks
                </button>
              </div>
            </div>
          </div>
        </div>
      </StyledPopUp>
    </>
  );
};

const StyledPopUp = styled.section`
  .overlay::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 500;
  }

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 10px rgba(200, 200, 200, 0.45);
    padding: 20px;
    max-width: 500px;
    width: 100%;
    z-index: 9999;
    text-align: center;
  }

  .modalRight {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .closeBtn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    cursor: pointer;
    color: black;
  }

  .content {
    margin: 20px 0;
    color: black;
  }

  .btnContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 1rem 2rem;
  }

  .btnPrimary {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
  }

  .btnPrimary:hover {
    background-color: #0069d9;
  }

  .btnOutline {
    background-color: transparent;
    color: #007bff;
    border: 1px solid #007bff;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }

  .btnOutline:hover {
    background-color: #f0f0f0;
  }
`;

export default PopUp;
