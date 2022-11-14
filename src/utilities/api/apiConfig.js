import axios from 'axios';

let baseURL = 'http://' + process.env.REACT_APP_BACKEND_ENV + process.env.REACT_APP_API_URL;
console.log(baseURL);
// export const api = axios.create({ baseURL });
export const api = axios.create({
  baseURL: baseURL,
});
const getToken = () => {
  return new Promise((resolve) => {
    resolve(`Bearer ${localStorage.getItem('token') || null}`);
  });
};

api.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = await getToken();
    return config;
  },
  (error) => {
    console.log('Request error: ', error);
    return Promise.reject(error);
  },
);
