const BLOCKED = ["localhost", "127.0.0.1", "0.0.0.0"];

function isValidUrl(raw) {
  if (!raw || typeof raw !== "string") return false;
  if (raw.length > 200) return false;

  const domain = raw
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .toLowerCase();

  if (BLOCKED.some((b) => domain.includes(b))) return false;
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) return false;

  return true;
}

function normalizeUrl(raw) {
  const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`;
  const url = new URL(withProtocol);
  return {
    full: url.origin,
    domain: url.hostname.replace(/^www\./, ""),
  };
}

module.exports = { isValidUrl, normalizeUrl };
