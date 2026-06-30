const fetch = require("node-fetch");

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; KonsoleBot/1.0)",
  "Accept-Language": "en-US,en;q=0.9",
};

const TIMEOUT = 8000;

async function scrapeHtml(fullUrl) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);

    const res = await fetch(fullUrl, {
      headers: HEADERS,
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timer);
    if (!res.ok) return null;

    const html = await res.text();
    const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] || "";
    const bodyStart = html.match(/<body[^>]*>([\s\S]{0,500})/i)?.[1] || "";

    return (head + bodyStart).substring(0, 3000);
  } catch {
    return null;
  }
}

module.exports = { scrapeHtml };
