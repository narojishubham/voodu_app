import axios from "axios";

const server = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        ["Content-Type"]: "application/json",
    },
    timeout: 30000,
});

server.interceptors.request.use(function (config: any) {
  const token = localStorage.getItem("theboom_token")
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default server;
