import { shallow, configure } from "enzyme";
import BackdropSlide from "../components/BackdropSlide";
import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../api/apiConfig";
import { Box } from "@mui/material";

configure({ adapter: new Adapter() });

describe("BackdropSlide", () => {
  it("renders the component", () => {
    const wrapper = shallow(<BackdropSlide backdrops={[]} />);
    expect(wrapper.find(Swiper)).toHaveLength(1);
    expect(wrapper.find(SwiperSlide)).toHaveLength(0);
  });

  it("has the correct styles", () => {
    const wrapper = shallow(<BackdropSlide backdrops={[]} />);
    const swiperStyles = wrapper.find(Swiper).props().style;

    expect(swiperStyles).toHaveProperty("--swiper-pagination-color", "#FFBA08");
    expect(swiperStyles).toHaveProperty(
      "--swiper-pagination-bullet-inactive-color",
      "white"
    );
    expect(swiperStyles).toHaveProperty(
      "--swiper-pagination-bullet-size",
      "10px"
    );
  });

  it("renders the correct number of SwiperSlide components", () => {
    const backdrops = [
      { file_path: "path1.jpg" },
      { file_path: "path2.jpg" },
      { file_path: "path3.jpg" },
    ];
    const wrapper = shallow(<BackdropSlide backdrops={backdrops} />);
    const swiperSlides = wrapper.find(SwiperSlide);

    expect(swiperSlides).toHaveLength(backdrops.length);
  });

  it("renders a Swiper component with correct props", () => {
    const backdrops = [
      { file_path: "path1.jpg" },
      { file_path: "path2.jpg" },
      { file_path: "path3.jpg" },
    ];
    const wrapper = shallow(<BackdropSlide backdrops={backdrops} />);
    const swiper = wrapper.find(Swiper);

    expect(swiper).toHaveLength(1);
    expect(swiper.prop("navigation")).toEqual(true);
    expect(swiper.prop("grabCursor")).toEqual(true);
    expect(swiper.prop("spaceBetween")).toEqual(20);
    expect(swiper.prop("slidesPerView")).toEqual(1.25);
    expect(swiper.prop("centeredSlides")).toEqual(true);
    expect(swiper.prop("loop")).toEqual(true);
    expect(swiper.prop("style")).toEqual({
      "--swiper-pagination-color": "#FFBA08",
      "--swiper-pagination-bullet-inactive-color": "white",
      "--swiper-pagination-bullet-size": "10px",
    });
  });

  it("renders a Box component inside each SwiperSlide", () => {
    const backdrops = [
      { file_path: "/backdrop1.jpg" },
      { file_path: "/backdrop2.jpg" },
      { file_path: "/backdrop3.jpg" },
    ];
    const wrapper = shallow(<BackdropSlide backdrops={backdrops} />);
    wrapper.find(SwiperSlide).forEach((slide, index) => {
      expect(slide.find(Box)).toHaveLength(1);
    });
  });

  it("passes the correct props to Box component", () => {
    const backdrops = [
      { file_path: "/backdrop1.jpg" },
      { file_path: "/backdrop2.jpg" },
      { file_path: "/backdrop3.jpg" },
    ];
    const wrapper = shallow(<BackdropSlide backdrops={backdrops} />);
    wrapper.find(SwiperSlide).forEach((slide, index) => {
      expect(slide.find(Box).prop("sx")).toEqual({
        paddingTop: "60%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${tmdbConfigs.originalImage(
          backdrops[index].file_path
        )})`,
      });
    });
  });
});
