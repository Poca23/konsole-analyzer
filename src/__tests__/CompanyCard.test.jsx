import { render, screen } from "@testing-library/react";
import { CompanyCard } from "../components/CompanyCard";

const MOCK_DATA = {
  nom: "Youno",
  domain: "youno.fr",
  logo: "https://logo.png",
  description: "Plateforme SaaS B2B",
  secteur: "SaaS",
  taille: "startup",
  techStack: ["React"],
  motsClesGTM: ["b2b"],
  scoring: { score: 80, label: "🔥 Excellent fit", details: [] },
};

test("affiche le nom de l'entreprise", () => {
  render(<CompanyCard data={MOCK_DATA} />);
  expect(screen.getByText("Youno")).toBeInTheDocument();
});

test("affiche le domaine", () => {
  render(<CompanyCard data={MOCK_DATA} />);
  expect(screen.getByText("youno.fr")).toBeInTheDocument();
});

test("affiche la description", () => {
  render(<CompanyCard data={MOCK_DATA} />);
  expect(screen.getByText("Plateforme SaaS B2B")).toBeInTheDocument();
});

test("affiche le logo avec alt correct", () => {
  render(<CompanyCard data={MOCK_DATA} />);
  expect(screen.getByAltText("Logo Youno")).toBeInTheDocument();
});
