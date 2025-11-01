import { Routes, Route, Link } from "react-router-dom";
import ShoppingListPage from "./pages/ShoppingListPage";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="logo">
          🛒 Shopping Lists
        </Link>
      </header>

      <main className="container">
        <Routes>
          <Route path="/lists/:id" element={<ShoppingListPage />} />

          <Route
            path="/"
            element={
              <div>
                <h1>Welcome 👋</h1>
                <p>
                  Open route: <code>/lists/1</code> or <code>/lists/2</code>
                </p>
                <p>
                  <Link to="/lists/1">Go to List #1</Link>
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
