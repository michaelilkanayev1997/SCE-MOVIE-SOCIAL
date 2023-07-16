/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import MyTable from "../components/MyTable";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import SideBar from "../components/SideBar";
import { UserAuth } from "../context/AuthContext";

const ActiveUsers = () => {
  const { user } = UserAuth() ?? {};
  //getting users (Firestore) documents
  const query = collection(db, "users");
  const [docs, loading, error] = useCollectionData(query);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (docs) {
      setUsers(docs);
    }
  }, [docs]);

  return (
    <div style={{ padding: "5rem", marginLeft: "10rem" }}>
      <SideBar user={user} />
      {loading ? "loading..." : <MyTable users={users} />}
    </div>
  );
};

export default ActiveUsers;
