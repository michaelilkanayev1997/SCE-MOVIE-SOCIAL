import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import TopUser from "../components/TopUser";
import "jest-extended";
import { Link } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("TopUser component", () => {
  let wrapper;
  const user = {
    photoURL: "example.jpg",
    displayName: "John Doe",
  };

  beforeEach(() => {
    wrapper = shallow(<TopUser user={user} />);
  });

  it("renders the TopUser component", () => {
    expect(wrapper.find(".sidebarFriend")).toHaveLength(1);
  });

  it("renders a Link component with the correct 'to' prop", () => {
    const link = wrapper.find(Link);
    expect(link).toHaveLength(1);
    expect(link.prop("className")).toEqual("customLinkStyle");
  });

  it("renders a sidebar friend list item", () => {
    expect(wrapper.find(".sidebarFriend")).toHaveLength(1);
  });

  it("renders a sidebar friend image with the correct 'src' prop", () => {
    const img = wrapper.find(".sidebarFriendImg");
    expect(img).toHaveLength(1);
    expect(img.prop("src")).toEqual(user?.photoURL);
  });

  it("renders a sidebar friend name with the correct text", () => {
    const friendName = wrapper.find(".sidebarFriendName");
    expect(friendName).toHaveLength(1);
    expect(friendName.text()).toEqual(user?.displayName);
  });

  it("applies custom link styles on hover", () => {
    const link = wrapper.find(Link);
    expect(link.hasClass("customLinkStyle")).toBe(true);
    link.simulate("mouseEnter");
    expect(link.hasClass("customLinkStyleHover")).toBe(false);
    link.simulate("mouseLeave");
    expect(link.hasClass("customLinkStyleHover")).toBe(false);
  });
});
