import About1 from '../../assets/aboutImg1.jpg';
import About2 from '../../assets/aboutImg2.jpg';
import About3 from '../../assets/aboutImg3.jpg';

function LandAbout() {
  const cards = [
    {
      img: About2,
      title: "",
      desc: "Placement Management System manages student information in the college with regard to placement.",
    },
    {
      img: About1,
      title: "Get Placement",
      desc: "Placement Management System is a web app which provides information on placement providers and the placements and keeps up-to-date information of all students.",
    },
    {
      img: About3,
      title: "",
      desc: "Placement Management System can be accessed throughout the college with proper login provided.",
    },
  ];

  return (
    <section
      id="about"
      className="bg-gradient-to-r from-slate-100 via-pink-100 to-orange-100 py-12"
    >
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="w-10/12 md:w-1/3 lg:w-1/4 bg-red-500 bg-opacity-10 border border-black rounded-lg shadow-lg shadow-slate-200 text-center flex flex-col items-center p-4"
          >
            {card.title && <h3 className="text-xl font-semibold mb-2">{card.title}</h3>}

            <img
              src={card.img}
              alt={`About ${idx + 1}`}
              className="w-56 md:w-64 border-2 border-black rounded-xl mb-4"
            />

            <p className="text-gray-700 px-4">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LandAbout;