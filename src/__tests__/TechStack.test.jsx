import { render, screen } from "@testing-library/react";
import { TechStack } from "../components/TechStack";

test("n'affiche rien si tableau vide", () => {
  const { container } = render(<TechStack items={[]} />);
  expect(container.firstChild).toBeNull();
});

test("affiche chaque technologie", () => {
  render(<TechStack items={["React", "Vite", "Firebase"]} />);
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByText("Vite")).toBeInTheDocument();
  expect(screen.getByText("Firebase")).toBeInTheDocument();
});
