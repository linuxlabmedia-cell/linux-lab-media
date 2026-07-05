import { Zap } from "lucide-react";

const automations = [
  {
    label: "Automated Content Systems",
    desc: "AI-powered content pipelines that create and schedule posts automatically.",
  },
  {
    label: "Lead Follow-Up Workflows",
    desc: "Instant automated responses that nurture leads 24/7 without lifting a finger.",
  },
  {
    label: "CRM Integrations",
    desc: "Connect your CRM with marketing tools for seamless data flow.",
  },
  {
    label: "Appointment Scheduling",
    desc: "Smart booking systems that reduce no-shows and fill your calendar.",
  },
  {
    label: "Rental Property Marketing",
    desc: "Automated listing syndication and lead management for property managers.",
  },
  {
    label: "Real Estate Listing Automation",
    desc: "Auto-publish new listings across all platforms the moment they go live.",
  },
  {
    label: "Social Media Automation",
    desc: "Schedule, repurpose, and cross-post content across all platforms.",
  },
];

export default function AutomationSection() {
  return (
    <section
      className="bg-[#121212] py-24"
      id="automation"
      data-ocid="automation.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-[#E53935] text-sm font-semibold uppercase tracking-widest mb-4">
              Automation
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6 leading-tight">
              Work Smarter With
              <span className="text-[#E53935]"> Automation</span>
            </h2>
            <p className="text-[#CFCFCF] mb-10 leading-relaxed">
              We build intelligent automation systems that eliminate repetitive
              tasks, nurture your leads, and grow your business — even while you
              sleep.
            </p>
            <button
              type="button"
              className="bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              data-ocid="automation.cta_button"
            >
              Explore Automation Solutions
            </button>
          </div>

          {/* Right: Futuristic dashboard mock */}
          <div className="relative">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-elevated">
              {/* Mock dashboard header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E53935]" />
                  <div className="w-3 h-3 rounded-full bg-[#E53935]/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[#CFCFCF] text-xs font-mono">
                  Automation Dashboard
                </span>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>

              {/* Automation workflow cards */}
              <div className="flex flex-col gap-3">
                {automations.map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 bg-[#121212] border border-white/5 rounded-xl p-4 hover:border-[#E53935]/30 transition-colors group"
                    style={{ animationDelay: `${i * 0.1}s` }}
                    data-ocid={`automation.workflow.${i + 1}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#E53935]/10 border border-[#E53935]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E53935]/20 transition-colors">
                      <Zap size={14} className="text-[#E53935]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-semibold truncate">
                        {item.label}
                      </p>
                      <p className="text-[#CFCFCF] text-xs leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-[#E53935]/5 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
