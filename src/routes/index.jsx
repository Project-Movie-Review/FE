import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import ProfilePage from '../pages/ProfilePage';
import MovieDetailPage from '../pages/MovieDetailPage';
// import AdminLayout from '../components/Admin/AdminLaout';
// import AdminDashboard from '../pages/admin/AdminDashboard';
// import AdminUsers from '../pages/admin/AdminUsers';
// import AdminReviews from '../pages/admin/AdminReviews';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/" element={<HomePage />} /> 
    </Routes>
  );
};

export default AppRoutes;