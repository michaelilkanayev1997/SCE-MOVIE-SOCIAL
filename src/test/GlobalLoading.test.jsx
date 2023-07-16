import React from "react";
import GlobalLoading from "../components/GlobalLoading";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

// Configure Enzyme with the adapter for React 17
configure({ adapter: new Adapter() });

describe("<GlobalLoading />", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<GlobalLoading />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render the Logo component", () => {
    const wrapper = shallow(<GlobalLoading />);
    expect(wrapper.find("Logo").exists()).toBe(true);
  });

  it("should render the LinearProgress component", () => {
    const wrapper = shallow(<GlobalLoading />);
    expect(wrapper.find("LinearProgress").exists()).toBe(false);
  });
});
