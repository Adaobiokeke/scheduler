import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";
import { waitForElement } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application/Application";
import Appointment from "components/Appointment/index";
import { fireEvent } from "@testing-library/react";


/*
  A test that renders a React Component
*/
describe("Appointment", () => {
    it("defaults to Monday and changes the schedule when a new day is selected", () => {
      const { getByText } = render(<Application />);

      return waitForElement(() => getByText("Monday")).then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
    });
    it("renders without crashing", () => {
      render(<Appointment />);
    });
  });
