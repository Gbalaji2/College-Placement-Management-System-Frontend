import axios from "axios";
import { BASE_URL } from "../config/config.jsx";

const login = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/student/login`, credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

const signup = async (data) => {
  const response = await axios.post(`${BASE_URL}/student/signup`, data);
  return response.data;
};

const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    await axios.get(`${BASE_URL}/student/check-auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (err) {
    localStorage.removeItem("token");
    return false;
  }
};

const logout = () => localStorage.removeItem("token");

export default { login, signup, checkAuth, logout };