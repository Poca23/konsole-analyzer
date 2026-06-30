import "../styles/Tags.css";

export function TechStack({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="tags-section">
      <h3 className="tags-title">Tech Stack</h3>
      <ul className="tags-list">
        {items.map((item) => (
          <li key={item} className="tag tag--tech">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
