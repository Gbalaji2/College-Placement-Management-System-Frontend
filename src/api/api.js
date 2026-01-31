import axios from "axios";

const BASE_URL = "https://cpms-backend-r2lk.onrender.com/api/v1/student";

const login = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  localStorage.setItem("token", response.data.token);
  return response.data; // return user data if needed
};

const signup = async (data) => {
  const response = await axios.post(`${BASE_URL}/signup`, data);
  return response.data; // { msg: "User Created!" }
};

const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    await axios.get(`${BASE_URL}/check-auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (err) {
    localStorage.removeItem("token");
    return false;
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  login,
  signup,
  checkAuth,
  logout,
};