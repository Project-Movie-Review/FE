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
export const getTrendingMovies = () => api.get('/movie/trending');
export const searchMovies = (query, page = 1) => api.get('/movie/search', { params: { query, page  } });
export const filterMovies = (minRating, maxRating, genreIds, minReleaseYear, maxReleaseYear, sortBy, sortOrder) => api.get('/movie/filter', { query: { minRating, maxRating, genreIds, minReleaseYear, maxReleaseYear, sortBy, sortOrder } });
export const getUserWatchlist = () => api.get('/watchlist/user');
export const updateUser = (username = null, avatar = null) => api.put('/user/update', { username, avatar });
export const changePassword = (oldPassword = null, newPassword = null) => api.put('/user/update', { oldPassword, newPassword });
export const getMovieDetail = (id) => api.get(`/movie/${id}`);
export const getMovieReviews = (id, sortBy, sortOrder, page, limit) => api.get(`/review/${id}`, { query: { sortBy, sortOrder, page, limit } });
export const submitReview = (movieId, rating, content) => api.post('/review/create', { movieId, rating, content });
export const toggleWatchlist = (movieId) => api.post('/watchlist/toggle', { movieId });