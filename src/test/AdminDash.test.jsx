import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import AdminDash from "../pages/AdminDash";
import SideBar from "../components/SideBar";
import { UserAuth } from "../context/AuthContext";

// Configure Enzyme with the adapter for React 17
configure({ adapter: new Adapter() });

// Mock the UserAuth component with a Jest mock function
jest.mock("../context/AuthContext", () => ({
  UserAuth: jest.fn(),
}));

describe("AdminDash component", () => {
  let wrapper;
  let mockUser;

  // Start the test suite for the AdminDash component
  beforeEach(() => {
    mockUser = { displayName: "John Doe" };
    UserAuth.mockImplementation(() => ({ user: mockUser }));
    wrapper = shallow(<AdminDash />);
  });

  // Test that the SideBar component is rendered with the correct props
  it("should render the SideBar component with the correct props", () => {
    expect(wrapper.find(SideBar).props().user).toEqual(mockUser);
  });

  // Test that a div with the class "admin-dashboard" is rendered
  it('should render a div with the class "admin-dashboard"', () => {
    expect(wrapper.find("div.admin-dashboard")).toHaveLength(1);
  });
});
