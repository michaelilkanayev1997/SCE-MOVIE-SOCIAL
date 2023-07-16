import React from "react";
import { shallow, configure } from "enzyme";
import FavoritesPage from "../pages/FavoritesPage ";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("FavoritesPage", () => {
  it("should render the page without crashing", () => {
    const wrapper = shallow(<FavoritesPage />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it("should display loading spinner if user is not authenticated", () => {
    const wrapper = shallow(<FavoritesPage />);
    expect(wrapper.find("GlobalLoading")).toHaveLength(1);
  });

  it("should not display favorites if no user or there is loading ", () => {
    const wrapper = shallow(<FavoritesPage />);
    expect(wrapper.find(".card-container")).toHaveLength(0);
  });
});
