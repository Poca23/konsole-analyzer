const fetch = require("node-fetch");

const BASE = "https://autocomplete.clearbit.com/v1/companies/suggest";

async function fetchClearbit(domain) {
  try {
    const res = await fetch(`${BASE}?query=${encodeURIComponent(domain)}`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!Array.isArray(data) || !data.length) return null;

    const company = data[0];
    return {
      name: company.name || null,
      logo: company.logo || null,
      domain: company.domain || domain,
    };
  } catch {
    return null;
  }
}

module.exports = { fetchClearbit };
