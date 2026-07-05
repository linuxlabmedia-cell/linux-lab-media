import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const BUSINESS_TYPES = [
  "E-commerce",
  "Restaurant",
  "Professional Services",
  "Real Estate",
  "Healthcare",
  "Other",
];

const SERVICE_OPTIONS = [
  "Website Design & Development",
  "Social Media Management",
  "Paid Advertising",
  "Business Automation",
  "Content Creation",
  "Performance Analytics",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  serviceInterested: string[];
  projectDescription: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  serviceInterested?: string;
  projectDescription?: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const { actor } = useActor(createActor);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    serviceInterested: [],
    projectDescription: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.businessType)
      newErrors.businessType = "Business type is required";
    if (form.serviceInterested.length === 0)
      newErrors.serviceInterested = "Please select at least one service";
    if (!form.projectDescription.trim())
      newErrors.projectDescription = "Please describe your project";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (!actor) return;
    setStatus("loading");
    try {
      await actor.submitContactForm(
        form.name,
        form.email,
        form.phone,
        form.businessType,
        `${form.serviceInterested.join(", ")} | ${form.projectDescription}`,
      );
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function toggleService(service: string) {
    setForm((prev) => {
      const exists = prev.serviceInterested.includes(service);
      const next = exists
        ? prev.serviceInterested.filter((s) => s !== service)
        : [...prev.serviceInterested, service];
      return { ...prev, serviceInterested: next };
    });
    if (errors.serviceInterested)
      setErrors((prev) => ({ ...prev, serviceInterested: undefined }));
  }

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
            data-ocid="contactpage.home_link"
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
              data-ocid="contactpage.services_link"
            >
              Services
            </a>
            <a
              href="/faq"
              className="text-sm text-white/70 hover:text-[#E53935] transition-colors"
              data-ocid="contactpage.faq_link"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#E53935] mb-4 px-3 py-1 border border-[#E53935]/30 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            Contact Linux Lab Media
          </h1>
          <p className="text-[#CFCFCF] text-lg max-w-2xl mx-auto">
            Ready to grow your business? Fill out the form below and we will get
            back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                data-ocid="contactpage.success_state"
                className="flex flex-col items-center justify-center py-16 px-8 rounded-2xl border border-green-500/30"
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
                <h3 className="text-2xl font-bold text-white mb-2">
                  Thank you!
                </h3>
                <p className="text-[#CFCFCF] text-center text-base">
                  We will be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/10 p-8 md:p-10 space-y-6"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="cp-name"
                      className="text-white text-sm font-medium"
                    >
                      Full Name <span className="text-[#E53935]">*</span>
                    </Label>
                    <Input
                      id="cp-name"
                      data-ocid="contactpage.input"
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="bg-[#0A0A0A] border-white/15 text-white placeholder:text-white/30 focus:border-[#E53935] focus:ring-[#E53935]/30"
                    />
                    {errors.name && (
                      <p
                        data-ocid="contactpage.field_error"
                        className="text-[#E53935] text-xs mt-1"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="cp-email"
                      className="text-white text-sm font-medium"
                    >
                      Email Address <span className="text-[#E53935]">*</span>
                    </Label>
                    <Input
                      id="cp-email"
                      data-ocid="contactpage.input"
                      type="email"
                      placeholder="john@yourbusiness.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="bg-[#0A0A0A] border-white/15 text-white placeholder:text-white/30 focus:border-[#E53935] focus:ring-[#E53935]/30"
                    />
                    {errors.email && (
                      <p
                        data-ocid="contactpage.field_error"
                        className="text-[#E53935] text-xs mt-1"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="cp-phone"
                      className="text-white text-sm font-medium"
                    >
                      Phone Number <span className="text-[#E53935]">*</span>
                    </Label>
                    <Input
                      id="cp-phone"
                      data-ocid="contactpage.input"
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="bg-[#0A0A0A] border-white/15 text-white placeholder:text-white/30 focus:border-[#E53935] focus:ring-[#E53935]/30"
                    />
                    {errors.phone && (
                      <p
                        data-ocid="contactpage.field_error"
                        className="text-[#E53935] text-xs mt-1"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="cp-business-type"
                      className="text-white text-sm font-medium"
                    >
                      Business Type <span className="text-[#E53935]">*</span>
                    </Label>
                    <Select
                      value={form.businessType}
                      onValueChange={(val) => handleChange("businessType", val)}
                    >
                      <SelectTrigger
                        id="cp-business-type"
                        data-ocid="contactpage.select"
                        className="bg-[#0A0A0A] border-white/15 text-white focus:border-[#E53935] focus:ring-[#E53935]/30"
                      >
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/15">
                        {BUSINESS_TYPES.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="text-white focus:bg-[#E53935]/20 focus:text-white"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.businessType && (
                      <p
                        data-ocid="contactpage.field_error"
                        className="text-[#E53935] text-xs mt-1"
                      >
                        {errors.businessType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-white text-sm font-medium">
                      Service(s) Interested In{" "}
                      <span className="text-[#E53935]">*</span>
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {SERVICE_OPTIONS.map((svc) => {
                        const svcId = `cp-service-${svc.replace(/\s+/g, "-").toLowerCase()}`;
                        return (
                          <label
                            key={svc}
                            htmlFor={svcId}
                            className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#0A0A0A] px-4 py-3 cursor-pointer hover:border-[#E53935]/40 transition-colors"
                          >
                            <Checkbox
                              id={svcId}
                              checked={form.serviceInterested.includes(svc)}
                              onCheckedChange={() => toggleService(svc)}
                              className="border-white/30 data-[state=checked]:bg-[#E53935] data-[state=checked]:border-[#E53935]"
                              data-ocid="contactpage.checkbox"
                            />
                            <span className="text-sm text-white">{svc}</span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.serviceInterested && (
                      <p
                        data-ocid="contactpage.field_error"
                        className="text-[#E53935] text-xs mt-1"
                      >
                        {errors.serviceInterested}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="cp-description"
                    className="text-white text-sm font-medium"
                  >
                    Project Description{" "}
                    <span className="text-[#E53935]">*</span>
                  </Label>
                  <Textarea
                    id="cp-description"
                    data-ocid="contactpage.textarea"
                    placeholder="Tell us about your business, goals, and what you're looking to build or improve..."
                    value={form.projectDescription}
                    onChange={(e) =>
                      handleChange("projectDescription", e.target.value)
                    }
                    rows={5}
                    className="bg-[#0A0A0A] border-white/15 text-white placeholder:text-white/30 focus:border-[#E53935] focus:ring-[#E53935]/30 resize-none"
                  />
                  {errors.projectDescription && (
                    <p
                      data-ocid="contactpage.field_error"
                      className="text-[#E53935] text-xs mt-1"
                    >
                      {errors.projectDescription}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p
                    data-ocid="contactpage.error_state"
                    className="text-[#E53935] text-sm text-center"
                  >
                    {errorMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  data-ocid="contactpage.submit_button"
                  disabled={status === "loading"}
                  className="w-full h-12 text-base font-semibold bg-[#E53935] hover:bg-[#FF3D3D] text-white border-0 transition-all duration-200 rounded-lg"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Request a Consultation"
                  )}
                </Button>

                {status === "loading" && (
                  <p
                    data-ocid="contactpage.loading_state"
                    className="text-[#CFCFCF] text-xs text-center"
                  >
                    Sending your request...
                  </p>
                )}
              </motion.form>
            )}
          </div>

          {/* Sidebar info */}
          <div className="flex flex-col gap-8">
            <div
              className="rounded-2xl border border-white/10 p-8"
              style={{ backgroundColor: "#121212" }}
            >
              <h2 className="text-white font-bold font-display text-xl mb-6">
                Business Info
              </h2>
              <div className="flex flex-col gap-5 text-sm text-[#CFCFCF]">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-[#E53935] shrink-0 mt-0.5"
                  />
                  <span>Serving businesses across the United States</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#E53935] shrink-0 mt-0.5" />
                  <a
                    href="mailto:linuxlabmedia@gmail.com"
                    className="hover:text-[#E53935] transition-colors"
                  >
                    linuxlabmedia@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#E53935] shrink-0 mt-0.5" />
                  <a
                    href="tel:2104058489"
                    className="hover:text-[#E53935] transition-colors"
                  >
                    (210) 405-8489
                  </a>
                </div>
              </div>
            </div>
          </div>
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
            <a href="/faq" className="hover:text-[#E53935] transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
