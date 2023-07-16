import React from "react";
import { shallow, mount, configure } from "enzyme";
import Button from "../components/Button";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("Button", () => {
  it("renders without crashing", () => {
    shallow(<Button />);
  });

  it("renders children", () => {
    const wrapper = shallow(<Button>Click me!</Button>);
    expect(wrapper.text()).toBe("Click me!");
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});



