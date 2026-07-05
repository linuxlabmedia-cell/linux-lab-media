import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden"
      id="hero"
      data-ocid="hero.section"
      aria-label="Linux Lab Media digital growth agency hero section"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[700px] h-[700px] bg-[#E53935]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E53935]/3 rounded-full blur-3xl" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#E53935 1px, transparent 1px), linear-gradient(90deg, #E53935 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#E53935]/10 border border-[#E53935]/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
              <span className="text-[#CFCFCF] text-sm">
                Digital Growth Agency
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-[1.1] mb-6">
              Your Business Deserves
              <span className="text-[#E53935]"> More</span> Than Just a Website.
            </h1>

            <p className="text-xl text-[#CFCFCF] mb-10 leading-relaxed max-w-xl">
              We help businesses grow through professional websites, social
              media management, automation systems, and digital marketing
              strategies designed to generate real results — serving businesses
              across the United States.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#FF3D3D] text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-lg shadow-glow-red"
                data-ocid="hero.primary_button"
              >
                Book a Consultation
                <ArrowRight size={20} />
              </button>
              <button
                type="button"
                onClick={scrollToServices}
                className="inline-flex items-center justify-center border-2 border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 text-lg"
                data-ocid="hero.secondary_button"
              >
                View Our Services
              </button>
            </div>
          </div>

          {/* Right — Dashboard mockup */}
          <div className="relative hidden lg:block">
            <div className="animate-float">
              <img
                src="/assets/generated/hero-dashboard.dim_700x500.png"
                alt="Analytics dashboard mockup"
                className="w-full rounded-2xl shadow-elevated"
              />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -left-8 top-1/4 bg-[#121212] border border-white/10 rounded-xl px-4 py-3 shadow-elevated animate-float-delayed">
              <p className="text-[#CFCFCF] text-xs mb-1">Monthly Leads</p>
              <p className="text-white font-bold font-display text-xl">
                +<span className="text-[#E53935]">340%</span>
              </p>
            </div>

            <div
              className="absolute -right-4 bottom-1/4 bg-[#121212] border border-white/10 rounded-xl px-4 py-3 shadow-elevated animate-float"
              style={{ animationDelay: "1s" }}
            >
              <p className="text-[#CFCFCF] text-xs mb-1">Client Satisfaction</p>
              <p className="text-white font-bold font-display text-xl">
                <span className="text-[#E53935]">98%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
