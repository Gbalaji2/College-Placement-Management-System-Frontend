import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/heroImg.jpg";

function LandingHeroPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Navigate to signup with optional prefilled email
  const goToSignup = () => {
    navigate("/student/signup", { state: { email } });
  };

  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center gap-6 h-[85vh] max-md:h-[75vh] bg-cover bg-no-repeat bg-center px-4"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <div className="flex flex-col justify-center items-center gap-4 max-md:w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") goToSignup();
          }}
          aria-label="Email Address"
          className="form-control !w-96 max-md:!w-full px-4 py-2 rounded-lg shadow-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter Your Email Address..."
        />
        <button
          onClick={goToSignup}
          aria-label="Create Account"
          className="bg-green-400 border border-black px-5 py-2 text-lg rounded-lg shadow-lg shadow-green-400/50 hover:bg-green-600 text-white max-md:w-full max-md:text-base transition-all duration-200"
        >
          Create Account Now
        </button>
      </div>
    </section>
  );
}

export default LandingHeroPage;