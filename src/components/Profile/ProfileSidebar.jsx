import { UserCircle, List, Settings, LogOut } from 'lucide-react';
import { resolveAvatarUrl } from '../../helpers/resolveAvatar';

const ProfileSidebar = ({ userData, activeTab, setActiveTab, onLogout }) => {
  return (
    <aside className="w-full lg:w-1/4">
      <div className="bg-cinema-zinc/30 rounded-2xl p-8 border border-white/10 flex flex-col items-center">
        <div className="relative group">
          <img 
            src={resolveAvatarUrl(userData.avatar)}
            alt="Avatar" 
            className="w-32 h-32 rounded-full object-cover border-4 border-cinema-red shadow-2xl" 
          />
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">{userData.userName}</h2>
        <p className="text-gray-400 text-sm mt-1">{userData.email}</p>

        <nav className="w-full mt-10 space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all ${
              activeTab === 'profile' 
                ? 'bg-cinema-red/10 text-cinema-red font-semibold border border-cinema-red/20' 
                : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            <UserCircle className="w-5 h-5" />
            <span>Hồ sơ cá nhân</span>
          </button>
          
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all ${
              activeTab === 'watchlist' 
                ? 'bg-cinema-red/10 text-cinema-red font-semibold border border-cinema-red/20' 
                : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            <List className="w-5 h-5" />
            <span>Danh sách yêu thích</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all ${
              activeTab === 'settings' 
                ? 'bg-cinema-red/10 text-cinema-red font-semibold border border-cinema-red/20' 
                : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Cài đặt</span>
          </button>
          
          <button 
            onClick={onLogout} 
            className="w-full flex items-center space-x-4 px-6 py-4 rounded-xl hover:bg-cinema-red/10 text-red-500 transition-all mt-8 border border-transparent"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
