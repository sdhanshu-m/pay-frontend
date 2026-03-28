import { useEffect, useState } from "react";
import API from "./api/axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<"login" | "register" | "home">("login");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    API.get("/auth/me")
      .then((res) => {
        setUser(res.data);
        setPage("home");
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!user && page === "login")
    return <Login setPage={setPage} setUser={setUser} />;

  if (!user && page === "register")
    return <Register setPage={setPage} setUser={setUser} />;

  return <Home user={user} setUser={setUser} setPage={setPage} />;
}

export default App;