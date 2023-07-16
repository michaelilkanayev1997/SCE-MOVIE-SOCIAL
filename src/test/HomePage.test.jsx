import HomePage from "../pages/HomePage";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import HeroSlide from "../components/HeroSlide";
import HomeMediaSlide from "../components/HomeMediaSlide";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("HomePage", () => {
  it("should render the page without crashing", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Upcoming Movies section with a View more button", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find(".section__header h2").at(0).text()).toEqual(
      "Upcoming Movies"
    );
    expect(wrapper.find(".section__header Link").at(0).prop("to")).toEqual(
      "/movie"
    );
    expect(
      wrapper.find(".section__header Link OutlineButton").at(0).text()
    ).toEqual("<OutlineButton />");
  });

  it("renders HeroSlide", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find(HeroSlide)).toHaveLength(1);
  });

  it("renders Upcoming Movies section", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find("h2").at(0).text()).toEqual("Upcoming Movies");
    expect(wrapper.find(HomeMediaSlide).at(0).prop("type")).toEqual("movie");
    expect(wrapper.find(HomeMediaSlide).at(0).prop("MediaName")).toEqual(
      "upcoming"
    );
  });

  it("renders Top Rated Movies section", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find("h2").at(1).text()).toEqual("Top Rated Movies");
    expect(wrapper.find(HomeMediaSlide).at(1).prop("type")).toEqual("movie");
    expect(wrapper.find(HomeMediaSlide).at(1).prop("MediaName")).toEqual(
      "top_rated"
    );
  });

  it("renders Trending TV section", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find("h2").at(2).text()).toEqual("Trending TV");
    expect(wrapper.find(HomeMediaSlide).at(2).prop("type")).toEqual("tv");
    expect(wrapper.find(HomeMediaSlide).at(2).prop("MediaName")).toEqual(
      "popular"
    );
  });

  it("renders Top Rated TV section", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find("h2").at(3).text()).toEqual("Top Rated TV");
    expect(wrapper.find(HomeMediaSlide).at(3).prop("type")).toEqual("tv");
    expect(wrapper.find(HomeMediaSlide).at(3).prop("MediaName")).toEqual(
      "top_rated"
    );
  });
});
