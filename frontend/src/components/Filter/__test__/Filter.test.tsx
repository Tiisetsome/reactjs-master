import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "../Filter";

describe("Filter", () => {
  test("Should be able to choose environment", () => {
    render(<Filter filters={{ environments: "all" }} setFilters={() => {}} />);
    const select = screen.getByLabelText(
      /choose environment/i
    )! as HTMLFormElement;

    expect(select.value).toBe("all");
    userEvent.selectOptions(select, "all");
    expect(select.value).toBe("all");
    userEvent.selectOptions(select, "production");
    expect(select.value).toBe("production");
    userEvent.selectOptions(select, "testing");
    expect(select.value).toBe("testing");
  });
});
