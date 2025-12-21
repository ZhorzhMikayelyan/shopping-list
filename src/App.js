import React from "react";
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import ListsOverview from "./pages/ListsOverview";
import ShoppingListPage from "./pages/ShoppingListPage";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import { t } from "./i18n";
import "./App.css";

function AppShell() {
  const { lang, setLang, theme, setTheme, useMock, setUseMock } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const isOnDetail = location.pathname.startsWith("/lists/");

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-left">
          <Link to="/" className="brand">{t(lang, "appTitle")}</Link>
          {isOnDetail && (
            <button className="btn btn-ghost" onClick={() => navigate(-1)}>
              ← {t(lang, "back")}
            </button>
          )}
        </div>

        <div className="topbar-right">
          <div className="control">
            <span className="control-label">{t(lang, "language")}:</span>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="select">
              <option value="en">EN</option>
              <option value="cs">CZ</option>
            </select>
          </div>

          <div className="control">
            <span className="control-label">{t(lang, "theme")}:</span>
            <button
              className="btn btn-secondary"
              onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
            >
              {theme === "light" ? t(lang, "light") : t(lang, "dark")}
            </button>
          </div>

          <div className="control">
            <span className="control-label">{t(lang, "mockMode")}:</span>
            <button
              className={`btn ${useMock ? "btn-warning" : "btn-secondary"}`}
              onClick={() => setUseMock((p) => !p)}
              title="Switch between mock data and real server API"
            >
              {useMock ? t(lang, "on") : t(lang, "off")}
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/lists" replace />} />
          <Route path="/lists" element={<ListsOverview />} />
          <Route path="/lists/:id" element={<ShoppingListPage />} />
          <Route path="*" element={<Navigate to="/lists" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      {/* BrowserRouter уже в index.js */}
      <AppShell />
    </SettingsProvider>
  );
}
