import { useState, useEffect } from "react";
import { setTheme } from "../utils/theme";

function ThemeToggle() {
  const [theme, setThemeSetting] = useState("auto");

  useEffect(() => {
    chrome.storage.local.get(["theme"], (result) => {
      if (result.theme) {
        setThemeSetting(result.theme);
      }
    });
  }, []);

  const handleChange = (e) => {
    const selectedTheme = e.target.value;
    setThemeSetting(selectedTheme);
    setTheme(selectedTheme);
    chrome.storage.local.set({ theme: selectedTheme });
  };

  return (
    <div className="theme-toggle">
      <label htmlFor="theme-select">Theme</label>
      <select id="theme-select" value={theme} onChange={handleChange}>
        <option value="auto">Auto (System: {detectSystemTheme()})</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}

// Helper to detect system theme immediately
function detectSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : "Light";
}

export default ThemeToggle;
