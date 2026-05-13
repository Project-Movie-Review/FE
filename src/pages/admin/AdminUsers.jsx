// import React, { useState, useEffect } from 'react';
// import { getAllUsers, toggleUserLock } from '../../services/api';
// import { Lock, Unlock, Search, UserX } from 'lucide-react';
// import { motion } from 'framer-motion';

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await getAllUsers();
//       setUsers(res.data);
//     } catch (error) {
//       console.error("Failed to fetch users", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleLock = async (userId) => {
//     try {
//       await toggleUserLock(userId);
//       // Refresh local state to reflect changes instantly
//       setUsers(users.map(u => u.id === userId ? { ...u, isLocked: !u.isLocked } : u));
//     } catch (error) {
//       alert('Lỗi khi cập nhật trạng thái');
//     }
//   };

//   const filteredUsers = users.filter(u => 
//     u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     u.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h2 className="text-3xl font-bold text-white mb-2">Quản lý Người dùng</h2>
//           <p className="text-gray-400">Xem danh sách và quản lý trạng thái tài khoản.</p>
//         </div>
        
//         <div className="relative w-full md:w-64">
//           <input 
//             type="text" 
//             placeholder="Tìm kiếm username, email..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//           />
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//         </div>
//       </div>

//       <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm text-gray-300">
//             <thead className="text-xs text-gray-400 uppercase bg-gray-900/50 border-b border-gray-700/50">
//               <tr>
//                 <th className="px-6 py-4 font-medium">ID</th>
//                 <th className="px-6 py-4 font-medium">Người dùng</th>
//                 <th className="px-6 py-4 font-medium">Vai trò</th>
//                 <th className="px-6 py-4 font-medium">Ngày tham gia</th>
//                 <th className="px-6 py-4 font-medium">Trạng thái</th>
//                 <th className="px-6 py-4 font-medium text-right">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Đang tải dữ liệu...</td>
//                 </tr>
//               ) : filteredUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-8 text-center text-gray-500 flex flex-col items-center justify-center">
//                     <UserX size={48} className="mb-2 opacity-20" />
//                     Không tìm thấy người dùng nào
//                   </td>
//                 </tr>
//               ) : (
//                 filteredUsers.map((user, index) => (
//                   <motion.tr 
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     key={user.id} 
//                     className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
//                   >
//                     <td className="px-6 py-4">#{user.id}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex flex-col">
//                         <span className="font-semibold text-white">{user.username}</span>
//                         <span className="text-xs text-gray-500">{user.email}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
//                         user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700 text-gray-300'
//                       }`}>
//                         {user.role.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">{user.created_at}</td>
//                     <td className="px-6 py-4">
//                       {user.isLocked ? (
//                         <span className="flex items-center text-red-400 text-xs font-medium">
//                           <Lock size={14} className="mr-1" /> Đã Khóa
//                         </span>
//                       ) : (
//                         <span className="flex items-center text-emerald-400 text-xs font-medium">
//                           <Unlock size={14} className="mr-1" /> Hoạt động
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       {user.role !== 'admin' && (
//                         <button
//                           onClick={() => handleToggleLock(user.id)}
//                           className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
//                             user.isLocked 
//                               ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20' 
//                               : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
//                           }`}
//                         >
//                           {user.isLocked ? 'Mở Khóa' : 'Khóa TK'}
//                         </button>
//                       )}
//                     </td>
//                   </motion.tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;
