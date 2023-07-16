import React from "react";
import { configure, shallow } from "enzyme";
import ReportsTable from "../components/ReportsTable";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-extended";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

configure({ adapter: new Adapter() });

describe("ReportsTable Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ReportsTable />);
  });

  it("renders the header elements correctly", () => {
    render(<ReportsTable />); // Render your component that contains the table header

    // Assert that the header elements are rendered with the correct text
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    shallow(<ReportsTable reportsPosts={[]} />);
  });

  it("expands and collapses the row on click", () => {
    const reportsPosts = [{ id: 1, title: "Report 1", reports: {} }];
    const wrapper = shallow(<ReportsTable reportsPosts={reportsPosts} />);

    const row = wrapper.find("TableRow");
    const expandableRow = wrapper.find("ExpandableRow");

    expect(expandableRow).toHaveLength(0);
  });

  it("renders the page buttons correct", () => {
    expect(wrapper.find(".page-button").length).toBe(0);
  });
});
