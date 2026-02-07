import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/CPMS.png";
import Toast from "../../components/Toast";
import isAuthenticated from "../../utility/auth.utility";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../../config/config";
import AuthNavbar from "../../components/AuthNavbar";

function LoginManagement() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEyeOpen, setEyeOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // Set title
  useEffect(() => {
    document.title = "CPMS | Management Login";
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../management/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {};
    if (!email) newError.email = "Email Required!";
    if (!password) newError.password = "Password Required!";
    if (Object.keys(newError).length > 0) return setError(newError);

    setLoading(true);

    try {
      // ✅ FIXED URL (BASE_URL already contains /api/v1)
      const response = await axios.post(
        `${BASE_URL}/management/login`,
        formData
      );

      localStorage.setItem("token", response.data.token);
      navigate("/management/dashboard");
    } catch (err) {
      setToastMessage(err?.response?.data?.msg || "Login failed!");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Home + Back */}
      <AuthNavbar />

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-500 via-purple-400 to-pink-500 px-4">
        <form
          className="flex justify-center items-center flex-col gap-3 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg p-8 shadow shadow-red-400 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center flex-col">
            <img
              className="mb-4 rounded-xl shadow w-32 h-32"
              src={Logo}
              alt="Logo"
            />
            <h1 className="text-xl font-bold text-black">Management Log In</h1>
          </div>

          {/* Email */}
          <div className="w-full">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              autoComplete="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <div className="text-red-500 text-left text-sm mt-1">
              {error?.email}
            </div>
          </div>

          {/* Password */}
          <div className="w-full">
            <div className="flex items-center w-full relative">
              <input
                type={isEyeOpen ? "text" : "password"}
                className="form-control pr-10"
                placeholder="Password"
                autoComplete="current-password"
                name="password"
                value={password}
                onChange={handleChange}
              />

              <i
                className={`absolute right-3 cursor-pointer ${
                  isEyeOpen ? "fa-solid fa-eye" : "fa-regular fa-eye-slash"
                }`}
                onClick={() => setEyeOpen(!isEyeOpen)}
              ></i>
            </div>

            <div className="text-red-500 text-left text-sm mt-1">
              {error?.password}
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center items-center flex-col mt-2">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Loading..." : "Log In"}
            </Button>
          </div>

          {/* Switch to TPO */}
          <span className="text-center text-black mt-2">
            Log In as TPO?
            <span
              className="text-blue-700 font-bold cursor-pointer px-1"
              onClick={() => navigate("../tpo/login")}
            >
              Click Here
            </span>
          </span>

          <p className="text-center text-gray-700 mt-3">
            © College Placement Management System 2025 - 26
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginManagement;