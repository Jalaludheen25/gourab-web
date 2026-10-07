"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { primaryEmail } from "@/data/site";
import { contactSchema, projectTypes, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error" | "fallback";

const ease = [0.16, 1, 0.3, 1] as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#f0a184]"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between font-mono text-[0.66rem] uppercase tracking-[0.2em] text-steel-400">
      {children}
      {optional && <span className="text-steel-500 normal-case tracking-normal">Optional</span>}
    </label>
  );
}

function mailtoFallback(data: ContactInput) {
  const subject = `Project enquiry — ${data.projectType}`;
  const details = [
    `Name: ${data.name}`,
    data.company && `Company: ${data.company}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    `Project type: ${data.projectType}`,
  ].filter(Boolean);
  const body = `${details.join("\n")}\n\n${data.message}`;
  return `mailto:${primaryEmail.address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", company: "", email: "", phone: "", message: "", website: "" },
  });

  const selectedType = useWatch({ control, name: "projectType" });
  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  async function onSubmit(data: ContactInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSentName(data.name.split(" ")[0] ?? data.name);
        setStatus("success");
        reset();
        return;
      }
      setFallbackHref(mailtoFallback(data));
      setStatus(res.status === 503 ? "fallback" : "error");
    } catch {
      setFallbackHref(mailtoFallback(data));
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.9, ease }}
            role="status"
            aria-live="polite"
            className="relative flex min-h-[560px] flex-col justify-between overflow-hidden border border-white/10 bg-ink p-8 chamfer [--cut:28px] sm:p-12"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-60" />
            <svg viewBox="0 0 120 120" className="relative size-28" aria-hidden>
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease }}
                style={{ originX: "50%", originY: "50%" }}
              />
              <motion.path
                d="M38 62 L53 77 L84 44"
                fill="none"
                stroke="var(--color-steel-50)"
                strokeWidth="3"
                strokeLinecap="square"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease }}
              />
            </svg>
            <div className="relative mt-16">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8, ease }}
                className="eyebrow text-gold"
              >
                Enquiry received
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1, ease }}
                className="mt-5 text-headline font-semibold text-steel-50"
              >
                Thank you{sentName ? `, ${sentName}` : ""}.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="mt-5 max-w-md text-lead text-steel-400"
              >
                Your enquiry is with our team. We&apos;ll be in touch using the details you provided.
              </motion.p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="link-draw mt-10 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-steel-200"
              >
                Send another enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-describedby="form-note"
            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2"
          >
            {/* Honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            <div>
              <Label htmlFor="name">Name</Label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                className="field"
                placeholder="Your full name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
              />
              <FieldError id="name-error" message={errors.name?.message} />
            </div>

            <div>
              <Label htmlFor="company" optional>
                Company
              </Label>
              <input
                id="company"
                type="text"
                autoComplete="organization"
                className="field"
                placeholder="Company or organisation"
                {...register("company")}
              />
              <FieldError id="company-error" message={errors.company?.message} />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className="field"
                placeholder="name@company.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              <FieldError id="email-error" message={errors.email?.message} />
            </div>

            <div>
              <Label htmlFor="phone" optional>
                Phone
              </Label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="field"
                placeholder="+971 …"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                {...register("phone")}
              />
              <FieldError id="phone-error" message={errors.phone?.message} />
            </div>

            <fieldset className="sm:col-span-2" aria-describedby={errors.projectType ? "type-error" : undefined}>
              <legend className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-steel-400">Project type</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {projectTypes.map((t) => (
                  <label key={t} className="relative">
                    <input type="radio" value={t} className="peer sr-only" {...register("projectType")} />
                    <span
                      className={cn(
                        "inline-flex h-11 cursor-pointer items-center px-5 text-sm transition-colors duration-300 chamfer [--cut:8px] peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
                        selectedType === t
                          ? "bg-gold text-obsidian"
                          : "bg-white/[0.04] text-steel-200 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)] hover:bg-white/[0.08]",
                      )}
                    >
                      {t}
                    </span>
                  </label>
                ))}
              </div>
              <FieldError id="type-error" message={errors.projectType?.message} />
            </fieldset>

            <div className="sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                rows={5}
                className="field resize-none"
                placeholder="Tell us about the space, location, timeline and what you have in mind."
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : "message-count"}
                {...register("message")}
              />
              <div className="flex items-start justify-between gap-4">
                <FieldError id="message-error" message={errors.message?.message} />
                <span id="message-count" className="ml-auto mt-2 font-mono text-[0.62rem] text-steel-500">
                  {messageLength} / 4000
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p id="form-note" className="max-w-sm text-sm text-steel-500">
                We use your details only to respond to this enquiry. See our{" "}
                <a href="/privacy" className="link-draw text-steel-300">
                  privacy notice
                </a>
                .
              </p>
              <Button type="submit" size="lg" disabled={status === "sending"} magnetic={false}>
                {status === "sending" ? "Sending…" : "Send enquiry"}
              </Button>
            </div>

            <AnimatePresence>
              {(status === "error" || status === "fallback") && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="border-l-2 border-gold bg-white/[0.03] p-5 text-sm text-steel-300 sm:col-span-2"
                >
                  {status === "fallback"
                    ? "Online submissions aren't available right now."
                    : "Something went wrong sending your enquiry."}{" "}
                  <a href={fallbackHref} className="link-draw text-gold">
                    Send it by email instead
                  </a>{" "}
                  — your message will be pre-filled.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
