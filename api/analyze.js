import { isValidUrl, normalizeUrl } from "../functions/src/validator";
import { analyzeUrl } from "../functions/src/analyzer";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { url } = req.body || {};
  if (!isValidUrl(url))
    return res.status(400).json({ error: "URL invalide ou non autorisée" });

  try {
    const normalized = normalizeUrl(url);
    const result = await analyzeUrl(normalized);
    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ error: "Erreur interne" });
  }
}
