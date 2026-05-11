const HeroBackground = ({ backdrop, title }) => (
  <div className="absolute inset-0">
    <img 
      src={backdrop || 'https://via.placeholder.com/1920x1080?text=No+Backdrop'} 
      alt={title}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/60 to-transparent"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent"></div>
  </div>
);

export default HeroBackground;