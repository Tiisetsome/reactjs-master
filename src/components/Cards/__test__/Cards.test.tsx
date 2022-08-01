import { render, screen } from "@testing-library/react";
import Cards from "../Cards";
import { servers } from "../../../data/data";

describe("Cards", () => {
  test("Should render five cards on the screen", () => {
    render(<Cards servers={servers} />);
    expect(screen.getAllByRole("article").length).toEqual(7);
  });
});
