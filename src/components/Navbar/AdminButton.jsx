import { useNavigate } from "react-router-dom";

const AdminButton = () => {
    const navigate = useNavigate();
    const role = JSON.parse(localStorage.getItem('user') || '{}').role;

    if (role !== 'ADMIN') return null;

    return (
        <button onClick={() => navigate('/admin/dashboard')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-900/20">
            Về trang admin
        </button>
    );
}
export default AdminButton;