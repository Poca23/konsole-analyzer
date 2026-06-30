import { render, screen } from "@testing-library/react";
import { ScorePanel } from "../components/ScorePanel";

const MOCK_SCORING = {
  score: 80,
  label: "🔥 Excellent fit",
  details: ["✅ Secteur tech"],
};

test("n'affiche rien si scoring null", () => {
  const { container } = render(<ScorePanel scoring={null} />);
  expect(container.firstChild).toBeNull();
});

test("affiche le label et le score", () => {
  render(<ScorePanel scoring={MOCK_SCORING} />);
  expect(screen.getByText("🔥 Excellent fit")).toBeInTheDocument();
  expect(screen.getByText("80/100")).toBeInTheDocument();
});

test("affiche les détails", () => {
  render(<ScorePanel scoring={MOCK_SCORING} />);
  expect(screen.getByText("✅ Secteur tech")).toBeInTheDocument();
});

test("barre de progression a le bon aria", () => {
  render(<ScorePanel scoring={MOCK_SCORING} />);
  const bar = screen.getByRole("progressbar");
  expect(bar).toHaveAttribute("aria-valuenow", "80");
});
