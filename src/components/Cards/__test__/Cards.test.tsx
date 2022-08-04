import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cards from "../Cards";
import { servers } from "../../../data/data";

describe("Cards", () => {
  beforeEach(() => {
    render(
      <Cards servers={servers} lastCheckPayload="payload" loading={false} />
    );
  });

  test("Should render five cards on the screen", () => {
    expect(screen.getAllByRole("article").length).toEqual(6);
  });

  test("Should hide all cards when one of them is clicked", () => {
    const cards = screen.getAllByRole("article");

    userEvent.click(cards[0]);

    expect(screen.queryAllByRole("article").length).toEqual(0);
    expect(screen.queryByText(/last endpoint payload/i)).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/choose environment/i)
    ).not.toBeInTheDocument();
  });

  test("Should hide last health check payload when go back button is clicked", () => {
    const cards = screen.getAllByRole("article");

    userEvent.click(cards[0]);
    userEvent.click(screen.getByRole("button"));

    expect(
      screen.queryByText(/last endpoint payload/i)
    ).not.toBeInTheDocument();
  });

  test("Should filter for production environment servers", async () => {
    const cards = await screen.findAllByRole("article");
    const options = screen.getByLabelText(/choose environment/i);

    fireEvent.change(options, {
      target: { value: "production" },
    });

    const productionCards = screen.getAllByRole("article");

    expect(productionCards).toStrictEqual([cards[0], cards[1], cards[2]]);
  });

  test("Should filter for testing environment servers", async () => {
    const cards = await screen.findAllByRole("article");

    userEvent.selectOptions(
      screen.getByLabelText(/choose environment/i),
      "testing"
    );

    const testingCards = screen.getAllByRole("article");

    expect(testingCards).toStrictEqual([cards[0], cards[1], cards[2]]);
  });
});
