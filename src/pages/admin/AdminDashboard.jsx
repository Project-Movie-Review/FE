// import { useState, useEffect } from 'react';
// // import { getAdminStats } from '../../services/api';
// import { Users, Film, MessageSquare, AlertTriangle, TrendingUp } from 'lucide-react';
// import { motion } from 'framer-motion';

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         // const res = await getAdminStats();
//         // setStats(res.data);
//       } catch (error) {
//         console.error("Failed to fetch stats", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   if (loading) {
//     return <div className="animate-pulse flex items-center justify-center h-64 text-blue-400">Đang tải dữ liệu...</div>;
//   }

//   const statCards = [
//     { title: 'Tổng Người Dùng', value: stats?.totalUsers || 0, icon: <Users size={24} className="text-blue-400" />, bg: 'from-blue-500/10 to-blue-500/5', border: 'border-blue-500/20' },
//     { title: 'Tổng Phim', value: stats?.totalMovies || 0, icon: <Film size={24} className="text-purple-400" />, bg: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/20' },
//     { title: 'Tổng Đánh Giá', value: stats?.totalReviews || 0, icon: <MessageSquare size={24} className="text-emerald-400" />, bg: 'from-emerald-500/10 to-emerald-500/5', border: 'border-emerald-500/20' },
//     { title: 'Đánh Giá Tiêu Cực', value: stats?.negativeReviews || 0, icon: <AlertTriangle size={24} className="text-red-400" />, bg: 'from-red-500/10 to-red-500/5', border: 'border-red-500/20', alert: true },
//   ];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold text-white mb-2">Tổng quan hệ thống</h2>
//         <p className="text-gray-400">Theo dõi các chỉ số hoạt động chính của FilmReview.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {statCards.map((card, idx) => (
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.1 }}
//             key={idx} 
//             className={`p-6 rounded-2xl bg-gradient-to-br ${card.bg} border ${card.border} relative overflow-hidden`}
//           >
//             <div className="flex justify-between items-start mb-4">
//               <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800">
//                 {card.icon}
//               </div>
//               {card.alert && card.value > 0 && (
//                 <span className="flex h-3 w-3 relative">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//                 </span>
//               )}
//             </div>
//             <div>
//               <h3 className="text-gray-400 font-medium text-sm mb-1">{card.title}</h3>
//               <p className="text-3xl font-bold text-white">{card.value}</p>
//             </div>
            
//             {/* Decorative background element */}
//             <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none transform scale-150">
//               {card.icon}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//         <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-bold text-white flex items-center gap-2">
//               <TrendingUp className="text-blue-400" size={20} /> Hoạt động gần đây
//             </h3>
//           </div>
//           <div className="space-y-4">
//             <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/30 transition-colors">
//               <div className="w-2 h-2 rounded-full bg-blue-400"></div>
//               <p className="text-sm text-gray-300 flex-1">Người dùng <span className="font-bold text-white">JohnDoe</span> vừa đăng ký tài khoản mới.</p>
//               <span className="text-xs text-gray-500">5 phút trước</span>
//             </div>
//             <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/30 transition-colors">
//               <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
//               <p className="text-sm text-gray-300 flex-1">Phim <span className="font-bold text-white">Deadpool & Wolverine</span> nhận được đánh giá mới (9/10).</p>
//               <span className="text-xs text-gray-500">12 phút trước</span>
//             </div>
//             <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/30 transition-colors bg-red-500/5 border border-red-500/10">
//               <div className="w-2 h-2 rounded-full bg-red-400"></div>
//               <p className="text-sm text-gray-300 flex-1">Phát hiện bình luận tiêu cực trong <span className="font-bold text-white">Inside Out 2</span>.</p>
//               <span className="text-xs text-red-400">1 giờ trước</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
//           <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
//             <Film className="text-blue-400" size={32} />
//           </div>
//           <h3 className="text-xl font-bold text-white mb-2">Hệ thống đang hoạt động ổn định</h3>
//           <p className="text-gray-400 max-w-sm">
//             Tất cả các dịch vụ (Database, API, AI Sentiment Analysis) đều đang trong trạng thái xanh.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;