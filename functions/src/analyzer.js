const { scrapeHtml } = require("./scraper");
const { fetchClearbit } = require("./clearbit");
const { analyzeWithGroq } = require("./groq");
const { calculateScore } = require("./scoring");

async function analyzeUrl({ full, domain }) {
  const [html, clearbit] = await Promise.all([
    scrapeHtml(full),
    fetchClearbit(domain),
  ]);

  const ai = await analyzeWithGroq(html, domain);
  const scoring = calculateScore(ai);

  return {
    domain,
    logo: clearbit?.logo || null,
    nom: ai?.nom || clearbit?.name || domain,
    description: ai?.description || "Non disponible",
    secteur: ai?.secteur || "Non détecté",
    taille: ai?.taille || "Non détectée",
    langue: ai?.langue || "Non détectée",
    techStack: ai?.techStack || [],
    motsClesGTM: ai?.motsClesGTM || [],
    scoring,
  };
}

module.exports = { analyzeUrl };
