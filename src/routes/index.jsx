import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import ProfilePage from '../pages/ProfilePage';
import MovieDetailPage from '../pages/MovieDetailPage';

// Admin Components
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminReviews from '../pages/admin/AdminReviews';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public/User Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/" element={<HomePage />} /> 

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="reviews" element={<AdminReviews />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;