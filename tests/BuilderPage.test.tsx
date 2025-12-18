import { render, screen } from "@testing-library/react";
import BuilderPage from "../src/pages/builder/BuilderPage";

test("renders BuilderPage title and controls", () => {
  render(<BuilderPage />);
  expect(screen.getByText("Builder")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter app name")).toBeInTheDocument();
  expect(screen.getByText("Create App")).toBeInTheDocument();
});