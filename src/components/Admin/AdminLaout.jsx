import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, LogOut, Home } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Simple Role Guard
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-cinema-black flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold text-cinema-red mb-4">Truy cập bị từ chối</h1>
        <p className="text-gray-400 mb-6">Bạn không có quyền truy cập khu vực Quản trị viên.</p>
        <button onClick={() => navigate('/')} className="bg-cinema-zinc px-6 py-2 rounded-full hover:bg-white/10 transition">
          Về Trang chủ
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Quản lý Người dùng' },
    { path: '/admin/reviews', icon: <MessageSquare size={20} />, label: 'Kiểm duyệt Đánh giá' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            ADMIN PANEL
          </h2>
          <p className="text-xs text-gray-500 mt-1">FilmReview Management</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Home size={20} />
            <span className="font-medium">Xem Trang chủ</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-10 flex items-center px-8 justify-between">
          <h1 className="text-lg font-semibold text-gray-300">Hệ thống Quản trị FilmReview</h1>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-white">{user.username}</p>
              <p className="text-xs text-blue-400">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
              {user.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;