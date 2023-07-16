import React from "react";
import { shallow, configure } from "enzyme";
import CastSlide from "../components/CastSlide";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";
import { Swiper } from "swiper/react";


configure({ adapter: new Adapter() });

describe("CastSlide", () => {
  const props = {
    type: "movie",
    id: 123,
  };

  it("should render the component without crashing", () => {
    const wrapper = shallow(<CastSlide />);
    expect(wrapper).toHaveLength(1);
  });

  it("renders without crashing", () => {
    shallow(<CastSlide {...props} />);
  });

  it("renders a Swiper component", () => {
    const wrapper = shallow(<CastSlide {...props} />);
    expect(wrapper.find("Swiper")).toHaveLength(1);
  });

  it("should render the Swiper component with correct props", () => {
    const wrapper = shallow(<CastSlide type="movie" id="123" />);
    const swiper = wrapper.find(Swiper);
    expect(swiper).toHaveLength(1);
    expect(swiper.prop("pagination")).toEqual({ type: "fraction" });
    expect(swiper.prop("spaceBetween")).toEqual(30);
    expect(swiper.prop("slidesPerView")).toEqual(5);
    expect(swiper.prop("grabCursor")).toBe(true);
    expect(swiper.prop("style")).toEqual({ width: "750px" });
  });

  
  
});
