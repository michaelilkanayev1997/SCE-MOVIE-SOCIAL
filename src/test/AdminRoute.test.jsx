import AdminRoute from "../components/AdminRoute";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
// Configure Enzyme with the adapter for React 17
configure({ adapter: new Adapter() });

jest.mock("../context/AuthContext", () => ({
  UserAuth: jest.fn(),
}));

describe("AdminRoute", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("redirects to home page when user is not an admin", () => {
    UserAuth.mockReturnValue({ user: { id: 1 }, isAdmin: false });

    const wrapper = shallow(<AdminRoute />);

    expect(wrapper.find(Outlet)).toHaveLength(0);
    expect(wrapper.find(Navigate)).toHaveLength(1);
    expect(wrapper.find(Navigate).prop("to")).toBe("/");
    expect(wrapper.find(Navigate).prop("replace")).toBe(true);
  });

  it("redirects to home page when user is not authenticated", () => {
    UserAuth.mockReturnValue({ user: null, isAdmin: true });

    const wrapper = shallow(<AdminRoute />);

    expect(wrapper.find(Outlet)).toHaveLength(0);
    expect(wrapper.find(Navigate)).toHaveLength(1);
    expect(wrapper.find(Navigate).prop("to")).toBe("/");
    expect(wrapper.find(Navigate).prop("replace")).toBe(true);
  });
});
