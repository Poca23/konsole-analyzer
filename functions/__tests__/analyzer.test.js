jest.mock("../src/scraper");
jest.mock("../src/clearbit");
jest.mock("../src/groq");
jest.mock("../src/scoring");

const { scrapeHtml } = require("../src/scraper");
const { fetchClearbit } = require("../src/clearbit");
const { analyzeWithGroq } = require("../src/groq");
const { calculateScore } = require("../src/scoring");
const { analyzeUrl } = require("../src/analyzer");

const MOCK_AI = {
  nom: "Youno",
  description: "SaaS B2B",
  secteur: "SaaS",
  taille: "startup",
  langue: "fr",
  techStack: ["React"],
  motsClesGTM: ["b2b"],
};
const MOCK_SCORE = {
  score: 80,
  label: "🔥 Excellent fit",
  details: ["✅ Secteur tech"],
};

beforeEach(() => {
  scrapeHtml.mockResolvedValue("<html>test</html>");
  fetchClearbit.mockResolvedValue({
    name: "Youno",
    logo: "https://logo.png",
    domain: "youno.fr",
  });
  analyzeWithGroq.mockResolvedValue(MOCK_AI);
  calculateScore.mockReturnValue(MOCK_SCORE);
});

describe("analyzeUrl", () => {
  test("retourne un objet complet avec toutes les clés", async () => {
    const result = await analyzeUrl({
      full: "https://youno.fr",
      domain: "youno.fr",
    });
    expect(result).toHaveProperty("domain");
    expect(result).toHaveProperty("nom");
    expect(result).toHaveProperty("logo");
    expect(result).toHaveProperty("techStack");
    expect(result).toHaveProperty("scoring");
  });

  test("utilise le nom Clearbit si AI échoue", async () => {
    analyzeWithGroq.mockResolvedValue(null);
    calculateScore.mockReturnValue({ score: 0, label: "❓", details: [] });
    const result = await analyzeUrl({
      full: "https://youno.fr",
      domain: "youno.fr",
    });
    expect(result.nom).toBe("Youno");
  });

  test("utilise le domaine si Clearbit et AI échouent", async () => {
    analyzeWithGroq.mockResolvedValue(null);
    fetchClearbit.mockResolvedValue(null);
    calculateScore.mockReturnValue({ score: 0, label: "❓", details: [] });
    const result = await analyzeUrl({
      full: "https://youno.fr",
      domain: "youno.fr",
    });
    expect(result.nom).toBe("youno.fr");
  });

  test("techStack est un tableau vide si AI échoue", async () => {
    analyzeWithGroq.mockResolvedValue(null);
    calculateScore.mockReturnValue({ score: 0, label: "❓", details: [] });
    const result = await analyzeUrl({
      full: "https://youno.fr",
      domain: "youno.fr",
    });
    expect(result.techStack).toEqual([]);
  });
});
