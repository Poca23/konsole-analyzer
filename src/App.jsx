import { useAnalyze } from "./hooks/useAnalyze";
import { SearchBar } from "./components/SearchBar";
import { CompanyCard } from "./components/CompanyCard";
import { Loader } from "./components/Loader";
import { SplashScreen } from "./components/SplashScreen";
import { AppLogo } from "./components/AppLogo";
import "./styles/global.css";
import "./styles/responsive.css";

export default function App() {
  const { result, loading, error, analyze } = useAnalyze();

  return (
    <>
      <SplashScreen />
      <main className="app">
        <header className="app-header">
          <AppLogo variant="icon" />
          <h1 className="app-title">Konsole Analyzer</h1>
          <p className="app-subtitle">
            Analysez n'importe quel site en quelques secondes
          </p>
        </header>

        <SearchBar onAnalyze={analyze} loading={loading} />

        {loading && <Loader />}

        {error && (
          <div role="alert" className="error-message">
            {error}
          </div>
        )}

        {result && <CompanyCard data={result} />}
      </main>
    </>
  );
}
