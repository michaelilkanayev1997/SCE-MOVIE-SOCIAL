import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ReadMore from "../pages/ReadMore";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("ReadMore", () => {
  it("renders without crashing", () => {
    shallow(<ReadMore />);
  });

  it("renders the heading correctly", () => {
    const wrapper = shallow(<ReadMore />);
    const heading = wrapper.find("h1");
    expect(heading.text()).toEqual("Extended information about the site");
  });

  it("renders the content paragraphs correctly", () => {
    const wrapper = shallow(<ReadMore />);
    const paragraphs = wrapper.find(".content p");
    expect(paragraphs).toHaveLength(4);
    expect(paragraphs.at(0).text()).toContain(
      "Our site is first and foremost a social site"
    );
    expect(paragraphs.at(1).text()).toContain(
      "After logging in, a profile page is created for you"
    );
    expect(paragraphs.at(2).text()).toContain(
      "On the home page, you can see movies and series"
    );
    expect(paragraphs.at(3).text()).toContain(
      "In the end, the goal of our website is to create a social platform"
    );
  });

  it("renders the background image correctly", () => {
    const wrapper = shallow(<ReadMore />);
    const backgroundImage = wrapper
      .find(".about-img")
      .prop("style").backgroundImage;
    expect(backgroundImage).toContain("socialmedia.png");
  });

  it('renders a h1 element', () => {
    const wrapper = shallow(<ReadMore />);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('renders a div with class "about"', () => {
    const wrapper = shallow(<ReadMore />);
    expect(wrapper.find('.about')).toHaveLength(1);
  });

  it('renders a div with class "row"', () => {
    const wrapper = shallow(<ReadMore />);
    expect(wrapper.find('.row')).toHaveLength(1);
  });

  it('renders a div with class "column"', () => {
    const wrapper = shallow(<ReadMore />);
    expect(wrapper.find('.column')).toHaveLength(2);
  });

  it('renders a div with class "about-img"', () => {
    const wrapper = shallow(<ReadMore />);
    expect(wrapper.find('.about-img')).toHaveLength(1);
  });

  it('renders a div with class "content"', () => {
    const wrapper = shallow(<ReadMore />);
    expect(wrapper.find('.content')).toHaveLength(1);
  });

  it('renders a p element within ".content"', () => {
    const wrapper = shallow(<ReadMore />);
    expect(wrapper.find('.content').find('p')).toHaveLength(4);
  });
});