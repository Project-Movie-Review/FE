import { User, Camera, Edit2, Save } from 'lucide-react';

const ProfileInfo = ({ userData, isEditing, setIsEditing, onChange, onSave }) => {
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
            <span>Ảnh đại diện (URL)</span>
          </label>
          {isEditing ? (
            <div className="flex items-center space-x-4">
              <img 
                src={userData.avatar} 
                alt="Avatar Preview" 
                className="w-12 h-12 rounded-full object-cover border border-white/20" 
              />
              <input 
                type="text" 
                name="avatar" 
                value={userData.avatar} 
                onChange={onChange} 
                placeholder="Nhập đường dẫn URL ảnh mới..." 
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all text-sm" 
              />
            </div>
          ) : (
            <div className="flex items-center space-x-4 px-4 py-3 bg-white/5 rounded-xl border border-transparent overflow-hidden">
               <img src={userData.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
               <span className="text-gray-400 text-sm truncate">{userData.avatar}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
