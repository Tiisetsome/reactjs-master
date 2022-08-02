import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Server Card", () => {
  beforeEach(() => {
    render(
      <Card
        server="https://www/starworks.io"
        status="running"
        timeElapsed={5}
        statusCode={500}
      />
    );
  });

  test("Should show server http link on card", () => {
    expect(screen.getByText("https://www/starworks.io")).toBeInTheDocument();
  });

  test("Should show server status on card", () => {
    expect(screen.getByText(/running/i)).toBeInTheDocument();
  });

  test("Should show time elapsed since the last check", () => {
    expect(screen.getByText(/last checked/i)).toBeInTheDocument();
  });

  test("Should display color based on status role", () => {
    expect(screen.getByRole("article").style.backgroundColor).toEqual("red");
  });
});
