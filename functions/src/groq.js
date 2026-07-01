const fetch = require("node-fetch");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

function buildPrompt(html, domain) {
  return `Tu es un analyste business. Analyse le HTML du site "${domain}".
Réponds UNIQUEMENT avec un JSON valide, sans texte avant ou après.

{
  "nom": "nom de l'entreprise",
  "description": "1 phrase décrivant l'activité principale",
  "secteur": "SaaS / Fintech / E-commerce / Agence / Consulting / Autre",
  "taille": "startup / PME / grande entreprise",
  "langue": "fr / en / autre",
  "techStack": ["technologies détectées dans le HTML : frameworks, outils, plateformes"],
  "motsClesGTM": ["mots-clés business : b2b, crm, revops, outbound, gtm, automation, sales..."]
}

Sois précis sur techStack : cherche les scripts, meta tags, liens vers des outils connus.
Sois précis sur motsClesGTM : cherche les mots du domaine commercial et marketing.

HTML :
${html}`;
}

function parseGroqResponse(content) {
  try {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) return null;
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

async function analyzeWithGroq(html, domain) {
  const key = process.env.GROQ_API_KEY;
  if (!key || !html) return null;

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 600,
        messages: [{ role: "user", content: buildPrompt(html, domain) }],
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return parseGroqResponse(data.choices?.[0]?.message?.content || "");
  } catch {
    return null;
  }
}

module.exports = { analyzeWithGroq, parseGroqResponse };
