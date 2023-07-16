import React, { useState } from "react";
import styled from "styled-components";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const MessagesTable = ({ messages }) => {
  const [answerText, setAnswerText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const sendEmail = async (email, message, messageID) => {
    const params = {
      email: email,
      message: message,
    };
    try {
      await emailjs.send(
        "service_fazscnd",
        "template_o68liqp",
        params,
        "te068Cv3WEsAMqJuU"
      );

      deleteDoc(doc(db, `admin messages/${messageID}`));

      toast.success("Your Answer has been successfully sent !", {
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
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("There was an error sending your answer.", {
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
    }
  };

  const handleSubmit = async (email, messageID) => {
    if (isLoading) {
      return;
    } else if (answerText === "") {
      toast.error("The Answer cannot be empty!", {
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

    try {
      const message = answerText;
      await sendEmail(email, message, messageID);
    } catch (error) {
      console.error(error);
      // handle the error
    } finally {
      setIsLoading(false);
      setAnswerText(""); // Clear the textarea after submitting the answer
    }
  };

  return (
    <TableWrapper>
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Created-At</th>
        </tr>
      </thead>
      <tbody>
        {messages &&
          messages.map((message, index) => (
            <React.Fragment key={index}>
              <TableRow key={index} onClick={() => handleRowClick(index)}>
                <TableData>{index}</TableData>
                <TableData>{message.displayName}</TableData>
                <TableData>{message.email}</TableData>
                <TableData>
                  {message.createdAt.toDate().toLocaleString()}
                </TableData>
              </TableRow>
              {expandedRow === index && (
                <ExpandableRow>
                  <ExpandableContent colSpan="4">
                    <div>
                      <div style={{ width: "100%" }}>
                        Message:
                        <div className="message-div">{message.message}</div>
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <textarea
                          placeholder={"Answer to " + message.displayName}
                          className="shareInput"
                          value={answerText}
                          onChange={(e) => setAnswerText(e.target.value)}
                          style={{ marginTop: "5px" }}
                        />
                      </div>

                      <div className="buttons">
                        {isLoading ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            size="xl"
                            style={{
                              color: "#007FFF",
                              textShadow: "0px 0px 4px #fff",
                              animation: "spin 1s linear infinite",
                              marginLeft: "27px",
                              marginTop: "19px",
                            }}
                          />
                        ) : (
                          <LoadingButton
                            onClick={() =>
                              handleSubmit(message.email, message.id)
                            }
                            variant="contained"
                            sx={{
                              marginTop: 1,
                              backgroundColor: "#007FFF",
                              "&:hover": {
                                backgroundColor: "#00308F",
                              },
                            }}
                          >
                            Answer
                          </LoadingButton>
                        )}
                      </div>
                    </div>
                  </ExpandableContent>
                </ExpandableRow>
              )}
            </React.Fragment>
          ))}
      </tbody>
    </TableWrapper>
  );
};

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  @media (max-width: 768px) {
    th,
    td {
      font-size: 12px;
    }
    .message-div {
      font-size: 12px;
      margin-right: 0;
    }
    .buttons {
      margin-top: 10px;
    }
  }
`;

const TableRow = styled.tr`
  cursor: pointer;
`;

const TableData = styled.td`
  height: 50px;
  max-height: 75px;
  max-width: 400px;
  height: 50px;
  padding: 8px;
  overflow: auto;
  border: 1px solid #ddd;
  text-align: left;
  vertical-align: middle;
  word-wrap: break-word;

  &:first-child {
    font-weight: bold;
  }
`;

const ExpandableRow = styled.tr`
  border: 1px solid #ddd;
`;

const ExpandableContent = styled.td`
  padding: 20px;
  overflow: auto;

  .message-div {
    max-width: 100%;
    height: 50px;
    padding: 8px;
    overflow: auto;
    border: 1px solid #ddd;
    text-align: left;
    vertical-align: middle;
    word-break: break-all;
    height: 100px;
    width: 100%;
    resize: none;
    background-color: #f0f2f5;
    color: #000;
    flex: 1;
    border: none;
    outline: none;
    font-size: 18px;
    padding: 10px;
    border-radius: 20px;

    resize: none;
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
    width: 100%;
    resize: none;
  }
  // CSS Animation
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default MessagesTable;
