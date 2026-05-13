import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6700/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data || response,
  (error) => Promise.reject(error)
);

// --- MOCK DATA ---
const mockMovies = [
  { id: 1, title: "Deadpool & Wolverine", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop", backdrop: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1920&auto=format&fit=crop", rating: 7.8, releaseDate: "2024", overview: "Lịch sử của MCU sẽ thay đổi mãi mãi khi Wade Wilson gặp Logan." },
  { id: 2, title: "Inside Out 2", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop", backdrop: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1920&auto=format&fit=crop", rating: 7.7, releaseDate: "2024", overview: "Những cảm xúc mới xuất hiện trong tâm trí của Riley khi cô bước vào tuổi dậy thì." },
  { id: 3, title: "Despicable Me 4", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=500&auto=format&fit=crop", backdrop: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1920&auto=format&fit=crop", rating: 7.2, releaseDate: "2024", overview: "Gru và gia đình chào đón thành viên mới, Gru Jr., người luôn muốn hành hạ cha mình." },
  { id: 4, title: "Alien: Romulus", poster: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=500&auto=format&fit=crop", backdrop: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1920&auto=format&fit=crop", rating: 7.3, releaseDate: "2024", overview: "Một nhóm người trẻ tuổi khám phá một trạm vũ trụ bị bỏ hoang và đối mặt với nỗi kinh hoàng." },
  { id: 5, title: "Kingdom of the Planet of the Apes", poster: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=500&auto=format&fit=crop", backdrop: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1920&auto=format&fit=crop", rating: 6.9, releaseDate: "2024", overview: "Nhiều năm sau thời đại của Caesar, một thủ lĩnh khỉ mới bắt đầu xây dựng đế chế của mình." },
  { id: 6, title: "Bad Boys: Ride or Die", poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=500&auto=format&fit=crop", rating: 7.6, releaseDate: "2024" },
  { id: 7, title: "The Garfield Movie", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=500&auto=format&fit=crop", rating: 7.1, releaseDate: "2024" },
  { id: 8, title: "Dune: Part Two", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=500&auto=format&fit=crop", rating: 8.2, releaseDate: "2024" },
  { id: 9, title: "Kung Fu Panda 4", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop", rating: 7.1, releaseDate: "2024" },
  { id: 10, title: "A Quiet Place: Day One", poster: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=500&auto=format&fit=crop", rating: 6.8, releaseDate: "2024" },
  { id: 11, title: "The Super Mario Bros. Movie", poster: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=500&auto=format&fit=crop", rating: 7.4, releaseDate: "2023" },
  { id: 12, title: "The Fall Guy", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop", rating: 7.1, releaseDate: "2024" },
  { id: 13, title: "Challengers", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop", rating: 7.3, releaseDate: "2024" },
  { id: 14, title: "Civil War", poster: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=500&auto=format&fit=crop", rating: 7.2, releaseDate: "2024" },
  { id: 15, title: "Godzilla x Kong: The New Empire", poster: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=500&auto=format&fit=crop", rating: 6.5, releaseDate: "2024" },
  { id: 16, title: "Twisters", poster: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=500&auto=format&fit=crop", rating: 7.0, releaseDate: "2024" },
  { id: 17, title: "Fly Me to the Moon", poster: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=500&auto=format&fit=crop", rating: 6.8, releaseDate: "2024" },
  { id: 18, title: "Longlegs", poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=500&auto=format&fit=crop", rating: 7.5, releaseDate: "2024" },
  { id: 19, title: "Trap", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=500&auto=format&fit=crop", rating: 6.6, releaseDate: "2024" },
  { id: 20, title: "Blink Twice", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=500&auto=format&fit=crop", rating: 6.9, releaseDate: "2024" }
];

let mockUsers = [
  { id: 1, username: 'Người dùng Test', email: 'test@example.com', role: 'user', isLocked: false, created_at: '2024-01-15' },
  { id: 2, username: 'JohnDoe', email: 'john@example.com', role: 'user', isLocked: false, created_at: '2024-02-20' },
];

let mockReviews = [
  { id: 1, movieId: 1, username: 'JohnDoe', rating: 9, content: 'Phim cực kỳ tuyệt vời!', created_at: '2024-05-11' },
];

// --- API FUNCTIONS ---

// Auth
export const login = (email, password) => {
  if (email === 'admin@example.com' || email === 'test@example.com') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            accessToken: 'mock_token',
            user: {
              id: email === 'admin@example.com' ? 999 : 1,
              username: email === 'admin@example.com' ? 'Admin' : 'Người dùng Test',
              email: email,
              role: email === 'admin@example.com' ? 'admin' : 'user'
            }
          }
        });
      }, 500);
    });
  }
  return api.post('/auth/login', { email, password });
};

export const register = (username, email, password) => api.post('/auth/register', { username, email, password });
export const getInfo = () => api.get('/user/profile').catch(() => ({ data: mockUsers[0] }));

// Movies
export const getTrendingMovies = () => api.get('/movie/trending').catch(() => ({ data: mockMovies }));
export const searchMovies = (query, page = 1) => api.get('/movie/search', { params: { query, page } }).catch(() => ({ data: { item: mockMovies, pagnition: { totalPages: 1 } } }));
export const getMovieDetail = (id) => api.get(`/movie/${id}`).catch(() => {
  const movie = mockMovies.find(m => m.id === parseInt(id));
  return movie ? { data: { ...movie, runtime: 128, genres: [{ id: 1, name: "Hành động" }] } } : Promise.reject('Not found');
});

export const filterMovies = (minRating, maxRating, genreIds, minReleaseYear, maxReleaseYear, sortBy, sortOrder) => 
  api.get('/movie/filter', { params: { minRating, maxRating, genreIds, minReleaseYear, maxReleaseYear, sortBy, sortOrder } });

// Reviews
export const getMovieReviews = (id, sortBy, sortOrder, page, limit) => 
  api.get(`/review/${id}`, { params: { sortBy, sortOrder, page, limit } }).catch(() => ({ data: { item: mockReviews.filter(r => r.movieId === parseInt(id)), pagnition: { totalPages: 1 } } }));

export const submitReview = (movieId, rating, content) => 
  api.post('/review/create', { movieId, rating, content }).catch(() => ({ data: { id: Date.now(), movieId, username: 'Guest', rating, content, created_at: new Date().toISOString() } }));

// Watchlist
export const getUserWatchlist = () => api.get('/watchlist/user').catch(() => ({ 
  data: { 
    items: [] 
  } 
}));
export const toggleWatchlist = (movieId) => api.post('/watchlist/toggle', { movieId }).catch(() => ({ data: { message: 'Success' } }));

// User Profile
export const updateUser = (username = null, avatar = null) => api.put('/user/update', { username, avatar }).catch(() => ({ data: { username, avatar } }));
export const changePassword = (oldPassword = null, newPassword = null) => api.put('/user/update', { oldPassword, newPassword }).catch(() => ({ data: { message: 'Success' } }));

// --- ADMIN FUNCTIONS (Restored) ---
export const getAdminStats = () => api.get('/admin/stats').catch(() => ({
  data: { totalUsers: mockUsers.length, totalMovies: mockMovies.length, totalReviews: mockReviews.length, negativeReviews: 1 }
}));
export const getAllUsers = () => api.get('/admin/users').catch(() => ({ data: mockUsers }));
export const toggleUserLock = (userId) => api.patch(`/admin/user/${userId}/toggle-lock`).catch(() => {
  mockUsers = mockUsers.map(u => u.id === userId ? { ...u, isLocked: !u.isLocked } : u);
  return { data: { message: 'Success' } };
});
export const getAllReviews = () => api.get('/admin/reviews').catch(() => ({ data: mockReviews }));
export const deleteReviewAdmin = (reviewId) => api.delete(`/admin/review/${reviewId}`).catch(() => {
  mockReviews = mockReviews.filter(r => r.id !== reviewId);
  return { data: { message: 'Success' } };
});

export default api;