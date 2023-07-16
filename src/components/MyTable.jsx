import React, { useState } from "react";
import { Table } from "reactstrap";
import styled from "styled-components";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { deleteDoc, doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Swal from "sweetalert2";

const MyTable = ({ users }) => {
  const [onRequest, setOnRequest] = useState(false);

  const deleteUser = async (user) => {
    if (onRequest) return;

    // Show confirmation dialog
    const confirmDelete = await Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#2196f3",
    });

    if (!confirmDelete.isConfirmed) return;

    setOnRequest(true);

    deleteDoc(doc(db, `users/${user?.uid}`))
      .then(() => {
        toast.success("User Removed from DB!", {
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
        toast.error("Error in Removing the user .", {
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

    setOnRequest(false);
  };

  const blockUser = async (user) => {
    if (onRequest) return;

    // Show confirmation dialog
    const confirmDelete = await Swal.fire({
      title: "Are you sure you want to block this user?",
      text: "This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Block",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#2196f3",
    });

    if (!confirmDelete.isConfirmed) return;

    setOnRequest(true);

    const docRef = doc(db, `users/${user?.uid}`);

    const blockedUntil = Date.now() + 7 * 24 * 60 * 60 * 1000; // block for one week
    const docData = {
      blockedUntil: blockedUntil,
    };

    await setDoc(docRef, docData, { merge: true });

    toast.success("User has been Blocked !", {
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

    setOnRequest(false);
  };

  const unblockUser = async (user) => {
    if (onRequest) return;

    // Show confirmation dialog
    const confirmDelete = await Swal.fire({
      title: "Are you sure you want to UnBLOCK this user?",
      text: "This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "UnBlock",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#2196f3",
    });

    if (!confirmDelete.isConfirmed) return;

    setOnRequest(true);

    const docRef = doc(db, `users/${user?.uid}`);

    const docData = {
      blockedUntil: deleteField(),
    };

    setDoc(docRef, docData, { merge: true });

    toast.success("User UnBlocked!", {
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

    setOnRequest(false);
  };

  return (
    <StyledSection>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>User-Name</th>
            <th>Email</th>
            <th>Created-At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>
                  {user ? (
                    <img
                      src={user?.photoURL}
                      alt={index}
                      className="avatar-image"
                    />
                  ) : null}

                  {user.displayName}
                </td>
                <td>{user.email}</td>
                <td>{user.createdAt?.toDate().toLocaleString()}</td>
                <td>
                  <div className="buttons">
                    {user.blockedUntil && Date.now() < user.blockedUntil ? (
                      <LoadingButton
                        variant="contained"
                        sx={{
                          marginTop: 1,
                          width: "5.2rem",
                          backgroundColor: "#FF5733",
                          "&:hover": {
                            backgroundColor: "#ff8c66",
                          },
                        }}
                        loading={onRequest}
                        onClick={() => unblockUser(user)}
                      >
                        UnBlock
                      </LoadingButton>
                    ) : (
                      <LoadingButton
                        variant="contained"
                        sx={{
                          marginTop: 1,
                          width: "5.2rem",
                          backgroundColor: "#007FFF",
                          "&:hover": {
                            backgroundColor: "#00308F",
                          },
                        }}
                        loading={onRequest}
                        onClick={() => blockUser(user)}
                      >
                        Block
                      </LoadingButton>
                    )}
                    <LoadingButton
                      variant="contained"
                      sx={{
                        marginTop: 1,
                        backgroundColor: "#c62828",
                        "&:hover": {
                          backgroundColor: "red",
                        },
                      }}
                      loading={onRequest}
                      onClick={() => deleteUser(user)}
                    >
                      Delete User
                    </LoadingButton>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }
  th:nth-child(5) {
    padding-left: 70px;
  }
  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }

  thead th {
    cursor: pointer;
  }

  tbody tr:hover {
    background-color: gray;
  }

  tbody img.avatar-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .buttons {
    margin-left: 3rem;
    gap: 10px;
    display: flex;
  }
`;
export default MyTable;
