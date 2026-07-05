import { Check } from "lucide-react";

const features = [
  "Content Creation",
  "Social Posting",
  "Audience Growth",
  "Performance Reports",
  "Ad Campaign Management",
  "Competitor Analysis",
];

const plans = [
  {
    tier: "Basic Management",
    price: "$399",
    period: "/month",
    desc: "Perfect for businesses starting their social media journey with consistent content and basic management.",
    promo: {
      label: "First Month Special",
      badge: "50% OFF 1st Month",
      firstMonthPrice: "$199.50",
    },
  },
  {
    tier: "Advanced Management",
    price: "$700",
    period: "/month",
    desc: "Full-service management for businesses serious about scaling their social presence across multiple platforms.",
    promo: {
      label: "Limited Offer",
      badge: "30% OFF 1st Month",
      firstMonthPrice: "$490",
    },
  },
];

export default function SocialMediaSection() {
  return (
    <section
      className="bg-[#0A0A0A] py-24"
      id="social-media"
      data-ocid="social.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#E53935] text-sm font-semibold uppercase tracking-widest mb-4">
          Social Media Management
        </p>
        <h2 className="text-center text-4xl md:text-5xl font-bold font-display text-white mb-6">
          Consistent Content.
          <span className="text-[#E53935]"> Real Growth.</span>
        </h2>
        <p className="text-center text-[#CFCFCF] max-w-2xl mx-auto mb-16 leading-relaxed">
          Our Social Media Management services are custom-priced based on your
          business size, platforms managed, content requirements, advertising
          needs, and overall complexity. We also integrate Lead Generation
          strategies to turn followers into customers.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Features */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-8">
            <h3 className="text-white font-bold font-display text-xl mb-6">
              Everything Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E53935]/20 flex items-center justify-center flex-shrink-0">
                    <Check size={13} className="text-[#E53935]" />
                  </div>
                  <span className="text-[#CFCFCF] text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div className="flex flex-col gap-6">
            {plans.map((p, i) => (
              <div
                key={p.tier}
                className={`relative border rounded-2xl p-6 transition-all duration-300 ${
                  i === 1
                    ? "bg-[#E53935]/5 border-[#E53935]/30 shadow-glow-red"
                    : "bg-[#121212] border-white/10 hover:border-[#E53935]/40"
                }`}
                data-ocid={`social.plan.${i + 1}`}
              >
                {/* Promo badge */}
                <div className="absolute -top-3 right-4">
                  <span className="inline-flex items-center gap-1 bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide">
                    🔥 {p.promo.badge}
                  </span>
                </div>

                <div className="flex items-start justify-between mb-3 mt-1">
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold mb-1 ${i === 1 ? "text-[#E53935]" : "text-[#CFCFCF]"}`}
                    >
                      {p.tier}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold font-display text-white">
                        {p.price}
                      </span>
                      <span className="text-[#CFCFCF] text-sm">{p.period}</span>
                    </div>
                  </div>
                </div>

                {/* First-month promotion */}
                <div className="flex items-center gap-2 mb-3 bg-[#E53935]/10 border border-[#E53935]/25 rounded-lg px-3 py-2">
                  <span className="text-[#E53935] text-xs font-semibold uppercase tracking-wide">
                    {p.promo.label}:
                  </span>
                  <span className="text-white text-sm font-bold">
                    {p.promo.firstMonthPrice}
                  </span>
                  <span className="text-[#CFCFCF] text-xs">first month</span>
                </div>

                <p className="text-[#CFCFCF] text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
