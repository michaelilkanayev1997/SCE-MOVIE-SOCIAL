import { shallow, configure } from "enzyme";
import React from "react";
import Navbar from "../components/Navbar";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";

configure({ adapter: new Adapter() });

jest.mock("react-router", () => ({
    useNavigate: jest.fn(), useLocation: jest.fn,
  }));

describe("Navbar", () => {
  
    const wrapper = shallow(<Navbar />);

  it('should render the brand', () => {
    expect(wrapper.find('.brand')).toHaveLength(1);
  });

  it('should render the pages', () => {
    expect(wrapper.find('.pages')).toHaveLength(1);
  });

  it('should render the dropdown if user is logged in', () => {
    wrapper.setProps({ user: { displayName: 'Test User' } });
    expect(wrapper.find('.dropdown')).toHaveLength(1);
  });

  it('renders without crashing', () => {
    shallow(<Navbar />);
  });

  it('displays the correct SCE-Movie-Social', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find('.brand .container').text()).toEqual('SCE-Movie-Social');
  });

  it("renders the correct text in the navbar", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.text()).toContain("Movie");
    expect(wrapper.text()).toContain("TV");
    expect(wrapper.text()).toContain("Contact-us");
    expect(wrapper.text()).toContain("Search");
    expect(wrapper.text()).toContain("About-us");
    expect(wrapper.text()).toContain("Sign in");
  });

  it("should render the component without crashing", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toHaveLength(1);
  });
  
});
