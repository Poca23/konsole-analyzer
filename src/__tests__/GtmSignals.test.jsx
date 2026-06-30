import { render, screen } from "@testing-library/react";
import { GtmSignals } from "../components/GtmSignals";

test("n'affiche rien si tableau vide", () => {
  const { container } = render(<GtmSignals items={[]} />);
  expect(container.firstChild).toBeNull();
});

test("affiche les signaux GTM", () => {
  render(<GtmSignals items={["b2b", "saas", "crm"]} />);
  expect(screen.getByText("b2b")).toBeInTheDocument();
  expect(screen.getByText("saas")).toBeInTheDocument();
});
