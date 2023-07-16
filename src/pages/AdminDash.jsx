/* eslint-disable no-unused-vars */
import React from "react";
import SideBar from "../components/SideBar";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  Cell,
} from "recharts";
import styled from "styled-components";

const AdminDash = () => {
  const { user } = UserAuth() ?? {};

  //getting (Firestore) documents
  const UserQuery = collection(db, "users");
  const [usersDocs, userLoading, userError] = useCollectionData(UserQuery);

  const AdminQuery = collection(db, "admins");
  const [adminsDocs, adminLoading, adminError] = useCollectionData(AdminQuery);

  const PostsQuery = collection(db, "posts");
  const [postsDocs, postsLoading, postsError] = useCollectionData(PostsQuery);

  const MessagesQuery = collection(db, "admin messages");
  const [messagesDocs, messagesLoading, messagesError] =
    useCollectionData(MessagesQuery);

  const data = [
    { name: "Users", value: usersDocs?.length },
    { name: "Admins", value: adminsDocs?.length },
    { name: "Posts", value: postsDocs?.length },
    { name: "Messages", value: messagesDocs?.length },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <StyledSection>
      <div className="admin-dashboard">
        <SideBar user={user} />
        <h1>Analytics Dashboard</h1>
        <div className="main-content">
          <div className="chart pie-chart">
            <PieChart width={600} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx={300}
                cy={200}
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconSize={16}
                wrapperStyle={{ fontSize: "20px" }}
              />
            </PieChart>
          </div>
          <div className="chart bar-chart">
            <BarChart
              width={700}
              height={400}
              data={data}
              margin={{
                top: 5,
                right: 50,
                left: 50,
                bottom: 5,
              }}
              barSize={40}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
                fontSize={18}
                fontWeight={700}
              />
              <YAxis
                fontSize={18}
                fontWeight={700}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  .recharts-wrapper {
    width: 100% !important;
  }
  h1 {
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 3rem;
    padding-top: 2rem;
    text-decoration: underline;
    text-decoration-color: gray;
    text-decoration-thickness: 4px;
    text-underline-offset: 0.4em;
  }

  .recharts-legend-wrapper {
    justify-content: flex-start;
  }
  .recharts-legend-item {
    display: flex !important;
    align-items: center !important;
  }

  .recharts-surface:not(.recharts-legend-wrapper) {
    width: 90% !important;
  }

  .main-content {
    align-items: center;
    text-align: center;
    padding-left: 7rem;
    padding-top: 7rem;
    display: inline-block;
    display: flex;
    width: 100%;
  }

  @media (max-width: 768px) {
    .main-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 3rem;
      padding-top: 5rem;
    }
    .recharts-wrapper {
      width: 100%;
    }
    .recharts-surface {
      width: 90% !important;
    }
    .recharts-cartesian-axis {
      font-size: 14px !important;
    }
    .recharts-cartesian-axis-tick-value {
      font-size: 14px !important;
    }
  }
`;

export default AdminDash;
