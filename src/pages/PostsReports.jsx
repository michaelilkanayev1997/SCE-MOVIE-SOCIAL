/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ReportsTable from "../components/ReportsTable";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import SideBar from "../components/SideBar";
import { UserAuth } from "../context/AuthContext";

const PostsReports = () => {
  const { user } = UserAuth() ?? {};
  //getting users (Firestore) documents
  const query = collection(db, "posts");
  const [docs, loading, error] = useCollectionData(query);
  const [reportsPosts, setReportsPosts] = useState([]);

  useEffect(() => {
    if (docs) {

        const reportsDocs = [];
        docs.forEach((doc) => {
            if (doc.reports !== undefined) {
                reportsDocs.push(doc);
            }
        })

        reportsDocs.sort((a, b) => b.reports.length - a.reports.length); //sort
        setReportsPosts(reportsDocs);
        console.log(reportsDocs);
    }
    
  }, [docs]);

  return (
    <div style={{ padding: "5rem", marginLeft: "10rem" }}>
      <SideBar user={user} />
    {loading ? "loading..." : <ReportsTable reportsPosts={reportsPosts} />}
    </div>
  );
};

export default PostsReports;