import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isMockEnabledByEnv } from "../api";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [useMock, setUseMock] = useState(() => {
    const stored = localStorage.getItem("useMock");
    if (stored === null) return isMockEnabledByEnv;
    return stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("useMock", String(useMock));
  }, [useMock]);

  const value = useMemo(() => ({
    lang, setLang,
    theme, setTheme,
    useMock, setUseMock,
  }), [lang, theme, useMock]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
