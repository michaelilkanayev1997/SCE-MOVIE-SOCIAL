import React, { useState } from "react";
import styled from "styled-components";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Swal from "sweetalert2";

const ReportsTable = ({ reportsPosts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const deletePost = async (id) => {
    if (isLoading) return;

    // Show confirmation dialog
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

    if (!confirmDelete.isConfirmed) return;
    setIsLoading(true);
    const commentsCollectionRef = collection(db, `posts/${id}/comments`);

    const commentsSnapshot = await getDocs(commentsCollectionRef);
    commentsSnapshot.forEach((comment) => {
      deleteDoc(comment.ref);
    });

    deleteDoc(doc(db, `posts/${id}`))
      .then(() => {
        toast.success("Removed post from DB!", {
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
        toast.error("Error in Removing the post .", {
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

    setIsLoading(false);
  };

  return (
    <TableWrapper>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Title</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {reportsPosts &&
          reportsPosts.map((reportPost, index) => (
            <React.Fragment key={index}>
              <TableRow key={index} onClick={() => handleRowClick(index)}>
                <TableData>{index}</TableData>
                <TableData>{reportPost.id}</TableData>
                <TableData>{reportPost.title}</TableData>
                <TableData>{Object.keys(reportPost.reports)?.length}</TableData>
              </TableRow>
              {expandedRow === index && (
                <ExpandableRow>
                  <ExpandableContent colSpan="4">
                    <div>
                      <div style={{ width: "100%" }}>
                        Text:
                        <div className="message-div">{reportPost.text}</div>
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
                            onClick={() => {
                              deletePost(reportPost.id);
                            }}
                            variant="contained"
                            sx={{
                              marginTop: 1,
                              backgroundColor: "#007FFF",
                              "&:hover": {
                                backgroundColor: "#00308F",
                              },
                            }}
                          >
                            Delete
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

export default ReportsTable;
