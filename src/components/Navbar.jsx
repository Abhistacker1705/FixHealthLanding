import {useEffect, useState} from 'react';

const Navbar = () => {
  const [navClass, setNavClass] = useState('');

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 40) {
        setNavClass('bg-gray-900 p-4 w-screen fixed transition duration-500');
      } else {
        setNavClass(
          'bg-transparent p-4 w-screen fixed transition duration-500'
        );
      }
    };
    return () => window.removeEventListener(onscroll, () => {});
  }, []);

  return (
    <nav className={navClass}>
      <div className="flex px-4 items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://ik.imagekit.io/tcfp7i31d/logo_with_yp_white_6p2ZETYLi.svg"
            alt="Fix Health previously YourPhysio Rated 5 star across platforms"
            className="h-16 w-32 "
          />
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Services
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Blogs
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            About
          </a>
          <a
            href="#booking"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
