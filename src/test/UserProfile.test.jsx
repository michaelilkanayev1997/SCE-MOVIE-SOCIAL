import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import UserProfile from "../pages/UserProfile";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("UserProfile", () => {
  it("should render the component without crashing", () => {
    const wrapper = shallow(<UserProfile />);
    expect(wrapper).toHaveLength(1);
  });

  it("should have a h1 element with text 'UserProfile'", () => {
    const wrapper = shallow(<UserProfile />);
    expect(wrapper.find("h1").text()).toEqual("Profile Settings");
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserProfile />);
  });

  it('renders the image upload input', () => {
    expect(wrapper.find('#imageUpload')).toHaveLength(1);
  });

  it('renders the Save Image button', () => {
    expect(wrapper.find('button').text()).toEqual('Save Image');
  });

  it('does not display the loading spinner when not loading', () => {
    wrapper.setProps({ isLoading: false });
    expect(wrapper.find('GlobalLoading')).toHaveLength(0);
  });

});
