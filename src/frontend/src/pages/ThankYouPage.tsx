import { motion } from "motion/react";
import { useEffect } from "react";

export default function ThankYouPage() {
  useEffect(() => {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void })
      .fbq;
    fbq?.("track", "Lead");
  }, []);

  return (
    <div
      style={{ backgroundColor: "#0A0A0A" }}
      className="min-h-screen flex flex-col"
    >
      <div className="w-full py-6 flex justify-center">
        <a href="/" data-ocid="thank-you.home_link">
          <img
            src="/assets/llm-logo.png"
            alt="Linux Lab Media"
            className="h-10 w-auto object-contain"
          />
        </a>
      </div>

      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          data-ocid="thank-you.success_state"
          className="w-full max-w-xl flex flex-col items-center justify-center py-16 px-8 rounded-2xl border border-green-500/30 text-center"
          style={{ backgroundColor: "#0d1f12" }}
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-green-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            You're all set!
          </h1>
          <p className="text-[#CFCFCF] text-base max-w-sm">
            We got your info and we'll reach out within 24 hours to talk about
            growing your business.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
