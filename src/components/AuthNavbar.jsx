import { useNavigate } from "react-router-dom";

function AuthNavbar() {
  const navigate = useNavigate();

  return (
    <header className="w-full flex justify-between items-center px-6 py-3 bg-white shadow sticky top-0 z-50">
      <h1
        className="text-lg font-bold cursor-pointer text-blue-700"
        onClick={() => navigate("/")}
      >
        CPMS
      </h1>

      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Home
      </button>
    </header>
  );
}

export default AuthNavbar;