import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="text-gray-400 hover:text-cinema-red transition-colors" title="Đăng xuất">
            <LogOut className="w-5 h-5" />
        </button>
    )
}

export default LogoutButton;