import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 100, suffix: "+", label: "Websites Built" },
  { value: 100, suffix: "+", label: "Monthly Content Created" },
  { value: 80, suffix: "+", label: "Campaigns Managed" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedCounter({
  target,
  suffix,
}: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function TrustSection() {
  return (
    <section
      className="bg-[#121212] py-20 border-y border-white/5"
      id="trust"
      data-ocid="trust.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#CFCFCF] text-sm font-medium uppercase tracking-widest mb-4">
          Trusted by Growing Businesses
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold font-display text-white mb-16">
          Helping Businesses Build Their
          <span className="text-[#E53935]"> Online Presence</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 text-center hover:border-[#E53935]/40 transition-all duration-300 hover:shadow-glow-red"
              data-ocid={`trust.stat.${i + 1}`}
            >
              <div className="text-4xl md:text-5xl font-bold font-display text-[#E53935] mb-3">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[#CFCFCF] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
