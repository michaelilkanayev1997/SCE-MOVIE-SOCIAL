import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import AboutUs from "../pages/AboutUs";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("AboutUs component", () => {
  it("should render the component without crashing", () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper).toHaveLength(1);
  });

  it("should have a h1 element with text 'About Us'", () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find("h1").text()).toEqual("About Us");
  });

  it("should have a div with class 'about'", () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find("section.about")).toHaveLength(1);
  });

  it("should have three 'content' divs", () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find("div.content")).toHaveLength(3);
  });

  it("should have a 'Developer' progress bar with 80% progress", () => {
    const wrapper = shallow(<AboutUs />);
    const developerProgressBar = wrapper.find(".progress-bar.Developer");
    expect(developerProgressBar).toHaveLength(1);

    const designerLabel = developerProgressBar.find("span");
    expect(designerLabel).toHaveLength(1);
    expect(designerLabel.text()).toEqual("80%");

    const designerHeading = developerProgressBar
      .closest(".progress-wrap")
      .find("h3");
    expect(designerHeading).toHaveLength(1);
    expect(designerHeading.text()).toEqual("Developer");
  });

  it("should have a 'React' progress bar with 100% progress", () => {
    const wrapper = shallow(<AboutUs />);
    const reactProgressBar = wrapper.find(".progress-bar.React");
    expect(reactProgressBar).toHaveLength(1);

    const designerLabel = reactProgressBar.find("span");
    expect(designerLabel).toHaveLength(1);
    expect(designerLabel.text()).toEqual("100%");

    const designerHeading = reactProgressBar
      .closest(".progress-wrap")
      .find("h3");
    expect(designerHeading).toHaveLength(1);
    expect(designerHeading.text()).toEqual("React");
  });

  it("should have a 'Designer' progress bar with 90% progress", () => {
    const wrapper = shallow(<AboutUs />);

    const designerProgressBar = wrapper.find(".progress-bar.Designer");
    expect(designerProgressBar).toHaveLength(1);

    const designerLabel = designerProgressBar.find("span");
    expect(designerLabel).toHaveLength(1);
    expect(designerLabel.text()).toEqual("90%");

    const designerHeading = designerProgressBar
      .closest(".progress-wrap")
      .find("h3");
    expect(designerHeading).toHaveLength(1);
    expect(designerHeading.text()).toEqual("Designer");
  });

  it('renders a h1 element', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('renders a div with class "about"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.about')).toHaveLength(1);
  });

  it('renders a div with class "row"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.row')).toHaveLength(1);
  });

  it('renders a div with class "column"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.column')).toHaveLength(2);
  });

  it('renders a div with class "tabs"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.tabs')).toHaveLength(1);
  });

  it('renders a div with class "single-tab"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.single-tab')).toHaveLength(0);
  });

  it('renders a div with class "about-img"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.about-img')).toHaveLength(1);
  });

  it('renders a div with class "content"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.content')).toHaveLength(3);
  });

  it('renders a h2 element within ".content"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.content').find('h2')).toHaveLength(3);
  });

  it('renders a p element within ".content"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.content').find('p')).toHaveLength(3);
  });

  it('renders a div with class "skills-row"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.skills-row')).toHaveLength(1);
  });

  it('renders a div with class "skills-column"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.skills-column')).toHaveLength(3);
  });

  it('renders a div with class "progress-wrap"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.progress-wrap')).toHaveLength(3);
  });

  it('renders a div with class "progress"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.progress')).toHaveLength(3);
  });

  it('renders a div with class "progress-bar"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.progress-bar')).toHaveLength(3);
  });

  it('renders a span element within ".progress-bar"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.progress-bar').find('span')).toHaveLength(3);
  });

  it('renders a div with class "exp-column"', () => {
    const wrapper = shallow(<AboutUs />);
    expect(wrapper.find('.exp-column')).toHaveLength(0);
  });

});
