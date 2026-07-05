import {
  BarChart3,
  Check,
  Globe,
  Layers,
  Megaphone,
  MessageSquare,
  Palette,
  RefreshCw,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const benefits = [
  {
    icon: Palette,
    title: "Consistent Branding",
    desc: "Your brand stays unified across every channel — website, social media, and advertising — building stronger recognition and trust.",
  },
  {
    icon: Target,
    title: "Unified Growth Strategy",
    desc: "All your marketing efforts work together toward the same goals instead of competing against each other.",
  },
  {
    icon: BarChart3,
    title: "Better Performance Tracking",
    desc: "See the full picture of how your online presence is performing with integrated analytics and reporting.",
  },
  {
    icon: MessageSquare,
    title: "Simplified Communication",
    desc: "One dedicated team managing everything means faster updates, clearer feedback, and no miscommunication.",
  },
  {
    icon: Users,
    title: "Stronger Customer Experience",
    desc: "A seamless journey from first impression to conversion creates happier customers and higher retention.",
  },
  {
    icon: TrendingUp,
    title: "Improved Long-Term Results",
    desc: "Combined strategies compound over time, delivering sustainable growth that single-channel efforts cannot match.",
  },
];

const combinations = [
  {
    icon: Globe,
    title: "Website + Social Media Management",
    desc: "Build a professional online presence while maintaining consistent engagement across social platforms.",
  },
  {
    icon: Megaphone,
    title: "Website + Paid Advertising",
    desc: "Drive targeted traffic to a high-converting website designed to generate leads and inquiries.",
  },
  {
    icon: Users,
    title: "Social Media Management + Paid Advertising",
    desc: "Combine organic growth with strategic advertising campaigns to maximize visibility and reach.",
  },
  {
    icon: Layers,
    title: "Website + Social Media Management + Paid Advertising",
    desc: "A complete digital growth solution that aligns your website, content, and advertising into one cohesive strategy.",
  },
];

const includes = [
  "Dedicated Strategy",
  "Performance Tracking",
  "Monthly Reporting",
  "Growth Recommendations",
  "Transparent Communication",
  "Ongoing Optimization",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Linux Lab Media Business Growth Solutions",
  description:
    "Customized business growth solutions combining website design, social media management, and paid advertising for small and medium businesses.",
  provider: {
    "@type": "LocalBusiness",
    name: "Linux Lab Media",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  itemListElement: combinations.map((c) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: c.title,
      description: c.desc,
    },
  })),
};

export default function BusinessGrowthPage() {
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
            data-ocid="businessgrowth.home_link"
          >
            <img
              src="/assets/llm-logo.png"
              alt="Linux Lab Media"
              className="h-10 w-auto object-contain"
            />
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/services"
              className="text-sm text-white/70 hover:text-[#E53935] transition-colors"
              data-ocid="businessgrowth.services_link"
            >
              Services
            </a>
            <a
              href="/contact"
              className="text-sm text-white/70 hover:text-[#E53935] transition-colors"
              data-ocid="businessgrowth.contact_link"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <main>
        {/* Hero */}
        <section
          className="py-20 md:py-28 px-4"
          style={{ backgroundColor: "#0A0A0A" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#E53935] mb-4 px-3 py-1 border border-[#E53935]/30 rounded-full">
                Growth Solutions
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-tight">
                Business Growth
                <span className="text-[#E53935]"> Solutions</span>
              </h1>
              <p className="text-[#CFCFCF] text-lg md:text-xl max-w-2xl mx-auto mb-6">
                Combine multiple services into a customized growth strategy
                designed specifically for your business goals.
              </p>
              <p className="text-[#CFCFCF]/80 text-base max-w-2xl mx-auto mb-10">
                Many businesses achieve the best results when their website,
                social media, and advertising efforts work together. Our
                Business Growth Solutions allow clients to combine services into
                a unified strategy that creates a stronger online presence and
                better long-term results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#E53935] hover:bg-[#FF3D3D] text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-lg shadow-glow-red"
                  data-ocid="businessgrowth.hero_primary_button"
                >
                  Schedule a Consultation
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-lg"
                  data-ocid="businessgrowth.hero_secondary_button"
                >
                  Request a Custom Plan
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Combine Services */}
        <section className="py-20 px-4" style={{ backgroundColor: "#121212" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#E53935] mb-4 px-3 py-1 border border-[#E53935]/30 rounded-full">
                Why Combine Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
                Better Together
              </h2>
              <p className="text-[#CFCFCF] max-w-2xl mx-auto">
                When multiple marketing channels work together, your business
                sees compounding results that no single service can deliver
                alone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-[#E53935]/50 hover:shadow-glow-red transition-all duration-300"
                    data-ocid={`businessgrowth.benefit.${i + 1}`}
                  >
                    <div className="w-12 h-12 bg-[#E53935]/10 border border-[#E53935]/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#E53935]/20 transition-colors">
                      <Icon className="text-[#E53935]" size={22} />
                    </div>
                    <h3 className="text-white font-bold font-display text-lg mb-3">
                      {b.title}
                    </h3>
                    <p className="text-[#CFCFCF] text-sm leading-relaxed">
                      {b.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Service Combinations */}
        <section className="py-20 px-4" style={{ backgroundColor: "#0A0A0A" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#E53935] mb-4 px-3 py-1 border border-[#E53935]/30 rounded-full">
                Popular Combinations
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
                Service Combinations That Work
              </h2>
              <p className="text-[#CFCFCF] max-w-2xl mx-auto">
                These are the most effective ways our clients combine services
                to maximize their online presence and business growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {combinations.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-[#E53935]/50 hover:shadow-glow-red transition-all duration-300"
                    data-ocid={`businessgrowth.combo.${i + 1}`}
                  >
                    <div className="w-12 h-12 bg-[#E53935]/10 border border-[#E53935]/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#E53935]/20 transition-colors">
                      <Icon className="text-[#E53935]" size={22} />
                    </div>
                    <h3 className="text-white font-bold font-display text-xl mb-3">
                      {c.title}
                    </h3>
                    <p className="text-[#CFCFCF] text-sm leading-relaxed mb-6">
                      {c.desc}
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[#E53935] font-semibold text-sm hover:text-[#FF3D3D] transition-colors"
                      data-ocid={`businessgrowth.combo_cta.${i + 1}`}
                    >
                      Learn More
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Fully Customized Solutions */}
        <section className="py-20 px-4" style={{ backgroundColor: "#121212" }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#E53935] mb-4 px-3 py-1 border border-[#E53935]/30 rounded-full">
                  Fully Customized
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-6">
                  Built Around Your
                  <span className="text-[#E53935]"> Business</span>
                </h2>
                <p className="text-[#CFCFCF] leading-relaxed mb-6">
                  Every business is unique. We work with clients to create
                  customized service combinations based on their goals,
                  industry, audience, and growth objectives.
                </p>
                <p className="text-[#CFCFCF] leading-relaxed mb-8">
                  Whether you need a new website, ongoing social media
                  management, advertising campaigns, or a complete digital
                  strategy, we build a solution tailored specifically to your
                  business.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Custom Websites",
                    "Social Media",
                    "Paid Ads",
                    "Automation",
                    "Content Creation",
                    "Analytics",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full border border-white/15 text-white/80 text-sm bg-[#0A0A0A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Secure & Reliable" },
                  { icon: RefreshCw, label: "Ongoing Optimization" },
                  { icon: Target, label: "Goal-Focused" },
                  { icon: TrendingUp, label: "Growth Driven" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 flex flex-col items-center text-center gap-3 hover:border-[#E53935]/40 transition-colors"
                      data-ocid={`businessgrowth.capability.${i + 1}`}
                    >
                      <Icon className="text-[#E53935]" size={24} />
                      <span className="text-white text-sm font-medium">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Every Solution Includes */}
        <section className="py-20 px-4" style={{ backgroundColor: "#0A0A0A" }}>
          <div className="max-w-7xl mx-auto">
            <div
              className="rounded-2xl border border-white/10 p-8 md:p-12"
              style={{ backgroundColor: "#121212" }}
            >
              <h2 className="text-center text-white font-bold font-display text-2xl md:text-3xl mb-10">
                What Every Solution Includes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {includes.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-4 bg-[#0A0A0A] border border-white/10 rounded-xl px-5 py-4 hover:border-[#E53935]/40 transition-colors"
                    data-ocid={`businessgrowth.includes.${i + 1}`}
                  >
                    <div className="w-9 h-9 bg-[#E53935]/10 border border-[#E53935]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="text-[#E53935]" size={16} />
                    </div>
                    <span className="text-white text-sm font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="py-24 relative overflow-hidden"
          style={{ backgroundColor: "#0A0A0A" }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E53935]/5 rounded-full blur-3xl" />
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#E53935]/3 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#E53935]/3 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-[#E53935]/10 border border-[#E53935]/30 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
              <span className="text-[#E53935] text-sm font-semibold">
                Now Accepting New Clients
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6 leading-tight">
              Let&apos;s Build Your
              <span className="text-[#E53935]"> Growth Strategy</span>
            </h2>
            <p className="text-xl text-[#CFCFCF] mb-12 max-w-2xl mx-auto">
              Schedule a consultation and discover how combining services can
              create a stronger, more effective online presence for your
              business.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-[#E53935] hover:bg-[#FF3D3D] text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-lg shadow-glow-red"
              data-ocid="businessgrowth.final_cta_button"
            >
              Get Started Today
            </a>
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
            <a
              href="/services"
              className="hover:text-[#E53935] transition-colors"
            >
              Services
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
