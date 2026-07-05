import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const faqs = [
  {
    question: "How much does a business website design cost?",
    answer:
      "Every Business Website Design and Website Development project at Linux Lab Media is custom quoted based on your goals, functionality needs, design complexity, and integrations. We do not offer one-size-fits-all packages because every business is different. Contact us for a personalized quote that reflects the true investment required to build a high-performing site.",
  },
  {
    question: "What does social media management include?",
    answer:
      "Our Social Media Management services include content creation, Instagram Management, Facebook Management, posting and scheduling, audience growth strategies, monthly reporting, and performance analytics. We handle your entire social presence so you can focus on running your business.",
  },
  {
    question: "How do Facebook and Instagram advertising campaigns work?",
    answer:
      "We design targeted Facebook Advertising and Instagram Advertising campaigns that reach your ideal customers based on demographics, interests, and behaviors. Each campaign includes audience targeting, creative development, budget optimization, conversion tracking, and ongoing performance analytics to maximize your return on investment.",
  },
  {
    question: "How can a website help with lead generation?",
    answer:
      "A professionally built website is one of the most powerful Lead Generation Services available. We integrate lead capture systems, contact forms, call-to-action placements, and SEO foundations that attract qualified visitors and convert them into customers. Our Digital Marketing Agency approach ensures your site works as a 24/7 sales tool.",
  },
  {
    question:
      "What makes Linux Lab Media different from other digital marketing agencies?",
    answer:
      "As a Digital Marketing Agency, we combine personalized service, custom strategies, transparent reporting, and modern technology to deliver real results. We do not use templates or shortcuts. Every Website Design, Social Media Management, and Paid Advertising campaign is built around your specific business goals.",
  },
  {
    question: "How long does website development take?",
    answer:
      "Website Development timelines vary based on project scope. A typical Business Website Design project takes 4 to 8 weeks from discovery to launch. More complex builds with custom integrations may take longer. We provide a clear timeline during our initial consultation so you know exactly what to expect.",
  },
  {
    question: "Do you offer website maintenance after launch?",
    answer:
      "Yes. We offer secure hosting and maintenance for $99 per month, which includes software and security updates, routine maintenance, performance monitoring, website backups, and technical support. This ensures your Website Development investment stays fast, secure, and reliable long after launch.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Linux Lab Media serves businesses across the United States. While we are a remote-first Digital Marketing Agency, we work with clients in major markets including New York, Los Angeles, Chicago, Houston, Phoenix, and many more. Visit our service areas page to see the full list of regions we support.",
  },
  {
    question:
      "Can you manage both Facebook and Instagram advertising together?",
    answer:
      "Absolutely. We specialize in running integrated Facebook Advertising and Instagram Advertising campaigns that work together to maximize reach and conversions. By managing both platforms under one strategy, we ensure consistent messaging, better budget allocation, and clearer performance analytics.",
  },
  {
    question: "How do I get started with Linux Lab Media?",
    answer:
      "Getting started is simple. Visit our contact page and fill out the consultation form with your name, email, phone, business type, and project description. We will review your information and reach out within 24 hours to schedule a discovery call and discuss how our Website Design, Social Media Management, and Lead Generation Services can help your business grow.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-white/10 rounded-xl overflow-hidden"
      style={{ backgroundColor: "#121212" }}
      data-ocid={`faq.item.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
        data-ocid={`faq.toggle.${index + 1}`}
      >
        <h3 className="text-white font-semibold text-base md:text-lg">
          {question}
        </h3>
        <ChevronDown
          size={20}
          className={`text-[#E53935] shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25 }}
          className="px-6 pb-6"
        >
          <p className="text-[#CFCFCF] text-sm leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function FAQPage() {
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
      {/* Simple top bar */}
      <div
        className="border-b border-white/10"
        style={{ backgroundColor: "#121212" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2"
            data-ocid="faq.home_link"
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
              data-ocid="faq.services_link"
            >
              Services
            </a>
            <a
              href="/contact"
              className="text-sm text-white/70 hover:text-[#E53935] transition-colors"
              data-ocid="faq.contact_link"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#E53935] mb-4 px-3 py-1 border border-[#E53935]/30 rounded-full">
            Support
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[#CFCFCF] text-lg max-w-2xl mx-auto">
            Answers to common questions about our Website Design, Social Media
            Management, and Digital Marketing services.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => (
            <FAQItem
              key={f.question}
              question={f.question}
              answer={f.answer}
              index={i}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#CFCFCF] mb-4">
            Still have questions? We are happy to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            data-ocid="faq.cta_button"
          >
            Contact Us
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
