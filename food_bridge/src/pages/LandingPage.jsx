import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGraduationCap,
  FaTwitter,
  FaLinkedinIn,
  FaBookOpen,
  FaUsers
} from "react-icons/fa";
import { GraduationCap, Users, Wrench, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ target, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0;
          const inc = Math.ceil(target / 100);

          const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(current);
          }, 20);

          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <h2 className="text-4xl font-extrabold text-green-400">{count}+</h2>
      <p className="text-gray-400">{label}</p>
    </div>
  );
};

/* ---------------- LANDING PAGE ---------------- */
const LandingPage = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1 }
    );
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur border-b border-zinc-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-400">Food Bridge</h1>
          <button
            onClick={() => navigate("/login")}
            className="bg-green-400 text-black px-5 py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div ref={titleRef}>
            <h1 className="text-4xl md:text-6xl font-extrabold">
              Bridging{" "}
              <span className="text-green-400">Surplus Food</span> with{" "}
              <span className="text-yellow-400">Hunger</span>
            </h1>

            <p className="mt-4 text-gray-400 max-w-xl">
              A platform connecting food donors and volunteers to reduce waste
              and fight hunger.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => navigate("/login?role=donator")}
                className="bg-green-400 text-black px-6 py-3 rounded-xl font-semibold"
              >
                Donate Food
              </button>

              <button
                onClick={() => navigate("/login?role=volunteer")}
                className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold"
              >
                Volunteer
              </button>
            </div>
          </div>

          <div ref={imageRef} className="flex justify-center">
            <img
              src="/Charity-bro.png"
              alt="Food Bridge"
              className="w-[420px]"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <Counter target={1200} label="Food Donations" />
          <Counter target={300} label="Volunteers" />
          <Counter target={150} label="NGOs Supported" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <Feature icon={GraduationCap} title="Easy Donation" />
          <Feature icon={Users} title="Volunteer Network" />
          <Feature icon={Wrench} title="Real-time Tracking" />
          <Feature icon={Briefcase} title="NGO Support" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-green-400">Food Bridge</h3>
            <p className="text-gray-400 mt-3">
              Reducing food waste. Feeding hope.
            </p>
          </div>

          <FooterCol title="Quick Links" items={["Home", "Login", "Donate"]} />
          <FooterCol title="Support" items={["Help", "Contact", "Community"]} />

          <div>
            <h4 className="font-bold mb-4">Social</h4>
            <div className="flex gap-4">
              <FaTwitter />
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

/* ---------- SMALL REUSABLE COMPONENTS ---------- */
const Feature = ({ icon: Icon, title }) => (
  <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center">
    <Icon className="text-green-400 mx-auto mb-4" size={40} />
    <h3 className="font-semibold">{title}</h3>
  </div>
);

const FooterCol = ({ title, items }) => (
  <div>
    <h4 className="font-bold mb-4">{title}</h4>
    <ul className="space-y-2 text-gray-400">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  </div>
);

export default LandingPage;
