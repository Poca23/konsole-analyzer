import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../components/SearchBar";

describe("SearchBar", () => {
  test("affiche le placeholder", () => {
    render(<SearchBar onAnalyze={() => {}} loading={false} />);
    expect(screen.getByPlaceholderText("youno.fr")).toBeInTheDocument();
  });

  test("le bouton est désactivé si champ vide", () => {
    render(<SearchBar onAnalyze={() => {}} loading={false} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("appelle onAnalyze à la soumission", () => {
    const mock = vi.fn();
    render(<SearchBar onAnalyze={mock} loading={false} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "youno.fr" },
    });
    fireEvent.submit(screen.getByRole("form"));
    expect(mock).toHaveBeenCalledWith("youno.fr");
  });

  test("désactive l'input si loading", () => {
    render(<SearchBar onAnalyze={() => {}} loading={true} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
