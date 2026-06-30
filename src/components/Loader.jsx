import "../styles/Loader.css";

export function Loader() {
  return (
    <div role="status" className="loader">
      <div className="loader-spinner" aria-hidden="true" />
      <p>Analyse en cours...</p>
    </div>
  );
}
