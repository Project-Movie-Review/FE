// import { useState, useEffect } from 'react';
// import { getAllReviews, deleteReviewAdmin } from '../../services/api';
// import { Trash2, MessageSquareOff, ThumbsUp, ThumbsDown, Minus, Filter } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const AdminReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all'); // 'all', 'positive', 'negative', 'neutral'

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const res = await getAllReviews();
//       setReviews(res.data);
//     } catch (error) {
//       console.error("Failed to fetch reviews", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (reviewId) => {
//     if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này không? (Hệ thống sẽ tự động tính lại điểm Rating của phim)')) {
//       try {
//         await deleteReviewAdmin(reviewId);
//         setReviews(reviews.filter(r => r.id !== reviewId));
//       } catch (error) {
//         alert('Lỗi khi xóa bình luận');
//       }
//     }
//   };

//   const getSentimentConfig = (sentiment) => {
//     switch(sentiment) {
//       case 'positive': return { color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: <ThumbsUp className="w-3 h-3 mr-1" />, label: 'Tích cực' };
//       case 'negative': return { color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: <ThumbsDown className="w-3 h-3 mr-1" />, label: 'Tiêu cực' };
//       default: return { color: 'bg-gray-500/10 text-gray-400 border-gray-500/20', icon: <Minus className="w-3 h-3 mr-1" />, label: 'Trung lập' };
//     }
//   };

//   const filteredReviews = filter === 'all' ? reviews : reviews.filter(r => r.sentiment === filter);

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h2 className="text-3xl font-bold text-white mb-2">Kiểm duyệt Đánh giá</h2>
//           <p className="text-gray-400">Giám sát và quản lý các bình luận từ cộng đồng.</p>
//         </div>
        
//         <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-lg border border-gray-700">
//           <Filter size={16} className="text-gray-400 ml-2" />
//           <select 
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="bg-transparent text-sm text-white focus:outline-none py-1 pr-4 pl-2 appearance-none cursor-pointer"
//           >
//             <option value="all" className="bg-gray-800">Tất cả nhãn</option>
//             <option value="negative" className="bg-gray-800 text-red-400">Chỉ Tiêu cực (Cần xử lý)</option>
//             <option value="positive" className="bg-gray-800 text-green-400">Tích cực</option>
//             <option value="neutral" className="bg-gray-800">Trung lập</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm text-gray-300">
//             <thead className="text-xs text-gray-400 uppercase bg-gray-900/50 border-b border-gray-700/50">
//               <tr>
//                 <th className="px-6 py-4 font-medium w-1/4">Người dùng & Phim</th>
//                 <th className="px-6 py-4 font-medium w-1/2">Nội dung đánh giá</th>
//                 <th className="px-6 py-4 font-medium">Cảm xúc (AI)</th>
//                 <th className="px-6 py-4 font-medium text-right">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Đang tải dữ liệu...</td>
//                 </tr>
//               ) : filteredReviews.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="px-6 py-12 text-center text-gray-500 flex flex-col items-center justify-center">
//                     <MessageSquareOff size={48} className="mb-3 opacity-20" />
//                     Không có bình luận nào phù hợp với bộ lọc
//                   </td>
//                 </tr>
//               ) : (
//                 <AnimatePresence>
//                   {filteredReviews.map((review) => {
//                    const sentiment = getSentimentConfig(review.sentiment);
//                     return (
//                       <motion.tr 
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0, x: -50, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
//                         key={review.id} 
//                         className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
//                       >
//                         <td className="px-6 py-4 align-top">
//                           <div className="font-semibold text-white">{review.username}</div>
//                           <div className="text-xs text-blue-400 mt-1">Phim ID: {review.movieId}</div>
//                           <div className="text-xs text-gray-500 mt-1">{review.created_at}</div>
//                         </td>
//                         <td className="px-6 py-4 align-top">
//                           <div className="flex items-center gap-2 mb-2">
//                             <span className="text-yellow-500 font-bold bg-yellow-500/10 px-2 py-0.5 rounded text-xs border border-yellow-500/20">
//                               {review.rating}/10 Sao
//                             </span>
//                           </div>
//                           <p className="text-gray-300 italic">"{review.comment}"</p>
//                         </td>
//                         <td className="px-6 py-4 align-top">
//                           <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${sentiment.color}`}>
//                             {sentiment.icon} {sentiment.label}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 align-top text-right">
//                           <button
//                             onClick={() => handleDelete(review.id)}
//                             className="p-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group"
//                             title="Xóa bình luận này"
//                           >
//                             <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
//                           </button>
//                         </td>
//                       </motion.tr>
//                     );
//                   })}
//                 </AnimatePresence>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminReviews;
