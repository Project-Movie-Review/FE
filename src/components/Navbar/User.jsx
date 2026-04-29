import { useEffect, useState } from 'react';
import { getInfo } from '../../services/api';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        const fetchUser = async () => {
            try {
                const res = await getInfo();
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    return (
        <Link to="/profile" className="hidden md:flex items-center text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
            <User className="w-5 h-5 mr-2" />
            {user?.username || 'Tài khoản'}
        </Link>
    )
}

export default UserProfile;