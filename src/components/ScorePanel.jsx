import "../styles/ScorePanel.css";

export function ScorePanel({ scoring }) {
  if (!scoring) return null;

  const { score, label, details } = scoring;

  return (
    <div className="score-panel">
      <div className="score-header">
        <span className="score-label">{label}</span>
        <span className="score-value">{score}/100</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        className="score-bar"
      >
        <div className="score-fill" style={{ width: `${score}%` }} />
      </div>
      {details.length > 0 && (
        <ul className="score-details">
          {details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
