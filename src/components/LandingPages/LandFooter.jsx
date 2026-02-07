import { useNavigate } from "react-router-dom";

function LandFooter() {
  const navigate = useNavigate();

  const linkClass =
    "nav-link px-2 text-gray-400 hover:text-white transition-colors cursor-pointer";

  const goToSection = (id) => {
    navigate(`/#${id}`);

    // Smooth scroll after navigation
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto flex flex-col items-center gap-4">

        {/* Top nav links */}
        <ul className="flex flex-wrap justify-center gap-4 border-b border-gray-700 pb-3 w-full max-w-lg">
          <li>
            <span onClick={() => goToSection("home")} className={linkClass}>
              Home
            </span>
          </li>
          <li>
            <span onClick={() => goToSection("about")} className={linkClass}>
              About
            </span>
          </li>
          <li>
            <span onClick={() => goToSection("contact")} className={linkClass}>
              Contact
            </span>
          </li>
          <li>
            <span onClick={() => goToSection("faqs")} className={linkClass}>
              FAQs
            </span>
          </li>
        </ul>

        {/* Admin login links */}
        <ul className="flex flex-wrap justify-center gap-2 border-b border-gray-700 pb-3 w-full max-w-lg">
          <li>
            <span className={linkClass} onClick={() => navigate("/tpo/login")}>
              Login as TPO Admin
            </span>
          </li>
          <span className="text-gray-500">|</span>
          <li>
            <span
              className={linkClass}
              onClick={() => navigate("/management/login")}
            >
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