import MyTable from "../components/MyTable";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";

// Configure Enzyme with the adapter for React 17
configure({ adapter: new Adapter() });

describe("MyTable Component", () => {
  const users = [
    {
      displayName: "User 1",
      email: "user1@example.com",
      createdAt: { toDate: () => new Date() },
      photoURL: "https://example.com/user1.jpg",
    },
    {
      displayName: "User 2",
      email: "user2@example.com",
      createdAt: { toDate: () => new Date() },
      photoURL: "https://example.com/user2.jpg",
    },
  ];

  it("renders table with user data", () => {
    const wrapper = shallow(<MyTable users={users} />);
    const rows = wrapper.find("tbody tr");
    expect(rows).toHaveLength(2);
    expect(rows.at(0).find("td").at(1).text()).toEqual("User 1");
    expect(rows.at(1).find("td").at(1).text()).toEqual("User 2");
  });
});
