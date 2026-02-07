import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/CPMS.png";
import Toast from "../../components/Toast";
import isAuthenticated from "../../utility/auth.utility";
import { BASE_URL } from "../../config/config";

function Signup() {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [error, setError] = useState({});
  const [isEyeOpen, setEyeOpen] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    number: "",
    password: "",
  });

  const { first_name, email, number, password } = formData;

  // Set page title
  useEffect(() => {
    document.title = "CPMS | Student Sign Up";
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../student/dashboard");
    }
  }, [navigate]);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error for this field
    setError({ ...error, [e.target.name]: "" });

    // Live password validation
    if (e.target.name === "password" && e.target.value) {
      if (!validatePassword(e.target.value)) {
        setError((prev) => ({
          ...prev,
          password:
            "Password must be 8+ chars, include 1 uppercase, 1 lowercase, 1 number & 1 special char",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newError = {};
    if (!first_name) newError.first_name = "Name required!";
    if (!email) newError.email = "Email required!";
    if (!number) newError.number = "Phone number required!";
    if (!password) newError.password = "Password required!";
    if (number && number.length !== 10)
      newError.number = "Phone must be 10 digits!";
    if (password && !validatePassword(password))
      newError.password = "Invalid password format!";

    if (Object.keys(newError).length > 0) return setError(newError);

    try {
      await axios.post(`${BASE_URL}/student/signup`, formData);

      setToastMessage("User created successfully! Please login.");
      setShowToast(true);

      setTimeout(() => {
        navigate("../student/login", {
          state: {
            showToastPass: true,
            toastMessagePass: "Signup successful! Please login.",
          },
        });
      }, 1500);
    } catch (err) {
      console.error(err);
      setToastMessage(err?.response?.data?.msg || "Signup failed!");
      setShowToast(true);
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
      <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-red-400 via-pink-300 to-purple-300">
        
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
            <h1 className="text-xl font-bold">Student Sign Up</h1>
          </div>

          <input
            type="text"
            name="first_name"
            placeholder="Name"
            value={first_name}
            onChange={handleChange}
            className="form-control"
          />
          <span className="text-red-500">{error.first_name}</span>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="form-control"
          />
          <span className="text-red-500">{error.email}</span>

          <input
            type="number"
            name="number"
            placeholder="Phone Number"
            value={number}
            onChange={handleChange}
            className="form-control"
          />
          <span className="text-red-500">{error.number}</span>

          <div className="relative">
            <input
              type={isEyeOpen ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
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

          <button type="submit" className="btn btn-primary mt-2">
            Sign Up
          </button>

          <p className="text-center mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("../student/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;