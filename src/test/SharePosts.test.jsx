import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";
import SharePost from "../components/SharePost";
import { MemoryRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SharePost", () => {
  it("should render without errors", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <SharePost user={{}} MediaType="movie" item={{}} />
      </MemoryRouter>
    );
    expect(wrapper.exists()).toBe(true);
  });

  let wrapper;
  const user = {
    photoURL: "example.jpg",
    displayName: "John Doe",
  };
  const postText = "Sample post";

  beforeEach(() => {
    wrapper = shallow(
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={user?.photoURL}
              alt={user?.photoURL}
            />
            <textarea
              placeholder={"What's in your mind " + user?.displayName + "?"}
              className="shareInput"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
          <hr className="shareHr" />
        </div>
      </div>
    );
  });

  it("renders a share component", () => {
    expect(wrapper.find(".share")).toHaveLength(1);
  });

  it("renders a share wrapper", () => {
    expect(wrapper.find(".shareWrapper")).toHaveLength(1);
  });

  it("renders a share top section", () => {
    expect(wrapper.find(".shareTop")).toHaveLength(1);
  });

  it("renders a share profile image", () => {
    const profileImg = wrapper.find(".shareProfileImg");
    expect(profileImg).toHaveLength(1);
    expect(profileImg.prop("src")).toEqual(user?.photoURL);
    expect(profileImg.prop("alt")).toEqual(user?.photoURL);
  });

  it("renders a textarea with the correct placeholder and value", () => {
    const textarea = wrapper.find(".shareInput");
    expect(textarea).toHaveLength(1);
    expect(textarea.prop("placeholder")).toEqual(
      "What's in your mind " + user?.displayName + "?"
    );
    expect(textarea.prop("value")).toEqual(postText);
  });

  it("renders a horizontal rule", () => {
    expect(wrapper.find(".shareHr")).toHaveLength(1);
  });
});
