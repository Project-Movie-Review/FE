import { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/api';
import { Trash2, Search, UserX } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchUsers = async (currentPage = 1, search = '') => {
    try {
      setLoading(true);
      const res = await getAllUsers(search || undefined, undefined, undefined, currentPage, 10);
      setUsers(res.data.items || []);
      setPagination(res.data.paginationMeta || {});
    } catch (error) {
      console.error("Failed to fetch users", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  fetchUsers();
  }, []);

  

  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        // await deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
        alert('Xóa người dùng thành công!');
      } catch (error) {
        alert('Lỗi khi xóa người dùng: ' + error.message);
      }
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const filteredUsers = users;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Quản lý Người dùng</h2>
          <p className="text-gray-400">Tổng: {pagination.totalItems} người dùng</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Tìm kiếm username, email..." 
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-900/50 border-b border-gray-700/50">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Người dùng</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Vai trò</th>
                <th className="px-6 py-4 font-medium">Ngày tham gia</th>
                <th className="px-6 py-4 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Đang tải dữ liệu...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <UserX size={48} className="mb-2 opacity-20" />
                      Không tìm thấy người dùng nào
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={user.id} 
                    className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-white">#{user.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="font-semibold text-white">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700 text-gray-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{user.createdAt}</td>
                    <td className="px-6 py-4 text-right">
                      {user.role !== 'ADMIN' && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-3 py-2 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
                        >
                          <Trash2 size={14} className="inline mr-1" />
                          Xóa
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex justify-between items-center">
          <p className="text-gray-400 text-sm">
            Trang {pagination.currentPage} / {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Trước
            </button>
            <button
              onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
              disabled={page === pagination.totalPages}
              className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
