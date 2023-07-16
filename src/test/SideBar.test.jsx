import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";
import SideBar from "../components/SideBar";

configure({ adapter: new Adapter() });

describe("SideBar component", () => {
  const user = {
    displayName: "John Doe",
    photoURL: "https://example.com/avatar.jpg",
  };

  it("should render the component without crashing", () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders the brand container", () => {
    const wrapper = shallow(<SideBar user={user} />);
    expect(wrapper.find(".container").text()).toEqual("SCE-Movie-Social");
  });

  it("renders the user avatar when the user is provided", () => {
    const wrapper = shallow(<SideBar user={user} />);
    expect(wrapper.find(".avatar-image").prop("src")).toEqual(user.photoURL);
    expect(wrapper.find(".avatar-name").text()).toEqual(user.displayName);
  });

  it("renders the list of sidebar items", () => {
    const wrapper = shallow(<SideBar user={user} />);
    expect(wrapper.find("ul li")).toHaveLength(5);
    expect(wrapper.find("ul li").at(0).text()).toEqual("Dashboard");
    expect(wrapper.find("ul li").at(1).text()).toEqual("Users");
    expect(wrapper.find("ul li").at(2).text()).toEqual("Messages");
    expect(wrapper.find("ul li").at(3).text()).toEqual("Posts-Reports");
    expect(wrapper.find("ul li").at(4).text()).toEqual("Add Admins");
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SideBar />);
  });

  it("should have a background color of #282c34", () => {
    expect(wrapper.find(".sidebar").prop("style").backgroundColor).toEqual(
      "#282c34"
    );
  });

  it("should have a color of #ffffff", () => {
    expect(wrapper.find(".sidebar").prop("style").color).toEqual("#ffffff");
  });

  it("should have a height of 100%", () => {
    expect(wrapper.find(".sidebar").prop("style").height).toEqual("100%");
  });

  it("should have a position of fixed", () => {
    expect(wrapper.find(".sidebar").prop("style").position).toEqual("fixed");
  });

  it("should have a left of 0", () => {
    expect(wrapper.find(".sidebar").prop("style").left).toEqual(0);
  });

  it("should have a top of 0", () => {
    expect(wrapper.find(".sidebar").prop("style").top).toEqual(0);
  });

  it("should have a width of 200px", () => {
    expect(wrapper.find(".sidebar").prop("style").width).toEqual(200);
  });

  it("should have a z-index of 1", () => {
    expect(wrapper.find(".sidebar").prop("style").zIndex).toEqual(1);
  });

  it("should have a list-style-type of none", () => {
    expect(wrapper.find(".sidebar ul").prop("style").listStyleType).toEqual(
      "none"
    );
  });
});
