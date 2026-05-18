import defaultUser from '../assets/user.png';

export const IMAGE_BASE_URL = 'https://be-7bv6.onrender.com/api/v1/image/';

export const resolveAvatarUrl = (value: any) => {
  if (!value) return defaultUser;
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('data:')) {
    return value;
  }
  return `${IMAGE_BASE_URL}${value}`;
};