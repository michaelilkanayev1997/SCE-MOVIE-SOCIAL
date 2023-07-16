import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import AdminMessages from "../pages/AdminMessages";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("AdminMessages component", () => {
  it("should render the component without crashing", () => {
    const wrapper = shallow(<AdminMessages />);
    expect(wrapper).toHaveLength(1);
  });
});
