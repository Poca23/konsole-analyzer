import { render, screen } from "@testing-library/react";
import { Loader } from "../components/Loader";

test("affiche le message d'analyse", () => {
  render(<Loader />);
  expect(screen.getByText("Analyse en cours...")).toBeInTheDocument();
});

test("a le role status pour l'accessibilité", () => {
  render(<Loader />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});
