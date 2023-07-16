import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { AuthContextProvider } from "../context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("AuthContextProvider", () => {
  it("should render children components", () => {
    const wrapper = shallow(
      <Router>
        <AuthContextProvider>
          <div>Hello World!</div>
        </AuthContextProvider>
      </Router>
    );
    expect(wrapper.contains(<div>Hello World!</div>)).toBe(true);
  });
});
