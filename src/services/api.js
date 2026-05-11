import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6700/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token') || localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to simplify response data like in 'new' branch
api.interceptors.response.use(
  (response) => response.data || response,
  (error) => Promise.reject(error)
);

// --- MOCK DATA ---
const mockMovies = [
  { 
    id: 1, 
    title: "Deadpool & Wolverine", 
    poster_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop", 
    backdrop_path: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1920&auto=format&fit=crop", 
    vote_average: 7.8, 
    release_date: "2024-07-24", 
    overview: "Lịch sử của MCU sẽ thay đổi mãi mãi khi Wade Wilson gặp Logan." 
  },
  { 
    id: 2, 
    title: "Inside Out 2", 
    poster_path: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop", 
    backdrop_path: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1920&auto=format&fit=crop", 
    vote_average: 7.7, 
    release_date: "2024-06-12", 
    overview: "Những cảm xúc mới xuất hiện trong tâm trí của Riley khi cô bước vào tuổi dậy thì." 
  },
  { 
    id: 3, 
    title: "Despicable Me 4", 
    poster_path: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=500&auto=format&fit=crop", 
    backdrop_path: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1920&auto=format&fit=crop", 
    vote_average: 7.2, 
    release_date: "2024-06-20", 
    overview: "Gru và gia đình chào đón thành viên mới, Gru Jr., người luôn muốn hành hạ cha mình." 
  },
  { 
    id: 4, 
    title: "Alien: Romulus", 
    poster_path: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=500&auto=format&fit=crop", 
    backdrop_path: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1920&auto=format&fit=crop", 
    vote_average: 7.3, 
    release_date: "2024-08-14", 
    overview: "Một nhóm người trẻ tuổi khám phá một trạm vũ trụ bị bỏ hoang và đối mặt với nỗi kinh hoàng." 
  },
  { 
    id: 5, 
    title: "Kingdom of the Planet of the Apes", 
    poster_path: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=500&auto=format&fit=crop", 
    backdrop_path: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1920&auto=format&fit=crop", 
    vote_average: 6.9, 
    release_date: "2024-05-08", 
    overview: "Nhiều năm sau thời đại của Caesar, một thủ lĩnh khỉ mới bắt đầu xây dựng đế chế của mình." 
  }
];

let mockUsers = [
  { id: 1, username: 'Người dùng Test', email: 'test@example.com', role: 'user', isLocked: false, created_at: '2024-01-15' },
  { id: 2, username: 'JohnDoe', email: 'john@example.com', role: 'user', isLocked: false, created_at: '2024-02-20' },
  { id: 3, username: 'Spammer123', email: 'spam@example.com', role: 'user', isLocked: true, created_at: '2024-03-01' },
];

let mockReviews = [
  { id: 1, movieId: 1, username: 'JohnDoe', rating: 9, comment: 'Phim cực kỳ tuyệt vời, hành động mãn nhãn!', sentiment: 'positive', created_at: '2024-05-11' },
  { id: 2, movieId: 1, username: 'JaneSmith', rating: 4, comment: 'Nội dung hơi nhàm chán, không như kỳ vọng.', sentiment: 'negative', created_at: '2024-05-10' },
  { id: 3, movieId: 1, username: 'MovieFan99', rating: 7, comment: 'Xem giải trí khá ổn, nhưng kịch bản dễ đoán.', sentiment: 'neutral', created_at: '2024-05-09' },
  { id: 4, movieId: 2, username: 'AnnaTran', rating: 10, comment: 'Tuyệt tác của Pixar! Rất cảm động.', sentiment: 'positive', created_at: '2024-05-11' },
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
export const getInfo = () => api.get('/user/profile');

// Movies
export const getTrendingMovies = () => {
  return api.get('/movie/trending').catch(() => ({ data: mockMovies }));
};

export const searchMovies = (query, page = 1) => api.get('/movie/search', { params: { query, page } });

export const filterMovies = (minRating, maxRating, genreIds, minReleaseYear, maxReleaseYear, sortBy, sortOrder) => api.get('/movie/filter', { params: { minRating, maxRating, genreIds, minReleaseYear, maxReleaseYear, sortBy, sortOrder } });

export const getMovieById = (id) => {
  return api.get(`/movie/${id}`).catch(() => {
    const movie = mockMovies.find(m => m.id === parseInt(id));
    return movie ? { data: { ...movie, runtime: 128, genres: [{ id: 1, name: "Hành động" }] } } : Promise.reject('Not found');
  });
};

export const getMovieReviews = (movieId) => {
  return api.get(`/movie/${movieId}/reviews`).catch(() => ({ data: mockReviews.filter(r => r.movieId === parseInt(movieId)) }));
};

export const submitReview = (movieId, rating, comment) => {
  let sentiment = 'neutral';
  const c = comment.toLowerCase();
  if (c.includes('tuyệt') || c.includes('hay') || c.includes('đỉnh')) sentiment = 'positive';
  else if (c.includes('tệ') || c.includes('dở') || c.includes('chán')) sentiment = 'negative';

  return api.post(`/movie/${movieId}/review`, { rating, comment }).catch(() => {
    const newReview = { id: Date.now(), movieId: parseInt(movieId), username: 'Guest', rating, comment, sentiment, created_at: new Date().toISOString() };
    mockReviews.push(newReview);
    return { data: newReview };
  });
};

// Admin
export const getAdminStats = () => api.get('/admin/stats').catch(() => ({
  data: { totalUsers: mockUsers.length, totalMovies: mockMovies.length, totalReviews: mockReviews.length, negativeReviews: 1 }
}));

export const getAllUsers = () => api.get('/admin/users').catch(() => ({ data: mockUsers }));

export const toggleUserLock = (userId) => api.patch(`/admin/user/${userId}/toggle-lock`).catch(() => {
  mockUsers = mockUsers.map(u => u.id === userId ? { ...u, isLocked: !u.isLocked } : u);
  return { data: { message: 'Success' } };
});

export const deleteReviewAdmin = (reviewId) => api.delete(`/admin/review/${reviewId}`).catch(() => {
  mockReviews = mockReviews.filter(r => r.id !== reviewId);
  return { data: { message: 'Success' } };
});

export default api;
