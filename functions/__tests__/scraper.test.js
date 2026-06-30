jest.mock("node-fetch");
const fetch = require("node-fetch");
const { scrapeHtml } = require("../src/scraper");

describe("scrapeHtml", () => {
  test("retourne null si fetch échoue", async () => {
    fetch.mockRejectedValue(new Error("network error"));
    const result = await scrapeHtml("https://fail.com");
    expect(result).toBeNull();
  });

  test("retourne null si réponse non-ok", async () => {
    fetch.mockResolvedValue({ ok: false, text: async () => "" });
    const result = await scrapeHtml("https://fail.com");
    expect(result).toBeNull();
  });

  test("retourne une string si succès", async () => {
    const fakeHtml = "<head><title>Test</title></head><body>Hello</body>";
    fetch.mockResolvedValue({ ok: true, text: async () => fakeHtml });
    const result = await scrapeHtml("https://test.com");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("tronque à 3000 chars max", async () => {
    const bigHtml = "<head>" + "x".repeat(5000) + "</head>";
    fetch.mockResolvedValue({ ok: true, text: async () => bigHtml });
    const result = await scrapeHtml("https://test.com");
    expect(result.length).toBeLessThanOrEqual(3000);
  });
});
