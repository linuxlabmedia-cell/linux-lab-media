import { Check, ExternalLink } from "lucide-react";

export default function WebsiteDevSection() {
  const hostingFeatures = [
    "Secure Website Hosting",
    "Software & Security Updates",
    "Routine Maintenance",
    "Performance Monitoring",
    "Website Backups",
    "Technical Support",
  ];

  const costDrivers = [
    {
      label: "Number of Pages",
      desc: "Brochure sites vs. large multi-page builds",
    },
    {
      label: "Custom Functionality",
      desc: "Booking systems, calculators, portals",
    },
    {
      label: "E-Commerce",
      desc: "Product catalogs, checkout, payment integrations",
    },
    {
      label: "Third-Party Integrations",
      desc: "CRM, email marketing, automation tools",
    },
    {
      label: "Design Complexity",
      desc: "Custom animations, unique layouts, branding",
    },
    { label: "Timeline", desc: "Standard vs. expedited delivery schedules" },
  ];

  return (
    <section
      className="bg-[#121212] py-24"
      id="website-development"
      data-ocid="webdev.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Messaging */}
          <div>
            <p className="text-[#E53935] text-sm font-semibold uppercase tracking-widest mb-4">
              Website Development
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6 leading-tight">
              Professional Websites Built To
              <span className="text-[#E53935]"> Grow Your Business</span>
            </h2>
            <p className="text-[#CFCFCF] mb-6 leading-relaxed">
              Every Business Website Design and Website Development project we
              take on is fully custom — no templates, no shortcuts. We tailor
              each project to your business goals, functionality requirements,
              design complexity, integrations, and overall scope.
            </p>
            <p className="text-[#CFCFCF] mb-10 leading-relaxed">
              Our process begins with a detailed discovery conversation to
              understand what your business needs. You receive a personalized
              quote that reflects the true investment required to build a
              high-performing online presence — not a one-size-fits-all package.
              We also specialize in Lead Generation Services to turn visitors
              into customers.
            </p>

            {/* Custom Quote Callout */}
            <div
              className="rounded-2xl border border-[#E53935]/30 p-6 mb-10"
              style={{ backgroundColor: "#1a0a0a" }}
              data-ocid="webdev.custom_quote_callout"
            >
              <p className="text-[#E53935] text-xs font-bold uppercase tracking-widest mb-3">
                Custom Pricing
              </p>
              <p className="text-white font-semibold text-lg mb-2">
                Every website is priced based on your unique goals, features,
                design complexity, and integrations — no two projects are the
                same.
              </p>
              <p className="text-[#CFCFCF] text-sm leading-relaxed mb-4">
                Here are the main factors that shape your custom quote:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {costDrivers.map(({ label, desc }) => (
                  <div key={label} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#E53935]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={10} className="text-[#E53935]" />
                    </div>
                    <div>
                      <span className="text-white text-sm font-semibold">
                        {label}
                      </span>
                      <span className="text-[#CFCFCF] text-sm"> — {desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              data-ocid="webdev.cta_button"
            >
              Get a Custom Quote
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Right: Hosting & Maintenance Pricing Card */}
          <div className="flex justify-center lg:justify-end lg:sticky lg:top-24">
            <div
              className="bg-[#E53935]/5 border border-[#E53935]/30 rounded-2xl p-10 w-full max-w-sm shadow-glow-red relative overflow-hidden"
              data-ocid="webdev.pricing_card.1"
            >
              {/* Decorative glow orb */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#E53935]/10 blur-3xl pointer-events-none" />

              <p className="text-[#E53935] text-xs font-semibold uppercase tracking-widest mb-4">
                Monthly Plan
              </p>
              <p className="text-[#CFCFCF] text-sm mb-2">
                Hosting & Maintenance
              </p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-bold font-display text-white">
                  $99
                </span>
                <span className="text-[#CFCFCF] text-base pb-1">/month</span>
              </div>
              <p className="text-[#CFCFCF] text-xs mb-8 leading-relaxed">
                Everything your website needs to stay fast, secure, and running
                smoothly — month after month.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {hostingFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E53935]/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-[#E53935]" />
                    </div>
                    <span className="text-[#CFCFCF] text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-6">
                <p className="text-[#CFCFCF] text-xs leading-relaxed">
                  <span className="text-white font-semibold">
                    No surprises.
                  </span>{" "}
                  A flat monthly rate keeps your site protected, updated, and
                  performing at its best so you can focus on running your
                  business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
