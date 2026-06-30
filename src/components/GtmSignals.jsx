import "../styles/Tags.css";

export function GtmSignals({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="tags-section">
      <h3 className="tags-title">Signaux GTM</h3>
      <ul className="tags-list">
        {items.map((item) => (
          <li key={item} className="tag tag--gtm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
