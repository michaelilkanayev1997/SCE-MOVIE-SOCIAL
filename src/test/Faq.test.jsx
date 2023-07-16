import React from "react";
import { shallow, configure } from "enzyme";
import Faq from "../pages/Faq";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";


configure({ adapter: new Adapter() });

describe('Faq', () => {
    it('renders without crashing', () => {
      shallow(<Faq />);
    });
  
    it('renders the correct number of accordion items', () => {
      const wrapper = shallow(<Faq />);
      const accordionItems = wrapper.find('.accordion_faq > div');
  
      expect(accordionItems).toHaveLength(6);
    });
  
    it('toggles accordion on click', () => {
      const wrapper = shallow(<Faq />);
      const accordionItems = wrapper.find('.accordion_faq > div');
  
      accordionItems.forEach((item, index) => {
        item.simulate('click');
        const isActive = wrapper
          .find('.accordion_faq_heading h3')
          .at(index)
          .hasClass('active');
        expect(isActive).toBe(true);
      });
    });

  });

  
  
  
  
  
  
  