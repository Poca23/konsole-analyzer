import { formatUrl, extractDomain } from "../utils/formatUrl";

describe("formatUrl", () => {
  test("retourne vide si vide", () => {
    expect(formatUrl("")).toBe("");
  });

  test("ajoute https si absent", () => {
    expect(formatUrl("youno.fr")).toBe("https://youno.fr");
  });

  test("ne double pas https", () => {
    expect(formatUrl("https://stripe.com")).toBe("https://stripe.com");
  });

  test("trim les espaces", () => {
    expect(formatUrl("  notion.so  ")).toBe("https://notion.so");
  });
});

describe("extractDomain", () => {
  test("retire https://", () => {
    expect(extractDomain("https://youno.fr")).toBe("youno.fr");
  });

  test("retire www.", () => {
    expect(extractDomain("www.stripe.com")).toBe("stripe.com");
  });

  test("retire le path", () => {
    expect(extractDomain("https://notion.so/pricing")).toBe("notion.so");
  });
});
