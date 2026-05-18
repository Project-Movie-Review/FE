import { useEffect, useState } from 'react';
import { getInfo } from '../../services/api';
import { Link } from 'react-router-dom';
import { resolveAvatarUrl } from '../../helpers/resolveAvatar';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    const avatarUrl = resolveAvatarUrl(user?.avatar);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        const fetchUser = async () => {
            try {
                const res = await getInfo();
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    return (
        <Link to="/profile" className="hidden md:flex items-center text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
            <img src={avatarUrl} alt="Avatar" className="w-10 h-10 mr-2 rounded-full" />
            {user?.username || 'Khách'}
        </Link>
    )
}

export default UserProfile;