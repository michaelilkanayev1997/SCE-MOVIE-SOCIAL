import React from "react";
import { shallow, configure } from "enzyme";
import NotFound from "../pages/NotFound";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("NotFound", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });

  it("should render the component without crashing", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toHaveLength(1);
  });

  it("should render a title", () => {
    const title = wrapper.find(".not-found-title");
    expect(title).toHaveLength(1);
    expect(title.text()).toBe("404 - Page Not Found");
  });

  it("should render a message", () => {
    const message = wrapper.find(".not-found-message");
    expect(message).toHaveLength(1);
    expect(message.text()).toBe("Oops! The page you are looking for cannot be found.");
  });

  it("should render a link to the homepage", () => {
    const link = wrapper.find(".not-found-link");
    expect(link).toHaveLength(1);
    expect(link.prop("to")).toBe("/");
    expect(link.text()).toBe("Go back to homepage");
  });

  it('should render a div with class "not-found-container"', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('.not-found-container')).toHaveLength(1);
  });

  it('should render a h1 with class "not-found-title"', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('.not-found-title')).toHaveLength(1);
  });

  it('should render a p with class "not-found-message"', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('.not-found-message')).toHaveLength(1);
  });

  it('should render a Link with class "not-found-link"', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('.not-found-link')).toHaveLength(1);
  });

});