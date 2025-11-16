// src/App.js
import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { SHOPPING_LISTS } from "./data";
import ShoppingListPage from "./pages/ShoppingListPage";
import ListsOverview from "./pages/ListsOverview";

export default function App() {
  // общий state для всех списков
  const [lists, setLists] = useState(SHOPPING_LISTS);

  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="logo">
          🛒 Shopping Lists
        </Link>
      </header>

      <main className="container">
        <Routes>
          {/* overview всех списков */}
          <Route
            path="/lists"
            element={<ListsOverview lists={lists} setLists={setLists} />}
          />

          {/* detail одного списка */}
          <Route
            path="/lists/:id"
            element={<ShoppingListPage lists={lists} setLists={setLists} />}
          />

          {/* редирект с корня на /lists */}
          <Route path="/" element={<Navigate to="/lists" replace />} />
        </Routes>
      </main>
    </div>
  );
}
