const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We learn about your business, goals, target audience, and competitive landscape.",
  },
  {
    number: "02",
    title: "Strategy",
    desc: "We craft a custom digital strategy tailored to your specific growth objectives.",
  },
  {
    number: "03",
    title: "Creation",
    desc: "Our team builds your assets — websites, content, campaigns, and automation systems.",
  },
  {
    number: "04",
    title: "Launch",
    desc: "We go live with precision, ensuring everything performs from day one.",
  },
  {
    number: "05",
    title: "Optimization",
    desc: "Continuous monitoring, reporting, and refinement to maximize your ROI.",
  },
];

export default function ProcessSection() {
  return (
    <section
      className="bg-[#121212] py-24"
      id="process"
      data-ocid="process.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#E53935] text-sm font-semibold uppercase tracking-widest mb-4">
          Our Process
        </p>
        <h2 className="text-center text-4xl md:text-5xl font-bold font-display text-white mb-6">
          How We Help
          <span className="text-[#E53935]"> Businesses Grow</span>
        </h2>
        <p className="text-center text-[#CFCFCF] max-w-xl mx-auto mb-20">
          A proven 5-step framework that takes your business from where it is to
          where it needs to be.
        </p>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Connector line */}
          <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E53935]/40 to-transparent" />

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center"
                data-ocid={`process.step.${i + 1}`}
              >
                <div className="w-20 h-20 rounded-full bg-[#0A0A0A] border-2 border-[#E53935]/40 flex items-center justify-center mb-6 relative z-10 hover:border-[#E53935] transition-colors hover:shadow-glow-red">
                  <span className="text-[#E53935] font-bold font-display text-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-white font-bold font-display mb-2">
                  {step.title}
                </h3>
                <p className="text-[#CFCFCF] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden flex flex-col gap-0">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-6"
              data-ocid={`process.mobile_step.${i + 1}`}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#0A0A0A] border-2 border-[#E53935]/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#E53935] font-bold text-sm">
                    {step.number}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-[#E53935]/20 my-2" />
                )}
              </div>
              <div className="pb-8 pt-2">
                <h3 className="text-white font-bold font-display mb-1">
                  {step.title}
                </h3>
                <p className="text-[#CFCFCF] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
