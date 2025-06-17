const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

const API = axios.create({
  baseURL,
  withCredentials: true,
});
