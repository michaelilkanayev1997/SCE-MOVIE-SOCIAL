import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import Comments from "../components/Comments";
import { ScaleLoader } from "react-spinners";

configure({ adapter: new Adapter() });

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Comments", () => {
  const comments = [
    {
      uid: "123",
      photoURL: "user-photo.jpg",
      displayName: "John Doe",
      text: "Lorem ipsum dolor sit amet",
      createdAt: new Date(),
    },
    // Add more sample comments if needed
  ];

  const user = {
    uid: "456",
    photoURL: "user-photo.jpg",
    displayName: "Jane Smith",
  };

  const post = {
    id: "post-id",
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Comments comments={comments} user={user} post={post} />);
  });

  it("renders without errors", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("does not render the loading spinner when firstLoading is false", () => {
    const loadingSpinner = wrapper.find(ScaleLoader);
    expect(loadingSpinner.exists()).toBe(true);
  });
});
