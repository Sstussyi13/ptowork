import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ должен вести на backend
  withCredentials: true,
});

export default API;
