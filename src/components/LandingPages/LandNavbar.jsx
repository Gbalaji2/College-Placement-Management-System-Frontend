import { useEffect, useState } from 'react';
import Logo from '../../assets/CPMS.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LandingNavbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Window resize detection
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine button size and logo text
  const buttonSize = windowWidth <= 768 ? 'md' : 'lg';
  const logoText = windowWidth <= 600 ? 'CPMS' : 'College Placement Management System';

  return (
    <header
      className={`flex justify-between items-center playfair transition-all duration-200 ease-in z-50 ${
        isScrolled ? 'shadow-lg bg-slate-50 top-0 sticky' : ''
      } px-4 py-2`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src={Logo}
          alt="Logo"
          className="rounded-lg border border-black w-20 h-20 md:w-16 md:h-16 sm:w-12 sm:h-12"
        />
        <h1 className={`text-4xl md:text-2xl sm:text-lg ${logoText === 'CPMS' ? '!text-3xl' : ''}`}>
          {logoText}
        </h1>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 items-center">
        <Button variant="outline-primary" size={buttonSize} onClick={() => navigate('student/login')}>
          Login
        </Button>
        <Button variant="success" size={buttonSize} className="text-nowrap" onClick={() => navigate('student/signup')}>
          Sign Up
        </Button>
      </div>
    </header>
  );
}

export default LandingNavbar;