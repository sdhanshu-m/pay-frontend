import { useState } from "react";
import API from "../api/axios";

export default function Login({ setUser, setPage }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Login</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} className="bg-black text-white p-2 w-full">
        Login
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-2 text-sm">
        Don’t have an account?{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => setPage("register")}
        >
          Register
        </span>
      </p>
    </div>
  );
}