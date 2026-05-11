import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  },
  { 
    id: 6, 
    title: "Bad Boys: Ride or Die", 
    poster_path: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=500&auto=format&fit=crop", 
    backdrop_path: "/3S4p9p9p9p9p9p9p9p9p9p.jpg", 
    vote_average: 7.6, 
    release_date: "2024-06-05", 
    overview: "Mike Lowrey và Marcus Burnett trở lại cho một chuyến đi cuối cùng." 
  },
  { 
    id: 7, 
    title: "The Garfield Movie", 
    poster_path: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=500&auto=format&fit=crop", 
    backdrop_path: "/9p_p_p_p_p_p_p_p_p_p_p.jpg", 
    vote_average: 7.1, 
    release_date: "2024-04-30", 
    overview: "Garfield có một cuộc phiêu lưu ngoài trời đầy bất ngờ." 
  },
  { 
    id: 8, 
    title: "Dune: Part Two", 
    poster_path: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=500&auto=format&fit=crop", 
    backdrop_path: "/8p_p_p_p_p_p_p_p_p_p_p.jpg", 
    vote_average: 8.2, 
    release_date: "2024-02-27", 
    overview: "Paul Atreides gia nhập Chani và người Fremen khi đang thực hiện hành trình báo thù." 
  },
  { 
    id: 9, 
    title: "Kung Fu Panda 4", 
    poster_path: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop", 
    backdrop_path: "/kufp4bg.jpg", 
    vote_average: 7.1, 
    release_date: "2024-03-02", 
    overview: "Po chuẩn bị trở thành Thủ lĩnh tinh thần của Thung lũng Hòa bình." 
  },
  { 
    id: 10, 
    title: "A Quiet Place: Day One", 
    poster_path: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=500&auto=format&fit=crop", 
    backdrop_path: "/aqpbg.jpg", 
    vote_average: 6.8, 
    release_date: "2024-06-26", 
    overview: "Trải nghiệm ngày mà thế giới im lặng." 
  },
  { id: 11, title: "Oppenheimer", poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop", vote_average: 8.1, release_date: "2023-07-19" },
  { id: 12, title: "Spider-Man: Across the Spider-Verse", poster_path: "https://images.unsplash.com/photo-1501432377862-3d0432b87a14?q=80&w=500&auto=format&fit=crop", vote_average: 8.4, release_date: "2023-05-31" },
  { id: 13, title: "The Dark Knight", poster_path: "https://images.unsplash.com/photo-1524685324707-1baf47eb8c6c?q=80&w=500&auto=format&fit=crop", vote_average: 8.5, release_date: "2008-07-16" },
  { id: 14, title: "Interstellar", poster_path: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=500&auto=format&fit=crop", vote_average: 8.4, release_date: "2014-11-05" },
  { id: 15, title: "Inception", poster_path: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&auto=format&fit=crop", vote_average: 8.3, release_date: "2010-07-15" },
  { id: 16, title: "The Shawshank Redemption", poster_path: "https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?q=80&w=500&auto=format&fit=crop", vote_average: 8.7, release_date: "1994-09-23" },
  { id: 17, title: "The Godfather", poster_path: "https://images.unsplash.com/photo-1520004434532-668416a08753?q=80&w=500&auto=format&fit=crop", vote_average: 8.7, release_date: "1972-03-14" },
  { id: 18, title: "Pulp Fiction", poster_path: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?q=80&w=500&auto=format&fit=crop", vote_average: 8.5, release_date: "1994-09-10" },
  { id: 19, title: "Forrest Gump", poster_path: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop", vote_average: 8.5, release_date: "1994-06-23" },
  { id: 20, title: "The Matrix", poster_path: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=500&auto=format&fit=crop", vote_average: 8.2, release_date: "1999-03-30" }
];

export const login = (email, password) => {
  // Simulate network delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === '123456') {
        resolve({
          data: {
            access_token: 'mock_admin_token_123456',
            user: {
              id: 999,
              username: 'Admin',
              email: 'admin@example.com',
              role: 'admin',
              avatar: '' 
            }
          }
        });
      } else if (email === 'test@example.com' && password === '123456') {
        resolve({
          data: {
            access_token: 'mock_jwt_token_123456',
            user: {
              id: 1,
              username: 'Người dùng Test',
              email: 'test@example.com',
              role: 'user',
              avatar: '' // Empty so it triggers the FB default avatar in Profile
            }
          }
        });
      } else {
        reject({
          response: {
            data: {
              message: 'Tài khoản hoặc mật khẩu không chính xác'
            }
          }
        });
      }
    }, 500);
  });
};

// --- MOCK DATA CHO ADMIN ---

let mockUsers = [
  { id: 1, username: 'Người dùng Test', email: 'test@example.com', role: 'user', isLocked: false, created_at: '2024-01-15' },
  { id: 2, username: 'JohnDoe', email: 'john@example.com', role: 'user', isLocked: false, created_at: '2024-02-20' },
  { id: 3, username: 'Spammer123', email: 'spam@example.com', role: 'user', isLocked: true, created_at: '2024-03-01' },
];

export const getAdminStats = () => {
  return Promise.resolve({
    data: {
      totalUsers: mockUsers.length,
      totalMovies: mockMovies.length,
      totalReviews: mockReviews.length,
      negativeReviews: mockReviews.filter(r => r.sentiment === 'negative').length
    }
  });
};

export const getAllUsers = () => {
  return Promise.resolve({ data: mockUsers });
};

export const toggleUserLock = (userId) => {
  mockUsers = mockUsers.map(user => 
    user.id === userId ? { ...user, isLocked: !user.isLocked } : user
  );
  return Promise.resolve({ data: { message: 'Cập nhật trạng thái thành công' } });
};

export const getAllReviews = () => {
  return Promise.resolve({ data: mockReviews });
};

export const deleteReviewAdmin = (reviewId) => {
  mockReviews = mockReviews.filter(r => r.id !== reviewId);
  return Promise.resolve({ data: { message: 'Đã xóa bình luận thành công' } });
};

export const register = (username, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 201, data: { message: 'Đăng ký thành công' } });
    }, 500);
  });
};

export const getTrendingMovies = () => {
  return Promise.resolve({ data: mockMovies });
};

export const searchMovies = (query) => {
  const filtered = mockMovies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
  return Promise.resolve({ data: { results: filtered } });
};

// --- MOCK DATA CHO MOVIE DETAIL ---

// Mock Reviews State (in-memory)
let mockReviews = [
  { id: 1, movieId: 1, username: 'JohnDoe', rating: 9, comment: 'Phim cực kỳ tuyệt vời, hành động mãn nhãn!', sentiment: 'positive', created_at: '2024-05-11' },
  { id: 2, movieId: 1, username: 'JaneSmith', rating: 4, comment: 'Nội dung hơi nhàm chán, không như kỳ vọng.', sentiment: 'negative', created_at: '2024-05-10' },
  { id: 3, movieId: 1, username: 'MovieFan99', rating: 7, comment: 'Xem giải trí khá ổn, nhưng kịch bản dễ đoán.', sentiment: 'neutral', created_at: '2024-05-09' },
  { id: 4, movieId: 2, username: 'AnnaTran', rating: 10, comment: 'Tuyệt tác của Pixar! Rất cảm động.', sentiment: 'positive', created_at: '2024-05-11' },
];

export const getMovieById = (id) => {
  const movie = mockMovies.find(m => m.id === parseInt(id));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (movie) {
        resolve({ data: { ...movie, runtime: 128, genres: [{ id: 1, name: "Hành động" }, { id: 2, name: "Phiêu lưu" }] } });
      } else {
        reject({ response: { status: 404, data: { message: 'Không tìm thấy phim' } } });
      }
    }, 300);
  });
};

export const getMovieReviews = (movieId) => {
  const reviews = mockReviews.filter(r => r.movieId === parseInt(movieId));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: reviews });
    }, 300);
  });
};

export const submitReview = (movieId, rating, comment) => {
  // Giả lập AI Phân tích Cảm xúc (Sentiment Analysis)
  let sentiment = 'neutral';
  const c = comment.toLowerCase();
  
  if (c.includes('tuyệt') || c.includes('hay') || c.includes('đỉnh') || c.includes('xuất sắc') || c.includes('đẹp')) {
    sentiment = 'positive';
  } else if (c.includes('tệ') || c.includes('dở') || c.includes('chán') || c.includes('thất vọng') || c.includes('rác')) {
    sentiment = 'negative';
  }

  const newReview = {
    id: Date.now(),
    movieId: parseInt(movieId),
    username: JSON.parse(localStorage.getItem('user'))?.username || 'Guest',
    rating: parseInt(rating),
    comment: comment,
    sentiment: sentiment,
    created_at: new Date().toISOString().split('T')[0]
  };

  mockReviews = [newReview, ...mockReviews];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: newReview });
    }, 500);
  });
};