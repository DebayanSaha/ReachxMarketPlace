import { useState } from "react";
import Toast from "./components/Toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState("login"); // login | register | dashboard
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  const handleLogin = (u) => { setUser(u); setPage("dashboard"); };
  const handleLogout = () => { setUser(null); setPage("login"); addToast("Signed out", "success"); };

  return (
    <>
      <Toast toasts={toasts} />
      {page === "login" && <Login onLogin={handleLogin} onGoRegister={() => setPage("register")} addToast={addToast} />}
      {page === "register" && <Register onGoLogin={() => setPage("login")} addToast={addToast} />}
      {page === "dashboard" && <Dashboard user={user} onLogout={handleLogout} addToast={addToast} />}
    </>
  );
}