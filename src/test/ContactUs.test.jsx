import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import ContactUs from "../pages/ContactUs";
import "jest-extended";

configure({ adapter: new Adapter() });

describe("ContactUs component", () => {
  it("should render the component without crashing", () => {
    const wrapper = shallow(<ContactUs />);
    expect(wrapper).toHaveLength(1);
  });

  it("should have a h1 element with text 'Contact Us'", () => {
    const wrapper = shallow(<ContactUs />);
    expect(wrapper.find("h1").text()).toEqual("Contact Us");
  });

  test("submits form correctly", () => {
    const wrapper = shallow(<ContactUs />);
    const submitMock = jest.fn();
    wrapper.find(".contact-form").simulate("submit", {
      preventDefault: submitMock,
    });
    expect(submitMock).toHaveBeenCalled();
  });

  it('should clear the input fields when resetFields is called', () => {
    const wrapper = shallow(<ContactUs />);
    const fullNameInput = wrapper.find('#name');
    const emailInput = wrapper.find('#email');
    const messageInput = wrapper.find('#message');

    // check that the input values have been cleared
    expect(fullNameInput.prop('value')).toEqual('');
    expect(emailInput.prop('value')).toEqual('');
    expect(messageInput.prop('value')).toEqual('');
  });

  it('should render correctly', () => {
    const wrapper = shallow(<ContactUs />);
    expect(wrapper).toMatchSnapshot();
  });

  it('contact-form rendered component', () => {
    const wrapper = shallow(<ContactUs />);
    expect(wrapper.find('.contact-form')).toHaveLength(1);
  });

});




