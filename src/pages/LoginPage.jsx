/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import MoodleLogo from "../assets/pngwing.com.png";
import { UserAuth } from "../context/AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getDoc } from "firebase/firestore";

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { googleSignIn, createUserDocument, user, userIsBlocked } =
    UserAuth() ?? {};

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await googleSignIn();
      const userDocRef = await createUserDocument(user);

      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (
          userData?.blockedUntil !== undefined &&
          Date.now() < userData?.blockedUntil
        ) {
          toast.info("your User has been Blocked !", {
            position: "bottom-left",
            autoClose: 4100,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              fontFamily: "Arial",
              fontSize: "16px",
              fontWeight: "bold",
              color: "red",
              borderRadius: "5px",
              paddingLeft: "10px",
            },
          });
        } else if (user) {
          toast.success("You have successfully signed in!", {
            position: "bottom-left",
            autoClose: 4100,
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
        }
      } else {
        console.log("User does not exist");
      }
    } catch (error) {
      toast.error(error, {
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
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);

  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  return (
    <BackgroundImg>
      <Section>
        <MainContainer>
          <img
            src="https://en.sce.ac.il/ver/9/tpl/website/img/en_sp_logo.png"
            alt="logo"
            width="80%"
          ></img>
          <h1>SCE MOVIE SOCIAL</h1>

          <ButtonContainer>
            <Button
              onClick={handleGoogleSignIn}
              style={{
                color: "#fff",
                textShadow: "1px 1px #000",
                fontSize: "20px",
                fontFamily: "Montserrat",
              }}
            >
              SIGN UP
            </Button>
          </ButtonContainer>

          <LoginWith>LINKS:</LoginWith>
          <HorizontalRule />
          <IconsContainer>
            <a
              target="_blank"
              href="https://www.facebook.com/SCE.Bsc/?locale=he_IL"
              rel="noreferrer"
            >
              <Icon color={FacebookBackground}>
                <FaFacebookF />
              </Icon>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/sce.academy/"
              rel="noreferrer"
            >
              <Icon color={InstagramBackground}>
                <FaInstagram />
              </Icon>
            </a>
            <a
              target="_blank"
              href="https://is.sce.ac.il/nidp/idff/sso?id=sceloa2&sid=4&option=credential&sid=4&target=https%3A%2F%2Fportal.sce.ac.il%2Fmenu%2Findex.php"
              rel="noreferrer"
            >
              <Icon>
                <div style={{ scale: "1.3", marginTop: "0.5rem" }}>
                  <img src={MoodleLogo} alt="Logo2" width="100%" />
                </div>
              </Icon>
            </a>
          </IconsContainer>
        </MainContainer>
      </Section>
    </BackgroundImg>
  );
};

const Icon = ({ color, children }) => {
  return <StyledIcon background={color}>{children}</StyledIcon>;
};

const StyledIcon = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const BackgroundImg = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url("https://img.freepik.com/free-photo/pile-toothsome-popcorn-marble-background-high-quality-photo_114579-77815.jpg?w=1060&t=st=1679248819~exp=1679249419~hmac=c5c728204295913f090dc0e743907e2a8ad1b726eea124d340471b07c57c1eab");
  background-size: cover;
  background-position: center center;
`;

const Section = styled.section`
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 5;
    font-size: 25px;
    color: gray;
    text-decoration: underline;
  }
`;

const MainContainer = styled.div`
  border: 4px solid #14163c;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  width: 30vw;
  background: white;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;

  img {
    padding-left: 1rem;
  }
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1500px) {
    width: 30vw;
    height: 70vh;
  }
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
  button {
    background-color: #14163c;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    width: 65%;
    height: 3rem;
    border: none;
    color: white;
    border-radius: 2rem;
    font-size: 0.8rem;
    cursor: pointer;
    background-color: #f57c00;
    border-radius: 0.3rem;
    font-size: 1.2rem;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #ffa000;
    }
  }
`;

const LoginWith = styled.h5`
  color: blue;
  margin-bottom: 0rem;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0rem 0 0rem 0;
  width: 80%;
`;

export default LoginPage;
