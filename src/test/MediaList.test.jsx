import React from "react";
import { shallow, configure } from "enzyme";
import MediaList from "../pages/MediaList";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("<MediaList />", () => {
  const props = {
    mediaType: "movie",
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MediaList {...props} />);
  });

  it("renders without crashing", () => {
    expect(wrapper.length).toBe(1);
  });

  it("displays a loader if loading state is true", () => {
    const wrapper = shallow(<MediaList mediaType="movie" loading={false} />);
    expect(wrapper.find("GlobalLoading").length).toBe(0);
  });

  it("renders the correct title depending on mediaType prop", () => {
    expect(wrapper.find("h1").text()).toEqual("Movies");
    wrapper.setProps({ mediaType: "tv" });
    expect(wrapper.find("h1").text()).toEqual("TVs");
  });

  it("renders the page buttons correct", () => {
    expect(wrapper.find(".page-button").length).toBe(1);
  });
});
