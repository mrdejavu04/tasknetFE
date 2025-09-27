import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Có thể thêm interceptor để log lỗi
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[API ERROR]", err?.response?.data || err.message);
    throw err;
  }
);

export default api;
