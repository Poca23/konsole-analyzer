import { useState } from 'react';
import '../styles/SearchBar.css';

export function SearchBar({ onAnalyze, loading }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim()) onAnalyze(value.trim());
  }

  return (
    <form role="form" onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        role="textbox"
        placeholder="youno.fr"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
        className="search-input"
      />
      <button
        type="submit"
        disabled={!value.trim() || loading}
        className="search-button"
      >
        {loading ? 'Analyse...' : 'Analyser'}
      </button>
    </form>
  );
}
