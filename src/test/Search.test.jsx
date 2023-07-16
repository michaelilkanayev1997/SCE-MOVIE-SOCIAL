import React from "react";
import Search from "../pages/Search";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render, screen } from "@testing-library/react";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("Search", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.exists()).toBe(true);
  });

  //Search input changes correctly
  it("should change search input value correctly", () => {
    const wrapper = shallow(<Search />);
    const input = wrapper.find(".Search-input input");
    input.simulate("change", { target: { value: "test" } });
    expect(wrapper.find(".Search-input input").props().value).toEqual("test");
  });

  //Media type buttons work correctly
  it("should change media type state correctly", () => {
    const wrapper = shallow(<Search />);
    const movieButton = wrapper.find(".mediaTypebutton button").at(0);
    movieButton.simulate("click");
    expect(movieButton.text()).toEqual("Movie");
    const tvButton = wrapper.find(".mediaTypebutton button").at(1);
    tvButton.simulate("click");
    expect(tvButton.text()).toEqual("TV");
  });

  test("should update the search query correctly", async () => {
    render(<Search />);
    const searchInput = screen.getByPlaceholderText("Search Media");
    searchInput.value = "test";
    searchInput.dispatchEvent(new InputEvent("input"));
    await screen.findByDisplayValue("test");
  });
});
