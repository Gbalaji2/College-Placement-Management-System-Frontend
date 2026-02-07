import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/CPMS.png";
import Toast from "../../components/Toast";
import isAuthenticated from "../../utility/auth.utility";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../../config/config";

function LoginTPO() {
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [isLoading, setLoading] = useState(false);

  // title
  useEffect(() => {
    document.title = "CPMS | TPO Login";
  }, []);

  // if already login redirect
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/tpo/dashboard");
    }
  }, [navigate]);

  // toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "email") setError({ ...error, email: "" });
    if (e.target.name === "password") setError({ ...error, password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !password)
      return setError({
        email: "Email Required!",
        password: "Password Required!",
      });

    if (!email) return setError({ email: "Email Required!" });
    if (!password) return setError({ password: "Password Required!" });

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/tpo/login`, formData);

      localStorage.setItem("token", response.data.token);

      navigate("/tpo/dashboard");
    } catch (error) {
      setLoading(false);

      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      } else {
        setToastMessage("Something went wrong!");
        setShowToast(true);
      }

      console.log("Error in TPO login.jsx => ", error);
    }
  };

  // eye toggle
  const [isEyeOpen, setEyeOpen] = useState(false);
  const handleEye = () => setEyeOpen(!isEyeOpen);

  return (
    <>
      {/* toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      {/* TOP NAVBAR */}
      <div className="w-full flex justify-between items-center px-6 py-3 bg-white/30 backdrop-blur-md border-b border-white/20 fixed top-0 left-0 z-50">
        <h2 className="font-bold text-lg">CPMS</h2>

        <Link
          to="/"
          className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 no-underline"
        >
          Home
        </Link>
      </div>

      {/* PAGE */}
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-400 from-10% via-yellow-300 via-40% to-orange-500 to-100%">
        <form
          className="form-signin flex justify-center items-center flex-col gap-3 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg p-8 shadow shadow-red-400 w-1/3 max-lg:w-2/3 max-md:w-3/4 max-[400px]:w-4/5 mt-10"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center flex-col">
            <img
              className="mb-4 rounded-xl shadow w-30 h-28 lg:w-40 lg:h-40"
              src={Logo}
              alt="Logo"
            />
            <h1 className="h3 mb-3 font-weight-normal">TPO Log In</h1>
          </div>

          {/* Email */}
          <div className="w-full">
            <input
              type="email"
              className="form-control ml-1"
              placeholder="Email address"
              autoComplete="email"
              name="email"
              value={email}
              onChange={handleChange}
            />

            <div className="text-red-500 ml-2 text-left">{error?.email}</div>
          </div>

          {/* Password */}
          <div className="w-full">
            <div className="flex justify-center items-center w-full">
              <input
                type={isEyeOpen ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                autoComplete="current-password"
                name="password"
                value={password}
                onChange={handleChange}
              />

              <i
                className={`${
                  isEyeOpen ? "fa-solid fa-eye" : "fa-regular fa-eye-slash"
                } -ml-6 cursor-pointer`}
                onClick={handleEye}
              ></i>
            </div>

            <div className="text-red-500 ml-2 text-left">{error?.password}</div>
          </div>

          {/* Button */}
          <div className="flex justify-center items-center flex-col">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Loading..." : "Log In"}
            </Button>
          </div>

          {/* Switch */}
          <span className="text-center">
            Log In as Management?
            <span
              className="text-blue-700 font-bold cursor-pointer px-1"
              onClick={() => navigate("/management/login")}
            >
              Click Here
            </span>
          </span>

          <p className="text-muted text-center text-gray-400">
            © College Placement Management System 2024 - 25
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginTPO;