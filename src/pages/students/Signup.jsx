import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../../assets/CPMS.png";
import Toast from '../../components/Toast';
import isAuthenticated from '../../utility/auth.utility';
import { BASE_URL } from '../../config/config';

function Signup() {
  document.title = 'CPMS | Student Sign Up';
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../student/dashboard");
    }
  }, [navigate]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState({});

  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    number: '',
    password: '',
  });

  const { first_name, email, number, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error for this field
    setError({ ...error, [e.target.name]: '' });

    if (e.target.name === 'password' && !validatePassword(e.target.value)) {
      setError({
        ...error,
        password: 'Password must be 8+ chars, include 1 uppercase, 1 lowercase, 1 number & 1 special char',
      });
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newError = {};
    if (!first_name) newError.first_name = 'Name required!';
    if (!email) newError.email = 'Email required!';
    if (!number) newError.number = 'Phone number required!';
    if (!password) newError.password = 'Password required!';
    if (number && number.length !== 10) newError.number = 'Phone must be 10 digits!';
    if (password && !validatePassword(password)) newError.password = 'Invalid password format!';

    if (Object.keys(newError).length > 0) return setError(newError);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/student/signup`, formData);
      setToastMessage("User created successfully! Please login.");
      setShowToast(true);

      // Redirect to login after 2s
      setTimeout(() => {
        navigate('../student/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      setToastMessage(err?.response?.data?.msg || "Signup failed!");
      setShowToast(true);
    }
  };

  const [isEyeOpen, setEyeOpen] = useState(false);

  return (
    <>
      <Toast show={showToast} onClose={() => setShowToast(false)} message={toastMessage} delay={3000} position="bottom-end" />

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-400 via-pink-300 to-purple-300">
        <form className="bg-white/30 p-8 rounded-lg shadow backdrop-blur-md w-1/3 max-md:w-3/4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="w-32 h-32 mb-2 rounded-xl shadow" />
            <h1 className="text-xl font-bold">Student Sign Up</h1>
          </div>

          <input type="text" name="first_name" placeholder="Name" value={first_name} onChange={handleChange} className="form-control" />
          <span className="text-red-500">{error.first_name}</span>

          <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} className="form-control" />
          <span className="text-red-500">{error.email}</span>

          <input type="number" name="number" placeholder="Phone Number" value={number} onChange={handleChange} className="form-control" />
          <span className="text-red-500">{error.number}</span>

          <div className="relative">
            <input type={isEyeOpen ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={handleChange} className="form-control pr-10" />
            <i className={`absolute right-2 top-2 cursor-pointer ${isEyeOpen ? 'fa-solid fa-eye' : 'fa-regular fa-eye-slash'}`} onClick={() => setEyeOpen(!isEyeOpen)}></i>
          </div>
          <span className="text-red-500">{error.password}</span>

          <button type="submit" className="btn btn-primary mt-2">Sign Up</button>

          <p className="text-center mt-2">
            Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('../student/login')}>Login</span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;