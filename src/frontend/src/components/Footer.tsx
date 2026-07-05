import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const serviceLinks = [
  { label: "Website Design & Development", href: "/services" },
  { label: "Social Media Management", href: "/services" },
  { label: "Paid Advertising", href: "/services" },
];

const pageLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Business Growth Solutions", href: "/business-growth" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "linuxlabmedia")}`;

  return (
    <footer
      className="bg-[#121212] border-t-2 border-[#E53935]"
      data-ocid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <img
              src="/assets/llm-logo.png"
              alt="Linux Lab Media"
              className="h-14 w-auto object-contain"
            />
            <p className="text-[#CFCFCF] text-sm leading-relaxed max-w-xs">
              Grow your business with Linux Lab Media. We help SMBs build
              powerful online presences that generate real results.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61579789225378"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#CFCFCF] hover:text-[#E53935] transition-colors"
                data-ocid="footer.facebook_link"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/linuxlabmedia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#CFCFCF] hover:text-[#E53935] transition-colors"
                data-ocid="footer.instagram_link"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#CFCFCF] hover:text-[#E53935] transition-colors"
                data-ocid="footer.linkedin_link"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[#CFCFCF] hover:text-[#E53935] transition-colors"
                data-ocid="footer.twitter_link"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Col 2: Services & Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 font-display text-lg">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-[#CFCFCF] hover:text-[#E53935] transition-colors text-sm"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mt-8 mb-4 font-display text-lg">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {pageLinks.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    className="text-[#CFCFCF] hover:text-[#E53935] transition-colors text-sm"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div itemScope itemType="https://schema.org/LocalBusiness">
            <meta itemProp="name" content="Linux Lab Media" />
            <h4 className="text-white font-semibold mb-6 font-display text-lg">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-[#CFCFCF]">
              <p itemProp="email">
                Email:{" "}
                <a
                  href="mailto:linuxlabmedia@gmail.com"
                  className="hover:text-[#E53935] transition-colors"
                >
                  linuxlabmedia@gmail.com
                </a>
              </p>
              <p itemProp="telephone">
                Phone:{" "}
                <a
                  href="tel:2104058489"
                  className="hover:text-[#E53935] transition-colors"
                >
                  (210) 405-8489
                </a>
              </p>
              <div
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <meta itemProp="addressCountry" content="US" />
                <p className="leading-relaxed">
                  Serving businesses across the United States
                  <br />
                  <span itemProp="addressLocality">Remote-first</span>,
                  results-focused.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CFCFCF]">
          <span>
            © {year} Linux Lab Media. All rights reserved. Built with love using{" "}
            <a
              href={`https://caffeine.ai?${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E53935] transition-colors"
            >
              caffeine.ai
            </a>
          </span>
          <div className="flex gap-6">
            <span
              className="text-[#CFCFCF] hover:text-white cursor-pointer transition-colors"
              aria-label="Privacy Policy"
              data-ocid="footer.privacy_link"
            >
              Privacy Policy
            </span>
            <span
              className="text-[#CFCFCF] hover:text-white cursor-pointer transition-colors"
              aria-label="Terms & Conditions"
              data-ocid="footer.terms_link"
            >
              Terms &amp; Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
