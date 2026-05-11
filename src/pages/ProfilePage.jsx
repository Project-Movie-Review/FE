import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/index';
import { User, Mail, Phone, Calendar, UserCircle, Edit2, Save, LogOut, Settings, List, Lock, Camera, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'watchlist', 'settings'
  const [isEditing, setIsEditing] = useState(false);
  
  // Get logged-in user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!localStorage.getItem('access_token');

  const [userData, setUserData] = useState({
    fullName: storedUser.username || 'Khách',
    email: storedUser.email || 'khach@example.com',
    phoneNumber: 'Chưa cập nhật',
    dob: 'Chưa cập nhật',
    gender: 'Chưa rõ',
    avatar: storedUser.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const [watchlist, setWatchlist] = useState([
    { id: 1, title: "Deadpool & Wolverine", poster_path: "/8cdcl36ZfBEXI0U63e6p6tz8p8Y.jpg", vote_average: 7.8, date_added: "2024-05-11" },
    { id: 2, title: "Inside Out 2", poster_path: "/vpnVM9B6NMmQpWeZno4KEoM0YyW.jpg", vote_average: 7.7, date_added: "2024-05-10" },
    { id: 3, title: "Despicable Me 4", poster_path: "/wWba3TaojhK7NdyS0STJ0X0CZ3d.jpg", vote_average: 7.2, date_added: "2024-05-09" },
    { id: 4, title: "Alien: Romulus", poster_path: "/b33mKnaS4GakccS6LScyuCkd0p2.jpg", vote_average: 7.3, date_added: "2024-05-08" },
    { id: 5, title: "Dune: Part Two", poster_path: "/8GxvB0szLZ16RiqIceT7YgpSTZq.jpg", vote_average: 8.2, date_added: "2024-05-07" },
  ]);

  if (!isLoggedIn) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Đã cập nhật thông tin thành công!');
  };

  const handleSaveSettings = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    alert('Đã cập nhật mật khẩu và cài đặt thành công!');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleRemoveWatchlist = (id) => {
    setWatchlist(watchlist.filter(movie => movie.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <section className="bg-cinema-zinc/30 rounded-2xl p-8 border border-white/10 shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold flex items-center space-x-3">
                <span className="w-2 h-8 bg-cinema-red rounded-full mr-4"></span>
                Hồ sơ cá nhân
              </h2>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all border border-white/10">
                  <Edit2 className="w-4 h-4 text-cinema-red" />
                  <span>Chỉnh sửa</span>
                </button>
              ) : (
                <button onClick={handleSaveProfile} className="flex items-center space-x-2 bg-cinema-red hover:bg-red-700 px-6 py-2 rounded-lg transition-all shadow-lg">
                  <Save className="w-4 h-4" />
                  <span>Lưu thay đổi</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Họ và tên</span>
                </label>
                {isEditing ? (
                  <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" />
                ) : (
                  <p className="text-lg font-medium px-4 py-3 bg-white/5 rounded-xl border border-transparent">{userData.fullName}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </label>
                {isEditing ? (
                  <input type="email" name="email" value={userData.email} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" />
                ) : (
                  <p className="text-lg font-medium px-4 py-3 bg-white/5 rounded-xl border border-transparent">{userData.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Số điện thoại</span>
                </label>
                {isEditing ? (
                  <input type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" />
                ) : (
                  <p className="text-lg font-medium px-4 py-3 bg-white/5 rounded-xl border border-transparent">{userData.phoneNumber}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Ngày sinh</span>
                </label>
                {isEditing ? (
                  <input type="date" name="dob" value={userData.dob} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" />
                ) : (
                  <p className="text-lg font-medium px-4 py-3 bg-white/5 rounded-xl border border-transparent">{userData.dob}</p>
                )}
              </div>
            </div>
          </section>
        );

      case 'watchlist':
        return (
          <section className="bg-cinema-zinc/30 rounded-2xl p-8 border border-white/10 shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold flex items-center space-x-3">
                <span className="w-2 h-8 bg-cinema-red rounded-full mr-4"></span>
                Danh sách yêu thích
              </h2>
              <span className="text-gray-400 font-medium">{watchlist.length} phim đã lưu</span>
            </div>

            {watchlist.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <List className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl">Danh sách của bạn đang trống.</p>
                <button onClick={() => navigate('/')} className="mt-4 text-cinema-red hover:underline">Khám phá phim ngay</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {watchlist.map(movie => (
                  <div key={movie.id} className="group relative rounded-xl overflow-hidden border border-white/5 transition-transform hover:scale-105 bg-black/50">
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover transition-opacity group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-end">
                        <button onClick={() => handleRemoveWatchlist(movie.id)} className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm transition-colors" title="Xóa khỏi danh sách">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="bg-gradient-to-t from-black via-black/80 to-transparent -mx-4 -mb-4 p-4 pt-12">
                        <p className="text-sm font-semibold truncate text-white">{movie.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-yellow-500 font-bold">★ {movie.vote_average}</p>
                          <p className="text-[10px] text-gray-400">Đã lưu: {movie.date_added}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );

      case 'settings':
        return (
          <section className="bg-cinema-zinc/30 rounded-2xl p-8 border border-white/10 shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold flex items-center space-x-3">
                <span className="w-2 h-8 bg-cinema-red rounded-full mr-4"></span>
                Cài đặt tài khoản
              </h2>
              <button onClick={handleSaveSettings} className="flex items-center space-x-2 bg-cinema-red hover:bg-red-700 px-6 py-2 rounded-lg transition-all shadow-lg">
                <Save className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </button>
            </div>

            <div className="space-y-12">
              {/* Avatar Update Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Đổi ảnh đại diện</h3>
                <div className="flex items-center space-x-6 bg-black/20 p-6 rounded-xl border border-white/5">
                  <div className="relative group">
                    <img src={userData.avatar} alt="Current Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-cinema-red" />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <input type="text" name="avatar" value={userData.avatar} onChange={handleChange} placeholder="Nhập đường dẫn URL ảnh mới..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all text-sm" />
                    <p className="text-xs text-gray-500 mt-2">Định dạng hỗ trợ: JPG, PNG, GIF. Kích thước tối đa 5MB (hiện tại chỉ hỗ trợ nhập URL URL).</p>
                  </div>
                </div>
              </div>

              {/* Password Change Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Đổi mật khẩu</h3>
                <div className="space-y-4 max-w-lg">
                  <div className="space-y-2">
                    <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Mật khẩu hiện tại</span>
                    </label>
                    <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-cinema-red" />
                      <span>Mật khẩu mới</span>
                    </label>
                    <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-cinema-red" />
                      <span>Xác nhận mật khẩu mới</span>
                    </label>
                    <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cinema-black text-white font-sans">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-cinema-zinc/30 rounded-2xl p-8 border border-white/10 flex flex-col items-center">
              <div className="relative group">
                <img src={userData.avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-cinema-red shadow-2xl" />
              </div>
              <h2 className="mt-6 text-2xl font-bold tracking-tight">{userData.fullName}</h2>
              <p className="text-gray-400 text-sm mt-1">{userData.email}</p>
              
              <nav className="w-full mt-10 space-y-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-cinema-red/10 text-cinema-red font-semibold border border-cinema-red/20' : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'}`}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Hồ sơ cá nhân</span>
                </button>
                <button 
                  onClick={() => setActiveTab('watchlist')}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'watchlist' ? 'bg-cinema-red/10 text-cinema-red font-semibold border border-cinema-red/20' : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'}`}
                >
                  <List className="w-5 h-5" />
                  <span>Danh sách yêu thích</span>
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-cinema-red/10 text-cinema-red font-semibold border border-cinema-red/20' : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'}`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Cài đặt</span>
                </button>
                <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-6 py-4 rounded-xl hover:bg-cinema-red/10 text-red-500 transition-all mt-8 border border-transparent">
                  <LogOut className="w-5 h-5" />
                  <span>Đăng xuất</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="w-full lg:w-3/4">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
