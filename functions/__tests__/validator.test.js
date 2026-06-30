const { isValidUrl, normalizeUrl } = require("../src/validator");

describe("isValidUrl", () => {
  test("retourne false si vide", () => {
    expect(isValidUrl("")).toBe(false);
  });

  test("retourne false si non-string", () => {
    expect(isValidUrl(null)).toBe(false);
    expect(isValidUrl(42)).toBe(false);
  });

  test("retourne false si > 200 chars", () => {
    expect(isValidUrl("a".repeat(201))).toBe(false);
  });

  test("retourne false pour localhost", () => {
    expect(isValidUrl("localhost:3000")).toBe(false);
    expect(isValidUrl("http://localhost")).toBe(false);
  });

  test("retourne false pour 127.0.0.1", () => {
    expect(isValidUrl("127.0.0.1")).toBe(false);
  });

  test("retourne true pour un domaine valide", () => {
    expect(isValidUrl("youno.fr")).toBe(true);
    expect(isValidUrl("https://stripe.com")).toBe(true);
  });
});

describe("normalizeUrl", () => {
  test("ajoute https si absent", () => {
    const result = normalizeUrl("youno.fr");
    expect(result.full).toBe("https://youno.fr");
  });

  test("extrait le domaine sans www", () => {
    const result = normalizeUrl("https://www.stripe.com");
    expect(result.domain).toBe("stripe.com");
  });

  test("ne double pas https", () => {
    const result = normalizeUrl("https://notion.so");
    expect(result.full).toBe("https://notion.so");
  });
});
