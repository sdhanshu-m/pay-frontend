import Payment from "./Payment";

export default function Home({ user, setUser }: any) {
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="p-4">
     <h1>Welcome, {user ? user.name : "Guest"}</h1>

      <button onClick={logout} className="mt-2 bg-red-500 text-white p-2">
        Logout
      </button>

      <Payment />
    </div>
  );
}