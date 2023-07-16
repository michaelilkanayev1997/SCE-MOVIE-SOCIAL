import React from "react";
import { shallow, mount, configure } from "enzyme";
import { useLocation } from "react-router-dom";
import { getPersonDetail } from "../api/axiosClient";
import PersonDetail from "../pages/PersonDetail";
import PersonMediaGrid from "../components/PersonMediaGrid";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";

configure({ adapter: new Adapter() });

jest.mock("../api/axiosClient");
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

describe("<PersonDetail />", () => {
  const location = {
    state: { item: 123 },
  };

  beforeEach(() => {
    useLocation.mockReturnValue(location);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading component while fetching person details", () => {
    getPersonDetail.mockResolvedValueOnce({});

    const wrapper = shallow(<PersonDetail />);

    expect(wrapper.find(PersonMediaGrid)).toHaveLength(0);
  });

  it("renders person details after fetching them", async () => {
    const person = {
      name: "John Doe",
      profile_path: "path/to/image.jpg",
      birthday: "1990-01-01",
      biography: "A person's biography",
    };

    getPersonDetail.mockResolvedValueOnce(person);



  });


});
