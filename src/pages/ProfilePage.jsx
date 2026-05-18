import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieSection from '../components/MovieSection';
import { getInfo, getUserWatchlist, updateUser, changePassword, toggleWatchlist } from '../services/api';
import defaultUser from '../assets/user.png';

// Sub-components
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileSettings from '../components/Profile/ProfileSettings';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [profileError, setProfileError] = useState('');
  const [settingsError, setSettingsError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isLoggedIn = !!localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isLoggedIn) { navigate('/login'); return; }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [userResponse, watchlistResponse] = await Promise.all([getInfo(), getUserWatchlist()]);

        if (userResponse?.data) {
          setUserData({
            userName: userResponse.data.username,
            email: userResponse.data.email,
            avatar: userResponse.data.avatar || defaultUser,
          });
        }

        if (watchlistResponse?.data?.items) {
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
        if (error.response?.status === 401 || error.response?.status === 403) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setProfileError('');
    setSuccessMessage('');
    try {
      const response = await updateUser(userData.userName, userData.avatar);
      if (response?.data) {
        setUserData(prev => ({ ...prev, userName: response.data.username, avatar: response.data.avatar }));
        localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), username: response.data.username, avatar: response.data.avatar }));
        setSuccessMessage('Đã cập nhật thông tin thành công!');
        setIsEditing(false);
        // keep localStorage updated then reload to refresh navbar and other global UI
        setTimeout(() => {
          setSuccessMessage('');
          try {
            navigate(0); // force reload to update navbar with new username/avatar
          } catch (e) {
            alert('Cập nhật thành công! Vui lòng tải lại trang để xem thay đổi.' + e.message); 
          }
        }, 800);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin.';
      setProfileError(errorMsg);
    }
  };

  const handleSaveSettings = async () => {
    setSettingsError('');
    setSuccessMessage('');
    if (!passwords.currentPassword || !passwords.newPassword) {
      setSettingsError('Vui lòng nhập đầy đủ mật khẩu.');
      return;
    }
    try {
      const response = await changePassword(passwords.currentPassword, passwords.newPassword);
      if (response?.data) {
        setSuccessMessage('Đã cập nhật mật khẩu thành công!');
        setPasswords({ currentPassword: '', newPassword: '' });
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu.';
      setSettingsError(errorMsg);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await toggleWatchlist(movieId);
      setWatchlist(prev => prev.filter(m => m.id !== movieId));
    } catch {
      setProfileError('Không thể xóa phim khỏi danh sách yêu thích.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileInfo 
            userData={userData} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
            onChange={handleChange} 
            onSave={handleSaveProfile}
            error={profileError}
            success={successMessage}
          />
        );
      case 'watchlist':
        return (
          <MovieSection 
            title="Danh sách yêu thích" 
            movies={watchlist} 
            onRemove={handleRemoveFromWatchlist} 
          />
        );
      case 'settings':
        return (
          <ProfileSettings 
            passwords={passwords} 
            onPasswordChange={handlePasswordChange} 
            onSave={handleSaveSettings}
            error={settingsError}
            success={successMessage}
          />
        );
      default: return null;
    }
  };

  if (loading) return <div className="min-h-screen bg-cinema-black flex items-center justify-center text-white">ĐANG TẢI...</div>;
  if (!isLoggedIn || !userData) return null;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="flex flex-col lg:flex-row gap-12">
          <ProfileSidebar 
            userData={userData} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onLogout={handleLogout} 
          />
          <main className="w-full lg:w-3/4">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
