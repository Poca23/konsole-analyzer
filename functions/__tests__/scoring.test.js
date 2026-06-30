const { calculateScore } = require("../src/scoring");

describe("calculateScore", () => {
  test("retourne score 0 si aiData null", () => {
    const result = calculateScore(null);
    expect(result.score).toBe(0);
    expect(result.label).toBe("❓ Données insuffisantes");
    expect(result.details).toEqual([]);
  });

  test("ajoute 30 points pour secteur tech", () => {
    const result = calculateScore({
      secteur: "SaaS",
      description: "",
      motsClesGTM: [],
      taille: "",
      langue: "",
    });
    expect(result.score).toBeGreaterThanOrEqual(30);
  });

  test("ajoute des points pour signaux B2B", () => {
    const result = calculateScore({
      secteur: "",
      description: "plateforme b2b saas",
      motsClesGTM: [],
      taille: "",
      langue: "",
    });
    expect(result.score).toBeGreaterThan(0);
  });

  test("ajoute 20 points pour startup", () => {
    const result = calculateScore({
      secteur: "",
      description: "",
      motsClesGTM: [],
      taille: "startup",
      langue: "",
    });
    expect(result.score).toBe(20);
  });

  test("ajoute 10 points si langue anglaise", () => {
    const result = calculateScore({
      secteur: "",
      description: "",
      motsClesGTM: [],
      taille: "",
      langue: "en",
    });
    expect(result.score).toBe(10);
  });

  test("score plafonné à 100", () => {
    const result = calculateScore({
      secteur: "SaaS",
      description: "b2b saas sales growth enterprise api pipeline crm",
      motsClesGTM: ["b2b", "saas", "sales"],
      taille: "startup",
      langue: "en",
    });
    expect(result.score).toBeLessThanOrEqual(100);
  });

  test("label correct selon score", () => {
    const high = calculateScore({
      secteur: "SaaS",
      description: "b2b saas sales growth",
      motsClesGTM: [],
      taille: "startup",
      langue: "en",
    });
    expect(high.label).toBe("🔥 Excellent fit");
  });
});
