const Footer = () => {
  return (
    <footer className="w-full bg-[#07070a] border-t border-white/10 py-8 mt-16 text-center text-gray-400 text-sm">
      <div className="container mx-auto px-4">
        <span>
          &copy; {new Date().getFullYear()} FilmReview. All rights reserved.
        </span>
        <span className="block mt-2">
          Made with <span className="text-cinema-red">♥</span> by team 6.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
