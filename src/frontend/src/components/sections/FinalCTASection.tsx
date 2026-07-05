export default function FinalCTASection() {
  return (
    <section
      className="bg-[#0A0A0A] py-24 relative overflow-hidden"
      id="contact-cta"
      data-ocid="finalcta.section"
    >
      {/* Background decorative elements */}
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

        <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6 leading-tight">
          Ready To Grow Your
          <span className="text-[#E53935]"> Business?</span>
        </h2>
        <p className="text-xl text-[#CFCFCF] mb-12 max-w-2xl mx-auto">
          Let&apos;s build a stronger online presence together. Our team is
          ready to help you generate more leads, more customers, and more
          revenue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-[#E53935] hover:bg-[#FF3D3D] text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-lg shadow-glow-red"
            data-ocid="finalcta.primary_button"
          >
            Schedule A Consultation
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-lg"
            data-ocid="finalcta.secondary_button"
          >
            Get A Free Website Audit
          </a>
        </div>

        <p className="text-[#CFCFCF] text-sm mt-8">
          No commitment required. Free consultation for qualified businesses.
        </p>
      </div>
    </section>
  );
}
