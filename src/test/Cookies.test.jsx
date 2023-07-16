import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import Cookies from "../pages/Cookies";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("Cookies", () => {
    it("should render the component without crashing", () => {
      const wrapper = shallow(<Cookies />);
      expect(wrapper).toHaveLength(1);
    });

    it("should have a h1 element with text 'Cookies'", () => {
        const wrapper = shallow(<Cookies />);
        expect(wrapper.find("h1").text()).toEqual("Cookies");
        expect(wrapper.find('p')).toHaveLength(22);
        expect(wrapper.find('b')).toHaveLength(12);
    });

    it("should have a h2 element with text 'Table of Contents'", () => {
        const wrapper = shallow(<Cookies />);
        expect(wrapper.find("h2").text()).toEqual("Table of Contents");
    });

    it("should have a div with class 'cookies'", () => {
        const wrapper = shallow(<Cookies />);
        expect(wrapper.find("section.cookies")).toHaveLength(1);
    });

    it("should have five 'content' divs", () => {
        const wrapper = shallow(<Cookies />);
        expect(wrapper.find("div.content")).toHaveLength(5);
    });

});