import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import slide1 from "@/assets/slide-01-trip.jpg";
import slide2 from "@/assets/slide-02-beach.jpg";
import slide3 from "@/assets/slide-03-massage.jpg";
import slide4 from "@/assets/slide-04-dinner.jpg";
import slide5 from "@/assets/slide-05-stars.jpg";
import slide6 from "@/assets/slide-06-dance.jpg";
import slide7 from "@/assets/slide-07-laugh.jpg";
import slide8 from "@/assets/slide-08-kiss.jpg";
import slide9 from "@/assets/slide-09-sleep.jpg";
import slide10 from "@/assets/slide-10-paradise.jpg";

type Slide = {
  image: string;
  title: string;
  subtitle: string;
  badge?: string;
  anim?: "sway" | "float" | "none";
};

const slides: Slide[] = [
  { image: slide1, badge: "Bozcaada 2026", title: "Our First Trip", subtitle: "Just you, me & the sea breeze ✿", anim: "float" },
  { image: slide2, badge: "Slide 02", title: "Beach Days, Cocktail Sips", subtitle: "Sunshine tastes better next to you 🍹", anim: "float" },
  { image: slide3, badge: "Coupon", title: "Full Body Massage", subtitle: "Redeemable by the cutest penguin in the world 💆", anim: "none" },
  { image: slide4, badge: "Coupon", title: "A Magical Dinner", subtitle: "Candles, pasta, and your smile across the table 🕯️", anim: "none" },
  { image: slide5, badge: "Surprise", title: "Stargazing Night", subtitle: "A little surprise under a sky full of wishes ✨", anim: "float" },
  { image: slide6, badge: "Let's go!", title: "Dancing Through The Streets", subtitle: "No music needed when I'm with you 💃🕺", anim: "sway" },
  { image: slide7, badge: "Mission", title: "The No-Laugh Challenge", subtitle: "First one to giggle owes a kiss 😆", anim: "none" },
  { image: slide8, badge: "Coupon", title: "Stolen Kisses", subtitle: "Good for unlimited little moments 💋", anim: "sway" },
  { image: slide9, badge: "Goodnight", title: "Sleeping Side By Side", subtitle: "My favourite place is right next to you 🌙", anim: "none" },
  { image: slide10, badge: "Forever", title: "With You, Everywhere Is Paradise", subtitle: "Press play and let's begin ♡", anim: "float" },
];

const Index = () => {
  const [i, setI] = useState(0);
  const next = () => setI((p) => Math.min(p + 1, slides.length - 1));
  const prev = () => setI((p) => Math.max(p - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const s = slides[i];
  const isLast = i === slides.length - 1;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6"
      style={{ background: "radial-gradient(circle at 30% 20%, #fde6ec, #fff6e8 40%, #e6f1f9 100%)" }}
    >
      <div className="w-full max-w-5xl">
        {/* Card */}
        <div
          className="relative rounded-[28px] overflow-hidden shadow-2xl border-[6px] border-white"
          style={{ background: "#fffaf3" }}
        >
          {/* Image area */}
          <div className="relative aspect-square sm:aspect-[5/4] w-full overflow-hidden bg-[#fff7ec]">
            <img
              key={s.image}
              src={s.image}
              alt={s.title}
              className={
                "w-full h-full object-cover origin-center " +
                (s.anim === "sway" ? "animate-[sway_2.4s_ease-in-out_infinite]" :
                 s.anim === "float" ? "animate-[floaty_4s_ease-in-out_infinite]" : "")
              }
            />
            {/* Badge */}
            {s.badge && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide text-rose-500 shadow-md">
                {s.badge}
              </div>
            )}
            {/* Page indicator */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-stone-600 shadow-md">
              {i + 1} / {slides.length}
            </div>

            {/* Floating hearts deco */}
            <Heart className="absolute bottom-6 right-8 text-rose-300 fill-rose-200 animate-[floaty_3s_ease-in-out_infinite]" size={22} />
            <Heart className="absolute top-1/3 right-12 text-rose-200 fill-rose-100 animate-[floaty_4.5s_ease-in-out_infinite]" size={14} />
          </div>

          {/* Text area */}
          <div className="px-6 sm:px-10 py-6 sm:py-8 text-center">
            <h2
              className="text-2xl sm:text-4xl font-bold text-stone-800 mb-2"
              style={{ fontFamily: '"Caveat", "Comic Sans MS", cursive' }}
            >
              {s.title}
            </h2>
            <p className="text-sm sm:text-lg text-stone-600 italic">{s.subtitle}</p>

            {isLast && (
              <div className="mt-6 flex flex-col items-center gap-3">
                <p className="text-xs text-stone-500 uppercase tracking-widest">Our trip soundtrack</p>
                <iframe
                  title="Spotify playlist"
                  style={{ borderRadius: 12 }}
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLusmQ?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="max-w-md w-full"
                />
                <p className="text-[11px] text-stone-400">
                  (Bu playlist'i kendi linkinle değiştirebilirsin)
                </p>
              </div>
            )}
          </div>

          {/* Nav */}
          <button
            onClick={prev}
            disabled={i === 0}
            aria-label="Previous"
            className="absolute left-2 sm:left-4 top-1/3 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 sm:p-3 disabled:opacity-30 transition"
          >
            <ChevronLeft className="text-rose-500" />
          </button>
          <button
            onClick={next}
            disabled={i === slides.length - 1}
            aria-label="Next"
            className="absolute right-2 sm:right-4 top-1/3 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 sm:p-3 disabled:opacity-30 transition"
          >
            <ChevronRight className="text-rose-500" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={
                "h-2 rounded-full transition-all " +
                (idx === i ? "w-8 bg-rose-400" : "w-2 bg-rose-200 hover:bg-rose-300")
              }
            />
          ))}
        </div>

        <p className="text-center mt-4 text-xs text-stone-400">
          Made with ♡ for our Bozcaada adventure — use ← → to navigate
        </p>
      </div>
    </div>
  );
};

export default Index;
