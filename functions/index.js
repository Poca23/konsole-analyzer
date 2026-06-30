process.env.GROQ_API_KEY =
  require("firebase-functions").config().groq?.api_key ||
  process.env.GROQ_API_KEY;

const functions = require("firebase-functions");
const { isValidUrl, normalizeUrl } = require("./src/validator");
const { analyzeUrl } = require("./src/analyzer");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.analyze = functions.https.onRequest(async (req, res) => {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.set(k, v));

  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { url } = req.body || {};
  if (!isValidUrl(url))
    return res.status(400).json({ error: "URL invalide ou non autorisée" });

  try {
    const normalized = normalizeUrl(url);
    const result = await analyzeUrl(normalized);
    return res.status(200).json(result);
  } catch (err) {
    functions.logger.error("analyzeUrl failed", err);
    return res.status(500).json({ error: "Erreur interne" });
  }
});
