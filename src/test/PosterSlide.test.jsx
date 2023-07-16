import React from "react";
import PosterSlide from "../components/PosterSlide";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";
import { Box } from '@mui/material';
import tmdbConfigs from "../api/apiConfig";



configure({ adapter: new Adapter() });

describe("PosterSlide", () => {
    const posters = [
        { file_path: "poster1.jpg" },
        { file_path: "poster2.jpg" },
        { file_path: "poster3.jpg" },
      ];
      const wrapper = shallow(<PosterSlide posters={posters} />);
    
      it("should render the correct number of SwiperSlide components", () => {
        expect(wrapper.find("SwiperSlide")).toHaveLength(posters.length);
      });
    
    const boxComponent = wrapper.find(Box).at(0);
    
    expect(boxComponent.prop('sx')).toEqual({
    paddingTop: "160%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${tmdbConfigs.w500Image(posters[0].file_path)})`
  });
});
