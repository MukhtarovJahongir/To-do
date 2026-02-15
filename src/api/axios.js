import axios from 'axios';

const api = axios.create({
  baseURL: "https://to-do-beckend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;