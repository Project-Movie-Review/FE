import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6700/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (username, email, password) => api.post('/auth/register', { username, email, password });
export const getInfo = () => api.get('/user/profile');
export const getTrendingMovies = () => api.get('/movies/trending');
export const searchMovies = (query, page = 1, year = '', genre = '') => api.get('/movies/search', { params: { query, page, year, genre } });