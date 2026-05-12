import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { User, UserCircle, Edit2, Save, LogOut, Settings, List, Lock, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getInfo, getUserWatchlist, updateUser } from '../services/api';
import defaultUser from '../assets/user.png';
import MovieSection from '../components/MovieSection';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'watchlist', 'settings'
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [userResponse, watchlistResponse] = await Promise.all([
          getInfo(),
          getUserWatchlist()
        ]);

        if (userResponse && userResponse.data) {
          setUserData({
            userName: userResponse.data.username,
            email: userResponse.data.email,
            avatar: userResponse.data.avatar || defaultUser,
          });
        }

        if (watchlistResponse && watchlistResponse.data && watchlistResponse.data.items) {
          setWatchlist(watchlistResponse.data.items.map(item => ({
            id: item.id,
            title: item.title,
            poster: item.poster,
            rating: item.rating,
            releaseDate: item.releaseDate
          })));
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        // Handle error, maybe navigate to login if token is invalid
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, navigate]);

  console.log(watchlist)

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-black flex items-center justify-center text-white">
        <div className="text-xl tracking-widest">ĐANG TẢI...</div>
      </div>
    );
  }

  if (!isLoggedIn || !userData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const { userName, avatar } = userData;
      const response = await updateUser(userName, avatar);
      if (response && response.data) {
        setUserData(prev => ({
          ...prev,
          userName: response.data.username,
          avatar: response.data.avatar,
        }));
        alert('Đã cập nhật thông tin thành công!');
        setIsEditing(false);
      } else {
        throw new Error(response.message || 'Cập nhật thông tin thất bại.');
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi cập nhật thông tin.');
    }
  };

  const handleSaveSettings = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (!passwords.currentPassword || !passwords.newPassword) {
      alert('Vui lòng nhập đầy đủ mật khẩu hiện tại và mật khẩu mới.');
      return;
    }

    try {
      const response = await updateUser(null, null, passwords.currentPassword, passwords.newPassword);
      if (response && response.data) {
        alert('Đã cập nhật mật khẩu thành công!');
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        throw new Error(response.message || 'Cập nhật mật khẩu thất bại.');
      }
    } catch (error) {
      console.error("Failed to update password:", error);
      alert(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi đổi mật khẩu.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
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
                  <span>Tên người dùng</span>
                </label>
                {isEditing ? (
                  <input type="text" name="userName" value={userData.userName} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" />
                ) : (
                  <p className="text-lg font-medium px-4 py-3 bg-white/5 rounded-xl border border-transparent">{userData.userName}</p>
                )}
              </div>
            </div>
          </section>
        );

      case 'watchlist':
        return (
         <MovieSection title="Danh sách yêu thích" movies={watchlist} />
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
                <div className="flex items-center space-x-6">
                  <img src={userData.avatar} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover border-2 border-white/20" />
                  <div className="flex-grow">
                    <label className="text-gray-400 text-sm font-medium flex items-center space-x-2 mb-2">
                      <Camera className="w-4 h-4" />
                      <span>URL ảnh đại diện</span>
                    </label>
                    <input type="text" name="avatar" value={userData.avatar} onChange={handleChange} placeholder="Nhập đường dẫn URL ảnh mới..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all text-sm" />
                    <p className="text-xs text-gray-500 mt-2">Định dạng hỗ trợ: JPG, PNG, GIF. Kích thước tối đa 5MB (hiện tại chỉ hỗ trợ nhập URL).</p>
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
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-cinema-zinc/30 rounded-2xl p-8 border border-white/10 flex flex-col items-center">
              <div className="relative group">
                <img src={userData.avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-cinema-red shadow-2xl" />
              </div>
              <h2 className="mt-6 text-2xl font-bold tracking-tight">{userData.userName}</h2>
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
