import React from "react";
import { shallow, configure } from "enzyme";
import PopUp from "../components/PopUp";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";

configure({ adapter: new Adapter() });

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

describe("PopUp", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PopUp />);
  });

  it("should render a welcome message", () => {
    const message = wrapper.find(".content").text();
    expect(message).toContain("Welcome to SCE-MOVIE-SOCIAL!");
  });

  it("should render the component without crashing", () => {
    const wrapper = shallow(<PopUp />);
    expect(wrapper).toHaveLength(1);
  });

  it("should render a message about signing up", () => {
    const message = wrapper.find(".content").text();
    expect(message).toContain(
      "Sign UP now and you can enjoy detailed and rich content of movies and series."
    );
  });

  it("should render a message about meeting other students", () => {
    const message = wrapper.find(".content").text();
    expect(message).toContain(
      "And in addition, you will be able to meet other students with With a love for cinema like you."
    );
  });

  it("should have a 'NO, thanks' button that closes the popup", () => {
    const button = wrapper.find(".btnOutline");
    expect(button).toHaveLength(1);
    button.simulate("click");
    expect(wrapper.find(".popup")).toHaveLength(0);
  });
});
