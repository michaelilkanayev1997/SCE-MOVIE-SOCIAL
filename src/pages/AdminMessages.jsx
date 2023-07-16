/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import SideBar from "../components/SideBar";
import { UserAuth } from "../context/AuthContext";
import MessagesTable from "../components/MessagesTable";

const AdminMessages = () => {
  const { user } = UserAuth() ?? {};
  //getting users (Firestore) documents
  const query = collection(db, "admin messages");
  const [docs, loading, error] = useCollectionData(query);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (docs) {
      setMessages(docs);
    }
  }, [docs]);

  return (
    <div style={{ padding: "5rem", marginLeft: "10rem", paddingTop: "6rem" }}>
      <SideBar user={user} />
      {loading ? "loading..." : <MessagesTable messages={messages} />}
    </div>
  );
};

export default AdminMessages;
