import { render, screen } from "@testing-library/react";
import Card from "../Card";

const cardProps = {
  server: "https://www/starworks.io",
  status: "running",
  timeElapsed: 5,
  statusCode: 200,
  showCards: false,
  setShowCards: () => {},
  loading: false,
};

describe("Server Card", () => {
  beforeEach(() => {
    render(
      <Card
        server="https://www/starworks.io"
        status="running"
        timeElapsed={5}
        statusCode={200}
        showCards={false}
        setShowCards={() => {}}
        loading={false}
      />
    );
  });
  test("Should show server http link on card", () => {
    expect(screen.getByText("https://www/starworks.io")).toBeInTheDocument();
  });

  test("Should show server status on card", () => {
    expect(screen.getByText(/running/i)).toBeInTheDocument();
  });

  test("Should show server up time since last check if status code is 200", () => {
    expect(screen.getByText(/up time/i)).toBeInTheDocument();
  });

  test("Should show loading icon if the health check is being checked", () => {
    render(<Card {...cardProps} loading={true} />);

    expect(screen.queryByText("UP")).not.toBeInTheDocument();
    expect(screen.getByText(/checking/i)).toBeInTheDocument();
  });
});

describe("Server Card Up Time wording", () => {
  test("Should show correct wording if the server status is 200 and time left before another health check is less or equal to 1 minute", () => {
    render(<Card {...cardProps} statusCode={200} timeElapsed={1} />);
    expect(screen.getByText(/up time/i).textContent).toBe(
      "Up Time : 1 minute ago"
    );
  });

  test("Should show correct wording if the server status is 200 and time left before another health check is greater 1 minute", () => {
    render(<Card {...cardProps} statusCode={200} timeElapsed={5} />);
    expect(screen.getByText(/up time/i).textContent).toBe(
      "Up Time : 5 minutes ago"
    );
  });
});

describe("Server Card background color", () => {
  test("Should display a green box if server status code is 200", () => {
    render(<Card {...cardProps} statusCode={200} />);
    expect(screen.getByRole("article").style.backgroundColor).toBe("green");
  });

  test("Should display a red box if server status code is 500", () => {
    render(<Card {...cardProps} statusCode={500} />);
    expect(screen.getByRole("article").style.backgroundColor).toBe("red");
  });

  test("Should display a gray box if server status code is anything other than 200, 500 or 503", () => {
    render(<Card {...cardProps} statusCode={304} />);
    expect(screen.getByRole("article").style.backgroundColor).toBe("gray");
  });
});
