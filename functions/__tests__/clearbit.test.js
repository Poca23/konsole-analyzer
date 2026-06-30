jest.mock("node-fetch");
const fetch = require("node-fetch");
const { fetchClearbit } = require("../src/clearbit");

describe("fetchClearbit", () => {
  test("retourne null si fetch échoue", async () => {
    fetch.mockRejectedValue(new Error("fail"));
    expect(await fetchClearbit("test.com")).toBeNull();
  });

  test("retourne null si tableau vide", async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => [] });
    expect(await fetchClearbit("test.com")).toBeNull();
  });

  test("retourne null si réponse non-ok", async () => {
    fetch.mockResolvedValue({ ok: false, json: async () => [] });
    expect(await fetchClearbit("test.com")).toBeNull();
  });

  test("retourne name + logo si succès", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [
        { name: "Stripe", logo: "https://logo.png", domain: "stripe.com" },
      ],
    });
    const result = await fetchClearbit("stripe.com");
    expect(result.name).toBe("Stripe");
    expect(result.logo).toBe("https://logo.png");
  });
});
