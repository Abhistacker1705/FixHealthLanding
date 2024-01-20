const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="flex justify-between items-center px-4">
        <div>
          <img
            src="https://ik.imagekit.io/tcfp7i31d/logo_with_yp_white_6p2ZETYLi.svg"
            alt="Fix Health"
            className="h-12"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex gap-4">
            <a href="/blogs" className="text-white hover:text-blue-500">
              Blogs
            </a>
            <a
              href="/privacy-policy"
              className="text-white hover:text-blue-500">
              Privacy Policy
            </a>
            <a
              href="/terms-and-conditions"
              className="text-white hover:text-blue-500">
              Terms & Conditions
            </a>
          </div>
          <div className="flex gap-4">
            <a href="/about" className="text-white hover:text-blue-500">
              About Us
            </a>
            <a href="/about#careers" className="text-white hover:text-blue-500">
              Careers
            </a>
            <a
              href="/about#contactDetails"
              className="text-white hover:text-blue-500">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
