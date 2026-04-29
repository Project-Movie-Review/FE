const AuthInput = ({ icon: Icon, type, value, onChange, placeholder, label }) => (
  <div>
    <label className="block text-sm mb-2 text-gray-400">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 rounded-lg bg-cinema-black/60 ..."
        required
      />
    </div>
  </div>
);

export default AuthInput;