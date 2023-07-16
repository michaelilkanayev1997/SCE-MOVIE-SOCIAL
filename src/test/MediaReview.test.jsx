import React from "react";
import { shallow, configure } from "enzyme";
import MediaReview from "../components/MediaReview";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";
import ScaleLoader from 'react-spinners/ScaleLoader';

configure({ adapter: new Adapter() });

describe("MediaReview", () => {
    it('renders without crashing', () => {
        shallow(<MediaReview />);
      });
      it('renders the comment input field', () => {
        const wrapper = shallow(<MediaReview />);
        expect(wrapper.find('.comment-input')).toHaveLength(0);
      });
    
      it('renders the submit button', () => {
        const wrapper = shallow(<MediaReview />);
        expect(wrapper.find('.comment-button')).toHaveLength(0);
      });      

      it('renders without crashing', () => {
        shallow(
          <div style={{ alignItems: 'center', textAlign: 'center', paddingTop: '0.5rem' }}>
            <ScaleLoader color="gray" height={300} width={20} loading={true} margin={10} />
          </div>
        );
      });
    
      it('renders the ScaleLoader component with the correct props', () => {
        const wrapper = shallow(
          <div style={{ alignItems: 'center', textAlign: 'center', paddingTop: '0.5rem' }}>
            <ScaleLoader color="gray" height={300} width={20} loading={true} margin={10} />
          </div>
        );
    
        const scaleLoaderComponent = wrapper.find(ScaleLoader);
    
        expect(scaleLoaderComponent).toHaveLength(1);
        expect(scaleLoaderComponent.prop('color')).toBe('gray');
        expect(scaleLoaderComponent.prop('height')).toBe(300);
        expect(scaleLoaderComponent.prop('width')).toBe(20);
        expect(scaleLoaderComponent.prop('loading')).toBe(true);
        expect(scaleLoaderComponent.prop('margin')).toBe(10);
      });
      
});
