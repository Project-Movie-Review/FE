import { Lock, Save } from 'lucide-react';

const ProfileSettings = ({ passwords, onPasswordChange, onSave }) => {
  return (
    <section className="bg-cinema-zinc/30 rounded-2xl p-8 border border-white/10 shadow-xl animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center space-x-3">
          <span className="w-2 h-8 bg-cinema-red rounded-full mr-4"></span>
          Cài đặt tài khoản
        </h2>
        <button 
          onClick={onSave} 
          className="flex items-center space-x-2 bg-cinema-red hover:bg-red-700 px-6 py-2 rounded-lg transition-all shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Lưu thay đổi</span>
        </button>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Đổi mật khẩu</h3>
          <div className="space-y-4 max-w-lg">
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Mật khẩu hiện tại</span>
              </label>
              <input 
                type="password" 
                name="currentPassword" 
                value={passwords.currentPassword} 
                onChange={onPasswordChange} 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium flex items-center space-x-2">
                <Lock className="w-4 h-4 text-cinema-red" />
                <span>Mật khẩu mới</span>
              </label>
              <input 
                type="password" 
                name="newPassword" 
                value={passwords.newPassword} 
                onChange={onPasswordChange} 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSettings;
