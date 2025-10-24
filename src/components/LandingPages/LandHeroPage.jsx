import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/heroImg.jpg";

function LandingHeroPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center gap-8 h-[85vh] bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <h3 className="text-5xl bg-cyan-100 text-black p-2 rounded-full max-md:text-4xl max-sm:text-2xl text-center">
        Welcome to your Future
      </h3>

      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center gap-4 max-md:flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control !w-96 max-sm:!w-52 px-3 py-2 rounded-lg shadow-md"
            placeholder="Enter Your Email Address..."
          />
          <button
            className="bg-green-400 border border-black px-3 py-1 text-lg rounded-lg shadow-lg shadow-green-400/50 hover:bg-green-600 text-white max-md:text-base"
            onClick={() => navigate("/student/signup")}
          >
            Create Account Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default LandingHeroPage;