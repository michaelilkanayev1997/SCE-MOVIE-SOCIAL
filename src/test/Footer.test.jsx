import AdminRoute from "../components/AdminRoute";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// Configure Enzyme with the adapter for React 17
configure({ adapter: new Adapter() });

describe("Footer", () => {
  it("renders the footer content", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(".footer")).toHaveLength(1);
    expect(wrapper.find(".footer__content")).toHaveLength(1);
    expect(wrapper.find(".footer__content__logo")).toHaveLength(1);
    expect(wrapper.find(".footer__content__menus")).toHaveLength(1);
    expect(wrapper.find(".footer__content__menu")).toHaveLength(3);
    expect(wrapper.find(".last")).toHaveLength(1);
  });

  it("renders the correct text in the footer", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.text()).toContain("SCE MOVIE SOCIAL");
    expect(wrapper.text()).toContain("Home");
    expect(wrapper.text()).toContain("Contact us");
    expect(wrapper.text()).toContain("Terms and Policies");
    expect(wrapper.text()).toContain("About us");
    expect(wrapper.text()).toContain("FAQ");
    expect(wrapper.text()).toContain("Cookies");
  });
});
