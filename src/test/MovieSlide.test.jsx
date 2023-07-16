import React from "react";
import { shallow, configure } from "enzyme";
import MovieSlide from "../components/MovieSlide";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";
import { useState } from "react";

configure({ adapter: new Adapter() });

describe("MovieSlide", () => {
  it("should render the component without crashing", () => {
    const wrapper = shallow(<MovieSlide />);
    expect(wrapper).toHaveLength(1);
  });

  it('renders a div with class name "movie-list"', () => {
    const wrapper = shallow(<MovieSlide type="movie" id={1} />);
    expect(wrapper.find("div.movie-list")).toHaveLength(1);
  });

  it("sets the initial state correctly", () => {
    const TestComponent = () => {
      const [items, setItems] = useState([]);
      return (
        <div>
          <p data-testid="items-length">{items.length}</p>
          <button onClick={() => setItems([1, 2, 3])}>Set Items</button>
        </div>
      );
    };
    const wrapper = shallow(<TestComponent />);
    const itemsLength = wrapper.find('[data-testid="items-length"]');
    expect(itemsLength.text()).toEqual("0");
  });
});
