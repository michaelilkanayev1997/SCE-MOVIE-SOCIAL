import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ScaleLoader } from "react-spinners";

const OtherUserProfile = ({ setUserPopUp, postUser }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const userDocRef = doc(db, `users/${postUser?.uid}`);
      const docSnapshot = await getDoc(userDocRef);
      setUserInfo(docSnapshot.data());
      setTimeout(() => {
        setIsLoading(false);
      }, 650);
    };

    fetchData();
  }, [postUser]);

  return (
    <>
      {!isLoading ? (
        <StyledPopUp>
          <div className="overlay">
            <div className="popup">
              <>
                <Card>
                  <p className="closeBtn" onClick={() => setUserPopUp(false)}>
                    X
                  </p>
                  <Container>
                    <ProfileImage
                      src={
                        userInfo?.photoURL !== undefined
                          ? userInfo?.photoURL
                          : "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"
                      }
                      alt="user profile picture"
                    />
                  </Container>
                  <TableWrapper userInfo={userInfo}>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>
                          {userInfo?.displayName !== undefined
                            ? userInfo?.displayName
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>
                          {userInfo?.email !== undefined
                            ? userInfo?.email
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Degree</td>
                        <td>
                          {userInfo?.degree !== undefined
                            ? userInfo?.degree
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Track</td>
                        <td>
                          {" "}
                          {userInfo?.track !== undefined
                            ? userInfo?.track
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>Year</td>
                        <td>
                          {" "}
                          {userInfo?.degreeYear !== undefined
                            ? userInfo?.degreeYear
                            : "-"}
                        </td>
                      </tr>
                      <tr>
                        <td>FaceBook</td>
                        <td>
                          {userInfo?.facebook !== undefined &&
                          userInfo?.facebook !== "" ? (
                            <a
                              target="_blank"
                              href={userInfo?.facebook}
                              rel="noreferrer"
                            >
                              {userInfo?.facebook}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Instagram</td>
                        <td>
                          {userInfo?.instagram !== undefined &&
                          userInfo?.instagram !== "" ? (
                            <a
                              target="_blank"
                              href={userInfo?.instagram}
                              rel="noreferrer"
                            >
                              {userInfo?.instagram}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Linkedin</td>
                        <td>
                          {userInfo?.linkedin !== undefined &&
                          userInfo?.linkedin !== "" ? (
                            <a
                              target="_blank"
                              href={userInfo?.linkedin}
                              rel="noreferrer"
                            >
                              {userInfo?.linkedin}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Website</td>
                        <td>
                          {userInfo?.website !== undefined &&
                          userInfo?.website !== "" ? (
                            <a
                              target="_blank"
                              href={userInfo?.website}
                              rel="noreferrer"
                            >
                              {userInfo?.website}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </TableWrapper>
                </Card>
              </>
            </div>
          </div>
        </StyledPopUp>
      ) : (
        <StyledLoading>
          <div
            style={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <ScaleLoader
              color="#a1a1a1"
              height={300}
              margin={4}
              speedMultiplier={0.7}
              width={8}
            />
          </div>
        </StyledLoading>
      )}
    </>
  );
};
const StyledLoading = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
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
    box-shadow: 0 0 5px 5px rgba(200, 200, 200, 0.45);
    padding: 20px;
    max-width: 500px;
    max-height: 100%;
    width: 100%;
    z-index: 9999;
    text-align: center;
  }
`;
const Card = styled.div`
  .closeBtn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 40px;
    cursor: pointer;
    color: black;
    font-size: 1.4rem;
  }

  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
  padding: 50px;
  text-align: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  max-width: 150px;
  max-height: 140px;
  border-radius: 50%;
  margin-top: -40px;
`;

const TableWrapper = styled.table`
  margin: ${(props) =>
    props.userInfo !== undefined ? "20px -26px auto" : "20px auto"};
  border-collapse: collapse;
  text-align: center;
  align-items: center;

  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    color: #333;
  }

  td:first-child {
    font-weight: bold;
  }
`;

export default OtherUserProfile;
