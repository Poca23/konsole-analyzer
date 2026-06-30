export function formatUrl(raw = '') {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) return '';
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
}

export function extractDomain(raw = '') {
  return raw
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .toLowerCase();
}
