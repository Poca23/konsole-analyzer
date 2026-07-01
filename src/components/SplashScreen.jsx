import { useState, useEffect } from "react";
import logoFull from "../assets/konsole_analyzer_logo_text.svg";
import "../styles/SplashScreen.css";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 4500);
    const t2 = setTimeout(() => setVisible(false), 5400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`splash-overlay${exiting ? " splash-exit" : ""}`}>
      <img className="splash-logo" src={logoFull} alt="Konsole Analyzer" />
      <p className="splash-prompt">
        analyzing... <span>▋</span>
      </p>
    </div>
  );
}
