import { Check, Globe, Megaphone, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    desc: "Professional Website Design and Website Development services built to establish credibility, generate leads, and help businesses grow online. Every website is custom designed around the client's goals, brand, and customer journey. We do not use templates — each project is tailored to your functionality requirements, design complexity, and integrations.",
    features: [
      "Custom Website Design",
      "Mobile Responsive Development",
      "SEO Foundations",
      "Lead Capture Systems",
      "Fast Loading Performance",
      "Secure Hosting & Maintenance",
      "Performance Analytics & Reporting",
    ],
    cta: "Request a Custom Quote",
    anchor: "website-design",
  },
  {
    icon: Users,
    title: "Social Media Management",
    desc: "Complete Social Media Management for your business's social media presence. We create content, manage platforms, maintain consistency, and help grow your audience while you focus on running your business. Our team handles Instagram Management, Facebook Management, posting, scheduling, and audience growth strategies.",
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
    anchor: "social-media",
  },
  {
    icon: Megaphone,
    title: "Paid Advertising — Facebook & Instagram",
    desc: "Targeted Facebook Advertising and Instagram Advertising campaigns designed to generate leads, increase visibility, and drive measurable business growth. We handle audience targeting, campaign management, budget optimization, conversion tracking, and performance analytics to maximize your return on investment.",
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
    anchor: "paid-advertising",
  },
];

const included = [
  "Performance Tracking",
  "Monthly Reporting",
  "Growth Insights",
  "Strategy Recommendations",
  "Transparent Communication",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Linux Lab Media Digital Marketing Services",
  description:
    "Professional Website Design & Development, Social Media Management, and Paid Advertising services for small and medium businesses.",
  provider: {
    "@type": "LocalBusiness",
    name: "Linux Lab Media",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
      },
    })),
  },
};

export default function ServicesPage() {
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#0A0A0A" }} className="min-h-screen">
      {/* Top bar */}
      <div
        className="border-b border-white/10"
        style={{ backgroundColor: "#121212" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2"
            data-ocid="servicespage.home_link"
          >
            <img
              src="/assets/llm-logo.png"
              alt="Linux Lab Media"
              className="h-10 w-auto object-contain"
            />
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/faq"
              className="text-sm text-white/70 hover:text-[#E53935] transition-colors"
              data-ocid="servicespage.faq_link"
            >
              FAQ
            </a>
            <a
              href="/contact"
              className="text-sm text-white/70 hover:text-[#E53935] transition-colors"
              data-ocid="servicespage.contact_link"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <main>
        {/* Hero */}
        <section className="py-20 px-4" style={{ backgroundColor: "#0A0A0A" }}>
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#E53935] mb-4 px-3 py-1 border border-[#E53935]/30 rounded-full">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
              Our Digital Marketing Services
            </h1>
            <p className="text-[#CFCFCF] text-lg max-w-2xl mx-auto">
              Three core services designed to grow your business online —
              Website Design & Development, Social Media Management, and Paid
              Advertising.
            </p>
          </div>
        </section>

        {/* Service sections */}
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <section
              key={svc.title}
              id={svc.anchor}
              className={`py-20 px-4 ${i % 2 === 1 ? "" : ""}`}
              style={{ backgroundColor: i % 2 === 1 ? "#121212" : "#0A0A0A" }}
              data-ocid={`servicespage.section.${i + 1}`}
            >
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                >
                  <div>
                    <div className="w-12 h-12 bg-[#E53935]/10 border border-[#E53935]/20 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="text-[#E53935]" size={22} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
                      {svc.title}
                    </h2>
                    <p className="text-[#CFCFCF] leading-relaxed mb-8">
                      {svc.desc}
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                      data-ocid={`servicespage.cta.${i + 1}`}
                    >
                      {svc.cta}
                    </a>
                  </div>

                  <div
                    className="rounded-2xl border border-white/10 p-8"
                    style={{ backgroundColor: "#1a1a1a" }}
                  >
                    <h3 className="text-white font-semibold font-display text-lg mb-6">
                      What&apos;s Included
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {svc.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-[#CFCFCF]"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#E53935]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} className="text-[#E53935]" />
                          </div>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}

        {/* Every Service Includes */}
        <section className="py-20 px-4" style={{ backgroundColor: "#0A0A0A" }}>
          <div className="max-w-7xl mx-auto">
            <div
              className="rounded-2xl border border-white/10 p-8 md:p-12"
              style={{ backgroundColor: "#121212" }}
            >
              <h2 className="text-center text-white font-bold font-display text-2xl md:text-3xl mb-10">
                Every Service Includes
              </h2>
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

        {/* Internal links */}
        <section className="py-16 px-4" style={{ backgroundColor: "#121212" }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold font-display text-white mb-6">
              Explore More
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#website-design"
                className="px-5 py-2.5 rounded-lg border border-white/15 text-white/80 hover:text-[#E53935] hover:border-[#E53935]/40 transition-colors text-sm"
                data-ocid="servicespage.link.webdesign"
              >
                Website Design & Development
              </a>
              <a
                href="#social-media"
                className="px-5 py-2.5 rounded-lg border border-white/15 text-white/80 hover:text-[#E53935] hover:border-[#E53935]/40 transition-colors text-sm"
                data-ocid="servicespage.link.social"
              >
                Social Media Management
              </a>
              <a
                href="#paid-advertising"
                className="px-5 py-2.5 rounded-lg border border-white/15 text-white/80 hover:text-[#E53935] hover:border-[#E53935]/40 transition-colors text-sm"
                data-ocid="servicespage.link.ads"
              >
                Paid Advertising
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer mini */}
      <footer
        className="border-t border-white/10"
        style={{ backgroundColor: "#121212" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CFCFCF]">
          <span>
            © {new Date().getFullYear()} Linux Lab Media. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="/" className="hover:text-[#E53935] transition-colors">
              Home
            </a>
            <a href="/faq" className="hover:text-[#E53935] transition-colors">
              FAQ
            </a>
            <a
              href="/contact"
              className="hover:text-[#E53935] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
