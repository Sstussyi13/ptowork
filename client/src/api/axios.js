// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `${window.location.origin}/api`,
  withCredentials: true,
});

export default API;
