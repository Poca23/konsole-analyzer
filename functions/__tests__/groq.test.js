jest.mock("node-fetch");
const fetch = require("node-fetch");
const { analyzeWithGroq, parseGroqResponse } = require("../src/groq");

describe("parseGroqResponse", () => {
  test("extrait le JSON d'une réponse valide", () => {
    const content =
      'Voici le résultat : {"nom": "Stripe", "secteur": "Fintech"}';
    const result = parseGroqResponse(content);
    expect(result.nom).toBe("Stripe");
  });

  test("retourne null si pas de JSON", () => {
    expect(parseGroqResponse("pas de json ici")).toBeNull();
  });

  test("retourne null si JSON malformé", () => {
    expect(parseGroqResponse("{nom: invalide}")).toBeNull();
  });
});

describe("analyzeWithGroq", () => {
  test("retourne null si pas de clé API", async () => {
    delete process.env.GROQ_API_KEY;
    const result = await analyzeWithGroq("<html></html>", "test.com");
    expect(result).toBeNull();
  });

  test("retourne null si html null", async () => {
    process.env.GROQ_API_KEY = "fake-key";
    const result = await analyzeWithGroq(null, "test.com");
    expect(result).toBeNull();
  });

  test("retourne null si réponse non-ok", async () => {
    process.env.GROQ_API_KEY = "fake-key";
    fetch.mockResolvedValue({ ok: false });
    const result = await analyzeWithGroq("<html>test</html>", "test.com");
    expect(result).toBeNull();
  });

  test("parse et retourne les données si succès", async () => {
    process.env.GROQ_API_KEY = "fake-key";
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content:
                '{"nom":"Youno","secteur":"SaaS","taille":"startup","langue":"fr","techStack":[],"motsClesGTM":[],"description":"Plateforme SaaS"}',
            },
          },
        ],
      }),
    });
    const result = await analyzeWithGroq("<html>test</html>", "youno.fr");
    expect(result.nom).toBe("Youno");
    expect(result.secteur).toBe("SaaS");
  });
});
