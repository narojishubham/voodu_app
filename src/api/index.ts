import axios from "axios";

const server = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        ["Content-Type"]: "application/json",
    },
    timeout: 30,
});

/*axiosRequest.interceptors.request.use(function (config: any) {
  const token = document.cookie.split('=')[1];
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
*/

export default server;
