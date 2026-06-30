import { useState } from 'react';
import { formatUrl } from '../utils/formatUrl';

const API_URL = import.meta.env.VITE_API_URL;

export function useAnalyze() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function analyze(rawUrl) {
    if (!rawUrl?.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formatUrl(rawUrl) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur serveur');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Impossible d\'analyser ce site.');
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, error, analyze };
}
