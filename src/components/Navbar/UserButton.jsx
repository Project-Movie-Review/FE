import { LogOut, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserButton = () => {
    const navigate = useNavigate()

    const handleButton = () => {
        if(localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        } 
        navigate('/login');
    };

    let className = "flex items-center gap-2 bg-cinema-red text-white hover:bg-cinema-red/80 transition-colors cursor-pointer px-4 py-2 rounded-lg font-medium";

    return (
        localStorage.getItem('accessToken') ? (
            <button onClick={handleButton} className={className} title="Đăng xuất">
                <LogOut className="w-5 h-5" /> Đăng xuất
            </button>) : (
            <button onClick={handleButton} className={className} title="Đăng nhập">
                <LogIn className="w-5 h-5 rotate-180" /> Đăng nhập
            </button>
        )
    )
}

export default UserButton;