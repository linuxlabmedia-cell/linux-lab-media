import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const scrollLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
];

const pageLinks = [
  { label: "Services", href: "/services" },
  { label: "Business Growth", href: "/business-growth" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#121212] border-b border-white/10 shadow-elevated"
          : "bg-transparent"
      }`}
      data-ocid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center flex-shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Go to top"
          >
            <img
              src="/assets/llm-logo.png"
              alt="Linux Lab Media"
              className="h-12 w-auto object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {scrollLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-white/80 hover:text-[#E53935] transition-colors duration-200"
                data-ocid={`navbar.${link.label.toLowerCase().replace(" ", "-")}_link`}
              >
                {link.label}
              </button>
            ))}
            {pageLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-[#E53935] transition-colors duration-200"
                data-ocid={`navbar.${link.label.toLowerCase().replace(" ", "-")}_link`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Portal */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/portal"
              className="text-sm font-medium text-white/70 hover:text-[#E53935] transition-colors duration-200 border border-white/20 hover:border-[#E53935]/50 px-4 py-2.5 rounded-lg"
              data-ocid="navbar.portal_link"
            >
              Client Portal
            </a>
            <a
              href="/contact"
              className="bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 text-sm"
              data-ocid="navbar.cta_button"
            >
              Book a Consultation
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="navbar.mobile_menu_button"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden bg-[#121212] border-t border-white/10 px-4 py-6 flex flex-col gap-4"
          data-ocid="navbar.mobile_menu"
        >
          {scrollLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="text-left text-white/80 hover:text-[#E53935] transition-colors font-medium py-2"
              data-ocid={`navbar.mobile_${link.label.toLowerCase().replace(" ", "_")}_link`}
            >
              {link.label}
            </button>
          ))}
          {pageLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-left text-white/80 hover:text-[#E53935] transition-colors font-medium py-2 text-sm"
              data-ocid={`navbar.mobile_${link.label.toLowerCase().replace(" ", "_")}_link`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/portal"
            className="text-left text-white/80 hover:text-[#E53935] transition-colors font-medium py-2 text-sm"
            data-ocid="navbar.mobile_portal_link"
          >
            Client Portal
          </a>
          <a
            href="/contact"
            className="mt-2 bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold px-5 py-3 rounded-lg transition-colors duration-200 text-sm w-full text-center block"
            data-ocid="navbar.mobile_cta_button"
          >
            Book a Consultation
          </a>
        </div>
      )}
    </header>
  );
}
