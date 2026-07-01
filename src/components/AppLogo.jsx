import logoIcon from "../assets/konsole_analyzer_logo.svg";
import logoFull from "../assets/konsole_analyzer_logo_text.svg";
import "../styles/AppLogo.css";

export function AppLogo({ variant = "icon", className = "" }) {
  const src = variant === "full" ? logoFull : logoIcon;
  const alt = variant === "full" ? "Konsole Analyzer" : "Logo";
  const modifierClass = variant === "full" ? "app-logo--full" : "";

  return (
    <div className={`app-logo ${modifierClass} ${className}`.trim()}>
      <img src={src} alt={alt} />
    </div>
  );
}
