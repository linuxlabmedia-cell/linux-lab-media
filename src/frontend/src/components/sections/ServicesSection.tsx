import { Check, Globe, Megaphone, Users } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    desc: "Professional Website Design and Website Development services built to establish credibility, generate leads, and help businesses grow online. Every website is custom designed around the client's goals, brand, and customer journey.",
    features: [
      "Custom Website Design",
      "Mobile Responsive Development",
      "SEO Foundations",
      "Lead Capture Systems",
      "Fast Loading Performance",
      "Secure Hosting & Maintenance",
      "Performance Analytics & Reporting",
    ],
    cta: "Request a Website Quote",
  },
  {
    icon: Users,
    title: "Social Media Management",
    desc: "Complete Social Media Management for your business's social media presence. We create content, manage platforms, maintain consistency, and help grow your audience while you focus on running your business.",
    features: [
      "Content Creation",
      "Instagram Management",
      "Facebook Management",
      "Posting & Scheduling",
      "Audience Growth Strategies",
      "Monthly Reporting",
      "Performance Analytics",
    ],
    cta: "Schedule a Consultation",
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    desc: "Targeted Facebook Advertising and Instagram Advertising campaigns designed to generate leads, increase visibility, and drive measurable business growth.",
    features: [
      "Facebook Advertising",
      "Instagram Advertising",
      "Audience Targeting",
      "Campaign Management",
      "Budget Optimization",
      "Conversion Tracking",
      "Performance Analytics",
    ],
    cta: "Start Growing Today",
  },
];

const included = [
  "Performance Tracking",
  "Monthly Reporting",
  "Growth Insights",
  "Strategy Recommendations",
  "Transparent Communication",
];

export default function ServicesSection() {
  return (
    <section
      className="bg-[#0A0A0A] py-24"
      id="services"
      data-ocid="services.section"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#E53935] text-sm font-semibold uppercase tracking-widest mb-4">
          What We Offer
        </p>
        <h2
          id="services-heading"
          className="text-center text-4xl md:text-5xl font-bold font-display text-white mb-6"
        >
          Our Services
        </h2>
        <p className="text-center text-[#CFCFCF] max-w-2xl mx-auto mb-16 text-lg">
          Three core services designed to grow your business online.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="group bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-[#E53935]/50 hover:shadow-glow-red transition-all duration-300 flex flex-col"
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="w-12 h-12 bg-[#E53935]/10 border border-[#E53935]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E53935]/20 transition-colors">
                  <Icon className="text-[#E53935]" size={22} />
                </div>
                <h3 className="text-white font-bold font-display text-xl mb-3">
                  {svc.title}
                </h3>
                <p className="text-[#CFCFCF] text-sm leading-relaxed mb-6">
                  {svc.desc}
                </p>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {svc.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-[#CFCFCF]"
                    >
                      <Check
                        className="text-[#E53935] shrink-0 mt-0.5"
                        size={16}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="w-full bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold text-sm py-3 px-6 rounded-xl transition-colors duration-200"
                  data-ocid={`services.cta.${i + 1}`}
                >
                  {svc.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Every Service Includes */}
        <div className="mt-20 bg-[#121212] border border-white/10 rounded-2xl p-8 md:p-12">
          <h3 className="text-center text-white font-bold font-display text-2xl md:text-3xl mb-10">
            Every Service Includes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {included.map((item) => (
              <div
                key={item}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-10 h-10 bg-[#E53935]/10 border border-[#E53935]/20 rounded-lg flex items-center justify-center">
                  <Check className="text-[#E53935]" size={18} />
                </div>
                <span className="text-[#CFCFCF] text-sm font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
