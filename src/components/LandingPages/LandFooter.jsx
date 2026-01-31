import { useNavigate } from 'react-router-dom';

function LandFooter() {
  const navigate = useNavigate();

  const linkClass = "nav-link px-2 text-gray-400 hover:text-white transition-colors cursor-pointer";

  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto flex flex-col items-center gap-4">
        {/* Top nav links */}
        <ul className="flex flex-wrap justify-center gap-4 border-b border-gray-700 pb-3 w-full max-w-lg">
          <li><a href="#home" className={linkClass}>Home</a></li>
          <li><a href="#about" className={linkClass}>About</a></li>
          <li><a href="#contact" className={linkClass}>Contact</a></li>
          <li><a href="#faqs" className={linkClass}>FAQs</a></li>
        </ul>

        {/* Admin login links */}
        <ul className="flex flex-wrap justify-center gap-2 border-b border-gray-700 pb-3 w-full max-w-lg">
          <li>
            <span className={linkClass} onClick={() => navigate('/tpo/login')}>
              Login as TPO Admin
            </span>
          </li>
          <span className="text-gray-500">|</span>
          <li>
            <span className={linkClass} onClick={() => navigate('/management/login')}>
              Login as Management Admin
            </span>
          </li>
        </ul>

        {/* Footer copyright */}
        <p className="text-center text-gray-500 mt-2">
          © 2025-26 College Placement Management System
        </p>
      </div>
    </footer>
  );
}

export default LandFooter;