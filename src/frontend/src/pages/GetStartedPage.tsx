import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@caffeineai/core-infrastructure";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const CHALLENGE_OPTIONS = [
  "Not enough leads or customers",
  "No time to manage social media",
  "My website looks outdated or isn't converting",
  "I don't know where to start",
];

const BUSINESS_TYPE_OPTIONS = [
  "E-commerce",
  "Restaurant",
  "Professional Services",
  "Real Estate",
  "Healthcare",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under $500/mo",
  "$500 - $1,500/mo",
  "$1,500 - $5,000/mo",
  "$5,000+/mo",
];

type QuizAnswers = {
  challenge: string;
  businessType: string;
  budgetRange: string;
  name: string;
  email: string;
  phone: string;
};

type ContactErrors = {
  name?: string;
  email?: string;
  phone?: string;
};

type SubmitStatus = "idle" | "loading" | "error";

const TOTAL_STEPS = 4;

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
  };
}

function OptionCard({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-ocid="get-started.option"
      className={`w-full text-left rounded-xl border px-5 py-4 transition-colors duration-150 ${
        selected
          ? "border-[#E53935] bg-[#E53935]/10 text-white"
          : "border-white/15 bg-[#1a1a1a] text-white/80 hover:border-[#E53935]/50"
      }`}
    >
      {label}
    </button>
  );
}

export default function GetStartedPage() {
  const { actor } = useActor(createActor);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    challenge: "",
    businessType: "",
    budgetRange: "",
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [utm, setUtm] = useState(getUtmParams());

  useEffect(() => {
    setUtm(getUtmParams());
  }, []);

  function selectAndAdvance(field: keyof QuizAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }

  function validateContact(): boolean {
    const newErrors: ContactErrors = {};
    if (!answers.name.trim()) newErrors.name = "Name is required";
    if (!answers.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!answers.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateContact()) return;
    if (!actor) return;
    setStatus("loading");
    try {
      await actor.submitLeadForm(
        answers.name,
        answers.email,
        answers.phone,
        answers.challenge,
        answers.businessType,
        answers.budgetRange,
        utm.utmSource,
        utm.utmMedium,
        utm.utmCampaign,
        utm.utmContent,
      );
      window.location.href = "/thank-you";
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  function handleContactChange(field: keyof QuizAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const progressPct = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div
      style={{ backgroundColor: "#0A0A0A" }}
      className="min-h-screen flex flex-col"
    >
      <div className="w-full py-6 flex justify-center">
        <a href="/" data-ocid="get-started.home_link">
          <img
            src="/assets/llm-logo.png"
            alt="Linux Lab Media"
            className="h-10 w-auto object-contain"
          />
        </a>
      </div>

      <main className="flex-1 flex items-start justify-center px-4 pb-16">
        <div className="w-full max-w-xl">
          <div className="mb-8">
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-[#E53935]"
                initial={false}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-white/40 text-xs mt-2 text-center">
              Step {step + 1} of {TOTAL_STEPS}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-3xl font-bold text-white mb-2">
                  What's holding your business back right now?
                </h1>
                <p className="text-[#CFCFCF] mb-8">
                  Answer a few quick questions and we'll show you how we can
                  help.
                </p>
                <div className="flex flex-col gap-3">
                  {CHALLENGE_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt}
                      label={opt}
                      selected={answers.challenge === opt}
                      onSelect={() => selectAndAdvance("challenge", opt)}
                    />
                  ))}
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-3xl font-bold text-white mb-8">
                  What type of business do you run?
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BUSINESS_TYPE_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt}
                      label={opt}
                      selected={answers.businessType === opt}
                      onSelect={() => selectAndAdvance("businessType", opt)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="mt-6 text-sm text-white/40 hover:text-white/70 transition-colors"
                  data-ocid="get-started.back_button"
                >
                  ← Back
                </button>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-3xl font-bold text-white mb-8">
                  What's your monthly marketing budget?
                </h1>
                <div className="flex flex-col gap-3">
                  {BUDGET_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt}
                      label={opt}
                      selected={answers.budgetRange === opt}
                      onSelect={() => selectAndAdvance("budgetRange", opt)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-6 text-sm text-white/40 hover:text-white/70 transition-colors"
                  data-ocid="get-started.back_button"
                >
                  ← Back
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="step-3"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                aria-label="Lead contact form"
              >
                <h1 className="text-3xl font-bold text-white mb-2">
                  Almost done! Where should we send your plan?
                </h1>
                <p className="text-[#CFCFCF] mb-8">
                  We'll text or email you within 24 hours.
                </p>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="lead-name"
                      className="text-white text-sm font-medium"
                    >
                      Full Name <span className="text-[#E53935]">*</span>
                    </Label>
                    <Input
                      id="lead-name"
                      data-ocid="get-started.input"
                      type="text"
                      placeholder="John Smith"
                      value={answers.name}
                      onChange={(e) =>
                        handleContactChange("name", e.target.value)
                      }
                      className="bg-[#0A0A0A] border-white/15 text-white placeholder:text-white/30 focus:border-[#E53935] focus:ring-[#E53935]/30"
                    />
                    {errors.name && (
                      <p className="text-[#E53935] text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="lead-email"
                      className="text-white text-sm font-medium"
                    >
                      Email Address <span className="text-[#E53935]">*</span>
                    </Label>
                    <Input
                      id="lead-email"
                      data-ocid="get-started.input"
                      type="email"
                      placeholder="john@yourbusiness.com"
                      value={answers.email}
                      onChange={(e) =>
                        handleContactChange("email", e.target.value)
                      }
                      className="bg-[#0A0A0A] border-white/15 text-white placeholder:text-white/30 focus:border-[#E53935] focus:ring-[#E53935]/30"
                    />
                    {errors.email && (
                      <p className="text-[#E53935] text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="lead-phone"
                      className="text-white text-sm font-medium"
                    >
                      Phone Number <span className="text-[#E53935]">*</span>
                    </Label>
                    <Input
                      id="lead-phone"
                      data-ocid="get-started.input"
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={answers.phone}
                      onChange={(e) =>
                        handleContactChange("phone", e.target.value)
                      }
                      className="bg-[#0A0A0A] border-white/15 text-white placeholder:text-white/30 focus:border-[#E53935] focus:ring-[#E53935]/30"
                    />
                    {errors.phone && (
                      <p className="text-[#E53935] text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {status === "error" && (
                  <p
                    data-ocid="get-started.error_state"
                    className="text-[#E53935] text-sm text-center mt-6"
                  >
                    {errorMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  data-ocid="get-started.submit_button"
                  disabled={status === "loading"}
                  className="w-full h-12 mt-8 text-base font-semibold bg-[#E53935] hover:bg-[#FF3D3D] text-white border-0 transition-all duration-200 rounded-lg"
                >
                  {status === "loading" ? "Submitting..." : "Get My Free Plan"}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-4 text-sm text-white/40 hover:text-white/70 transition-colors block mx-auto"
                  data-ocid="get-started.back_button"
                >
                  ← Back
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
