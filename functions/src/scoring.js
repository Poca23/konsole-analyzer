const TECH_SECTORS = [
  "saas",
  "tech",
  "software",
  "fintech",
  "martech",
  "devtools",
];
const B2B_SIGNALS = [
  "b2b",
  "saas",
  "sales",
  "growth",
  "enterprise",
  "api",
  "pipeline",
  "crm",
];

function scoreSector(secteur = "") {
  const s = secteur.toLowerCase();
  if (TECH_SECTORS.some((t) => s.includes(t)))
    return { points: 30, label: "✅ Secteur tech" };
  return { points: 0, label: null };
}

function scoreB2BSignals(aiData) {
  const text = [aiData.description || "", ...(aiData.motsClesGTM || [])]
    .join(" ")
    .toLowerCase();
  const found = B2B_SIGNALS.filter((s) => text.includes(s));
  const points = Math.min(found.length * 10, 30);
  const label = found.length ? `✅ Signaux B2B : ${found.join(", ")}` : null;
  return { points, label };
}

function scoreSize(taille = "") {
  const map = {
    startup: { points: 20, label: "✅ Startup" },
    pme: { points: 15, label: "✅ PME" },
  };
  return map[taille.toLowerCase()] || { points: 0, label: null };
}

function scoreLanguage(langue = "") {
  if (langue === "en") return { points: 10, label: "✅ Site en anglais" };
  return { points: 0, label: null };
}

function getLabel(score) {
  if (score >= 70) return "🔥 Excellent fit";
  if (score >= 40) return "👍 Bon potentiel";
  if (score >= 20) return "🤔 Potentiel modéré";
  return "❄️ Peu pertinent";
}

function calculateScore(aiData) {
  if (!aiData)
    return { score: 0, label: "❓ Données insuffisantes", details: [] };

  const checks = [
    scoreSector(aiData.secteur),
    scoreB2BSignals(aiData),
    scoreSize(aiData.taille),
    scoreLanguage(aiData.langue),
  ];

  const score = Math.min(
    checks.reduce((acc, c) => acc + c.points, 0),
    100,
  );
  const details = checks.map((c) => c.label).filter(Boolean);

  return { score, label: getLabel(score), details };
}

module.exports = { calculateScore };
