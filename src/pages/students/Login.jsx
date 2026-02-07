import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/CPMS.png";
import Toast from "../../components/Toast";
import isAuthenticated from "../../utility/auth.utility";
import { BASE_URL } from "../../config/config";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isEyeOpen, setEyeOpen] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = "CPMS | Student Login";
  }, []);

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated()) navigate("../student/dashboard");
  }, [navigate]);

  // Handle toast message from signup page
  useEffect(() => {
    const { showToastPass, toastMessagePass } = location.state || {};

    if (showToastPass) {
      setToastMessage(toastMessagePass);
      setShowToast(true);

      // Clear state after showing toast
      navigate(".", { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {};
    if (!formData.email) newError.email = "Email required!";
    if (!formData.password) newError.password = "Password required!";
    if (Object.keys(newError).length > 0) return setError(newError);

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/student/login`, formData);

      localStorage.setItem("token", response.data.token);
      navigate("../student/dashboard");
    } catch (err) {
      setToastMessage(err?.response?.data?.msg || "Login failed!");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      {/* ✅ Added relative for absolute Home button */}
      <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-500">
        
        {/* ✅ Home Button */}
        <div className="absolute top-5 left-5">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white shadow font-semibold"
          >
            ⬅ Home
          </button>
        </div>

        <form
          className="bg-white/30 p-8 rounded-lg shadow backdrop-blur-md w-1/3 max-md:w-3/4 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            <img
              src={Logo}
              alt="Logo"
              className="w-32 h-32 mb-2 rounded-xl shadow"
            />
            <h1 className="text-xl font-bold">Student Login</h1>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
          <span className="text-red-500">{error.email}</span>

          <div className="relative">
            <input
              type={isEyeOpen ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control pr-10"
            />

            <i
              className={`absolute right-2 top-2 cursor-pointer ${
                isEyeOpen ? "fa-solid fa-eye" : "fa-regular fa-eye-slash"
              }`}
              onClick={() => setEyeOpen(!isEyeOpen)}
            ></i>
          </div>

          <span className="text-red-500">{error.password}</span>

          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("../student/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;