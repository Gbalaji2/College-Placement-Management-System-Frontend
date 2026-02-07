import { useEffect, useState } from "react";
import Logo from "../../assets/CPMS.png";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function LandingNavbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buttonSize = windowWidth <= 768 ? "md" : "lg";
  const logoText = windowWidth <= 600 ? "CPMS" : "College Placement Management System";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 px-4 py-2 ${
        isScrolled ? "shadow-lg bg-slate-50" : "bg-white/70 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="CPMS Logo"
            className="rounded-lg border border-black w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
          />

          <h1
            className={`font-semibold truncate ${
              logoText === "CPMS" ? "text-3xl" : "text-xl sm:text-2xl md:text-3xl"
            }`}
          >
            {logoText}
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 items-center">
          <Button
            aria-label="Go to Login Page"
            variant="outline-primary"
            size={buttonSize}
            onClick={() => navigate("/student/login")}
          >
            Login
          </Button>

          <Button
            aria-label="Go to Signup Page"
            variant="success"
            size={buttonSize}
            className="text-nowrap"
            onClick={() => navigate("/student/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;