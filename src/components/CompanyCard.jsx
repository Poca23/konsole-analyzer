import { TechStack } from "./TechStack";
import { GtmSignals } from "./GtmSignals";
import { ScorePanel } from "./ScorePanel";
import "../styles/CompanyCard.css";

export function CompanyCard({ data }) {
  const {
    nom,
    domain,
    logo,
    description,
    secteur,
    taille,
    techStack,
    motsClesGTM,
    scoring,
  } = data;

  return (
    <article className="company-card">
      <div className="card-header">
        {logo && (
          <img
            src={logo}
            alt={`Logo ${nom}`}
            className="card-logo"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <div className="card-identity">
          <h2 className="card-name">{nom}</h2>
          <p className="card-domain">{domain}</p>
        </div>
      </div>

      <p className="card-description">{description}</p>

      <div className="card-meta">
        <span className="card-badge">{secteur}</span>
        <span className="card-badge">{taille}</span>
      </div>

      <TechStack items={techStack} />
      <GtmSignals items={motsClesGTM} />
      <ScorePanel scoring={scoring} />
    </article>
  );
}
