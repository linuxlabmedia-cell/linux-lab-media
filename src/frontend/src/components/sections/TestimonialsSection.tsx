import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TESTIMONIAL = {
  name: "John Chunn Realty LLC",
  role: "Real Estate",
  text: "Working with LinuxLab Media has been one of the best investments we've made for our business. Their team helped improve our online presence, create professional marketing content, and develop strategies that generated more visibility for our listings and brand. Communication was always prompt, the work was delivered on time, and the quality consistently exceeded our expectations. If you're looking for a marketing partner that understands how to help businesses grow and attract new customers, we highly recommend LinuxLab Media.",
  initials: "JC",
};

const testimonials = [
  { ...TESTIMONIAL, id: "jc-1" },
  { ...TESTIMONIAL, id: "jc-2" },
  { ...TESTIMONIAL, id: "jc-3" },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  const handlePrev = () => {
    prev();
    resetTimer();
  };
  const handleNext = () => {
    next();
    resetTimer();
  };

  const t = testimonials[current];

  return (
    <section
      className="bg-[#121212] py-24"
      id="testimonials"
      data-ocid="testimonials.section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#E53935] text-sm font-semibold uppercase tracking-widest mb-4">
          Client Stories
        </p>
        <h2 className="text-center text-4xl md:text-5xl font-bold font-display text-white mb-16">
          What Our Clients
          <span className="text-[#E53935]"> Say</span>
        </h2>

        <div
          className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-12 shadow-elevated"
          data-ocid="testimonials.card"
          aria-live="polite"
        >
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {["1st", "2nd", "3rd", "4th", "5th"].map((label) => (
              <Star
                key={label}
                size={18}
                className="text-[#E53935] fill-[#E53935]"
              />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-[#CFCFCF] text-lg leading-relaxed mb-8 min-h-[100px]">
            &ldquo;{t.text}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E53935]/20 border border-[#E53935]/40 flex items-center justify-center flex-shrink-0">
              <span className="text-[#E53935] font-bold text-sm">
                {t.initials}
              </span>
            </div>
            <div>
              <p className="text-white font-semibold font-display">{t.name}</p>
              <p className="text-[#CFCFCF] text-sm">Real Estate Client</p>
            </div>
          </div>

          {/* Decorative quote mark */}
          <div className="absolute top-8 right-8 text-8xl text-[#E53935]/10 font-serif leading-none select-none">
            &ldquo;
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#E53935] hover:text-[#E53935] transition-colors"
            aria-label="Previous testimonial"
            data-ocid="testimonials.prev_button"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((t2, i) => (
              <button
                key={t2.id}
                type="button"
                onClick={() => {
                  setCurrent(i);
                  resetTimer();
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-[#E53935]"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
                data-ocid={`testimonials.dot.${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#E53935] hover:text-[#E53935] transition-colors"
            aria-label="Next testimonial"
            data-ocid="testimonials.next_button"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
