import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
export const searchMovies = (query, page = 1) => api.get('/movie/search', { params: { query, page } });
export const getMovieReviews = (movieId) => api.get(`/review/${movieId}`);
export const getUserWatchlist = () => api.get('/watchlist/user');
export const updateUser = (username = null, avatar = null) => api.put('/user/update', { username, avatar });
export const changePassword = (oldPassword = null, newPassword = null) => api.put('/user/update', { oldPassword, newPassword });
export const getMovieDetail = (id) => api.get(`/movie/${id}`);
export const submitReview = (movieId, rating, content) => api.post('/review/create', { movieId, rating, content });
export const toggleWatchlist = (movieId) => api.post('/watchlist/toggle', { movieId });
export const getAllUsers = (search, sortBy, sortOrder, page, limit) => api.get('/user/all', { params: { search, sortBy, sortOrder, page, limit } });
export const getUserById = (userId) => api.get(`/user/profile/${userId}`);
export const deleteUser = (userId) => api.delete(`/user/delete/${userId}`);
export const uploadImage = (imageFile) => {
  const formData = new FormData();
  formData.append('imageUrls', imageFile);
  return api.post('/image/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
// Fetch image as a blob when needed (keeps API flexible for previews/downloads)
export const getImage = (imagePath) => api.get(`/image/${imagePath}`, { responseType: 'blob' });
export const filterMovies = (options = {}) => {
  // If caller passed a nested object by mistake (e.g. { minRating: { minRating: 3, ... } }), flatten one level
  const flattened = {};
  Object.entries(options).forEach(([k, v]) => {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      // merge inner object keys
      Object.entries(v).forEach(([ik, iv]) => {
        flattened[ik] = iv;
      });
    } else {
      flattened[k] = v;
    }
  });

  const { minRating, maxRating, genreIds, minReleaseDate, maxReleaseDate, sortBy, sortOrder, keyword, page, limit } = flattened;
  const params = { minRating, maxRating, genreIds, minReleaseDate, maxReleaseDate, sortBy, sortOrder, keyword, page, limit };
  // remove undefined keys
  Object.keys(params).forEach((k) => params[k] === undefined && delete params[k]);
  console.log('filterMovies params:', params);
  return api.get('/movie/filter', { params });
};