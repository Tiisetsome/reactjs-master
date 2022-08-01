import { render, screen } from "@testing-library/react";
import Container from "../Container";

describe("Container", () => {
  test("should render header, description and number of servers being tested", () => {
    render(
      <Container
        header="Build Monitor"
        description="A tool to visibly check the health status of a server or an environment"
        numberOfServers={5}
      />
    );

    const description =
      "A tool to visibly check the health status of a server or an environment";
    const numberOfServersElementArray = screen
      .getByText(/servers/i)
      .textContent?.split(" ")!;

    expect(screen.getByRole("heading")).toHaveTextContent(/build monitor/i);
    expect(screen.getByText(description)).toHaveTextContent(description);
    expect(
      +numberOfServersElementArray[numberOfServersElementArray?.length - 1]
    ).toEqual(5);
  });
});
