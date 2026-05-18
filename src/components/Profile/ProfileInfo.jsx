import { useState, useRef } from 'react';
import { User, Camera, Edit2, Save, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { uploadImage } from '../../services/api';
import { IMAGE_BASE_URL, resolveAvatarUrl } from '../../helpers/resolveAvatar';

const ProfileInfo = ({ userData, isEditing, setIsEditing, onChange, onSave, error, success }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [localAvatarUrl, setLocalAvatarUrl] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setIsUploading(true);

    try {
      console.log('Starting image upload', file);
      const uploadResponse = await uploadImage(file);
      console.log('Upload response:', uploadResponse);

      // normalize different possible response shapes
      let imagePath;
      try {
        let parsed = uploadResponse;
        if (!parsed && typeof uploadResponse === 'string') {
          parsed = JSON.parse(uploadResponse);
        }
        // common shapes: { images: [...] } or { data: { images: [...] } }
        imagePath = parsed?.images?.[0] || parsed?.data?.images?.[0];
      } catch (e) {
        console.warn('Could not parse upload response', e);
      }

      // server returns the stored filename(s); save the filename to the user's avatar
      // so `resolveAvatarUrl` can build the full URL when rendering
      if (imagePath) {
        onChange({ target: { name: 'avatar', value: imagePath } });
        setLocalAvatarUrl(resolveAvatarUrl(imagePath));
      } else {
        console.warn('No image path found in upload response', uploadResponse);
        setUploadError('Không nhận được đường dẫn ảnh từ server. Kiểm tra Network tab.');
      }
    } catch (error) {
      console.error('Upload error', error);
      const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi tải ảnh lên.';
      setUploadError(errorMsg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  return (
    <section className="bg-cinema-zinc/30 rounded-2xl p-8 border border-white/10 shadow-xl animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center space-x-3">
          <span className="w-2 h-8 bg-cinema-red rounded-full mr-4"></span>
          Hồ sơ cá nhân
        </h2>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)} 
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all border border-white/10"
          >
            <Edit2 className="w-4 h-4 text-cinema-red" />
            <span>Chỉnh sửa</span>
          </button>
        ) : (
          <button 
            onClick={onSave} 
            className="flex items-center space-x-2 bg-cinema-red hover:bg-red-700 px-6 py-2 rounded-lg transition-all shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Lưu thay đổi</span>
          </button>
        )}
      </div>

      {error && (
        <div className="mt-6 flex items-center space-x-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="mt-6 flex items-center space-x-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-green-400 text-sm">{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Username */}
        <div className="space-y-2">
          <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Tên người dùng</span>
          </label>
          {isEditing ? (
            <input 
              type="text" 
              name="userName" 
              value={userData.userName} 
              onChange={onChange} 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" 
            />
          ) : (
            <p className="text-lg font-medium px-4 py-3 bg-white/5 rounded-xl border border-transparent">
              {userData.userName}
            </p>
          )}
        </div>

        {/* Avatar URL */}
        <div className="space-y-2">
          <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
            <Camera className="w-4 h-4" />
            <span>Ảnh đại diện</span>
          </label>
          {isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <img 
                  src={localAvatarUrl || resolveAvatarUrl(userData.avatar)} 
                  alt="Avatar Preview" 
                  className="w-12 h-12 rounded-full object-cover border border-white/20" 
                />
                <div className="flex-1">
                  <input 
                    type="text" 
                    name="avatar" 
                    value={localAvatarUrl || resolveAvatarUrl(userData.avatar) || ''} 
                    onChange={(e) => {
                      // normalize input: if user pasted a full URL from our image endpoint,
                      // extract the filename so we store the internal avatar value as filename
                      const val = e.target.value || '';
                      // clear local preview when user manually edits
                      setLocalAvatarUrl('');
                      if (val.startsWith(IMAGE_BASE_URL)) {
                        const filename = val.replace(IMAGE_BASE_URL, '');
                        onChange({ target: { name: 'avatar', value: filename } });
                      } else if (val.startsWith('http://') || val.startsWith('https://')) {
                        // other external URLs: store as-is so preview continues to work
                        onChange({ target: { name: 'avatar', value: val } });
                      } else {
                        // plain filename or relative path
                        onChange({ target: { name: 'avatar', value: val } });
                      }
                    }}
                    placeholder="Nhập đường dẫn URL ảnh mới..." 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all text-sm" 
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-gray-500 text-xs">HOẶC</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden" 
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-3 rounded-xl transition-all border border-blue-500/30"
              >
                {isUploading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Đang tải lên...</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    <span>Chọn ảnh từ máy</span>
                  </>
                )}
              </button>
              {uploadError && (
                <div className="text-red-400 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-3 h-3" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4 px-4 py-3 bg-white/5 rounded-xl border border-transparent overflow-hidden">
               <img src={resolveAvatarUrl(userData.avatar)} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
               <span className="text-gray-400 text-sm truncate">{resolveAvatarUrl(userData.avatar)}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
