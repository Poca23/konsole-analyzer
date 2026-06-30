import { renderHook, act } from "@testing-library/react";
import { useAnalyze } from "../hooks/useAnalyze";

global.fetch = vi.fn();

describe("useAnalyze", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("état initial correct", () => {
    const { result } = renderHook(() => useAnalyze());
    expect(result.current.result).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("ne fait rien si url vide", async () => {
    const { result } = renderHook(() => useAnalyze());
    await act(async () => {
      await result.current.analyze("");
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  test("passe loading à false après appel", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ nom: "Test" }),
    });
    const { result } = renderHook(() => useAnalyze());
    await act(async () => {
      await result.current.analyze("youno.fr");
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.result).not.toBeNull();
  });

  test("set error si réponse non-ok", async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "URL invalide" }),
    });
    const { result } = renderHook(() => useAnalyze());
    await act(async () => {
      await result.current.analyze("badurl");
    });
    expect(result.current.error).toBe("URL invalide");
    expect(result.current.result).toBeNull();
  });
});
