import {
  Cpu,
  FileText,
  MessageCircle,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Personalized Service",
    desc: "You get a dedicated team that knows your business inside and out — not a generic package.",
  },
  {
    icon: Target,
    title: "Custom Strategies",
    desc: "We never use cookie-cutter solutions. Every strategy is built specifically for your goals.",
  },
  {
    icon: FileText,
    title: "Transparent Reporting",
    desc: "Clear, honest reporting so you always know exactly what your investment is delivering.",
  },
  {
    icon: MessageCircle,
    title: "Fast Communication",
    desc: "Direct access to your team with fast response times and no runaround.",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    desc: "We use cutting-edge tools and platforms to keep your business ahead of the competition.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Growth Focus",
    desc: "We build for sustainable growth, not quick wins that fade. Your success is our success.",
  },
];

export default function WhyUsSection() {
  return (
    <section
      className="bg-[#0A0A0A] py-24"
      id="why-us"
      data-ocid="whyus.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#E53935] text-sm font-semibold uppercase tracking-widest mb-4">
          Why Linux Lab Media
        </p>
        <h2 className="text-center text-4xl md:text-5xl font-bold font-display text-white mb-6">
          The Agency That Actually
          <span className="text-[#E53935]"> Delivers</span>
        </h2>
        <p className="text-center text-[#CFCFCF] max-w-2xl mx-auto mb-16">
          We're not just another marketing agency. We're a growth partner that
          is genuinely invested in your success.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="group bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-[#E53935]/50 hover:shadow-glow-red transition-all duration-300"
                data-ocid={`whyus.item.${i + 1}`}
              >
                <div className="w-12 h-12 bg-[#E53935]/10 border border-[#E53935]/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#E53935]/20 transition-colors">
                  <Icon className="text-[#E53935]" size={22} />
                </div>
                <h3 className="text-white font-bold font-display text-lg mb-3">
                  {r.title}
                </h3>
                <p className="text-[#CFCFCF] text-sm leading-relaxed">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
