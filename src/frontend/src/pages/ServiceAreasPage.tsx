import { MapPin } from "lucide-react";
import { motion } from "motion/react";

const cities = [
  {
    name: "New York",
    blurb:
      "Website Design & Digital Marketing in New York — helping local businesses stand out in a competitive market.",
  },
  {
    name: "Los Angeles",
    blurb:
      "Social Media Management and Paid Advertising for LA businesses looking to grow their online presence.",
  },
  {
    name: "Chicago",
    blurb:
      "Business Website Design and Lead Generation Services tailored for Chicago-area companies.",
  },
  {
    name: "Houston",
    blurb:
      "Digital Marketing Agency services in Houston — from web design to Facebook Advertising.",
  },
  {
    name: "Phoenix",
    blurb:
      "Website Development and Instagram Advertising for Phoenix businesses ready to scale.",
  },
  {
    name: "Philadelphia",
    blurb:
      "Professional Website Design & Social Media Management for Philadelphia entrepreneurs.",
  },
  {
    name: "San Antonio",
    blurb:
      "Lead Generation Services and Business Website Design for San Antonio companies.",
  },
  {
    name: "San Diego",
    blurb:
      "Digital Marketing Agency support in San Diego — custom websites and ad campaigns.",
  },
  {
    name: "Dallas",
    blurb:
      "Website Design & Development paired with Facebook Advertising for Dallas businesses.",
  },
  {
    name: "San Jose",
    blurb:
      "Social Media Management and Performance Analytics for San Jose tech and service businesses.",
  },
  {
    name: "Austin",
    blurb:
      "Business Website Design and Instagram Advertising for Austin's growing business community.",
  },
  {
    name: "Jacksonville",
    blurb:
      "Website Development and Lead Generation Services for Jacksonville businesses.",
  },
  {
    name: "Fort Worth",
    blurb:
      "Digital Marketing Agency services in Fort Worth — custom strategies for local growth.",
  },
  {
    name: "Columbus",
    blurb:
      "Social Media Management and Paid Advertising for Columbus-area businesses.",
  },
  {
    name: "Charlotte",
    blurb:
      "Website Design & Development with SEO foundations for Charlotte companies.",
  },
];

export default function ServiceAreasPage() {
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
            data-ocid="areas.home_link"
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
              data-ocid="areas.services_link"
            >
              Services
            </a>
            <a
              href="/contact"
              className="text-sm text-white/70 hover:text-[#E53935] transition-colors"
              data-ocid="areas.contact_link"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#E53935] mb-4 px-3 py-1 border border-[#E53935]/30 rounded-full">
            Nationwide
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            Digital Marketing Services — Service Areas
          </h1>
          <p className="text-[#CFCFCF] text-lg max-w-3xl mx-auto">
            Linux Lab Media is a remote-first Digital Marketing Agency serving
            businesses across the United States. We provide Website Design,
            Website Development, Social Media Management, and Lead Generation
            Services to businesses in every major market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl border border-white/10 p-6 hover:border-[#E53935]/40 transition-all duration-300"
              style={{ backgroundColor: "#121212" }}
              data-ocid={`areas.card.${i + 1}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[#E53935]/10 border border-[#E53935]/20 rounded-lg flex items-center justify-center">
                  <MapPin size={16} className="text-[#E53935]" />
                </div>
                <h2 className="text-white font-bold font-display text-lg">
                  {city.name}
                </h2>
              </div>
              <p className="text-[#CFCFCF] text-sm leading-relaxed">
                {city.blurb}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#CFCFCF] mb-4">
            Don&apos;t see your city? We work with businesses nationwide.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            data-ocid="areas.cta_button"
          >
            Get in Touch
          </a>
        </div>
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
