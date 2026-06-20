'use client';

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Github, Linkedin, Send } from "lucide-react";
import { EMAIL, FORMSPREE_ID } from "@/components/site/data";

type Status = "idle" | "sending" | "success" | "error";

const CONTACT_METHODS = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/8have5h",
    href: "https://github.com/8have5h",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "bhavesh-gurnani",
    href: "https://www.linkedin.com/in/bhavesh-gurnani-410a68217",
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const formspreeConfigured = FORMSPREE_ID && FORMSPREE_ID !== "YOUR_FORM_ID";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Fallback: no Formspree ID yet → open the visitor's email client.
    if (!formspreeConfigured) {
      const subject = encodeURIComponent(form.subject || "Hello from your site");
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
      );
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const data = new FormData();
      data.set("name", form.name);
      data.set("email", form.email);
      data.set("_replyto", form.email);
      data.set("_subject", form.subject || "New message from your site");
      data.set("subject", form.subject);
      data.set("message", form.message);

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition";

  return (
    <div className="animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* Left: intro + contact methods */}
          <section className="animate-slide-up">
            <p className="text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-3">
              Contact
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight mb-8">
              Let&apos;s connect
            </h1>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-10">
              Have a question, an idea, or just want to chat about research? Drop
              me a message and I&apos;ll get back to you as soon as I can.
            </p>

            <div className="space-y-3">
              {CONTACT_METHODS.map((m) => {
                const Icon = m.icon;
                const external = !m.href.startsWith("mailto:");
                return (
                  <a
                    key={m.label}
                    href={m.href}
                    target={external ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-start gap-4 group p-4 rounded-lg hover:bg-muted/40 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-muted/60 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {m.label}
                      </p>
                      <p className="text-sm text-foreground/60">{m.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Right: message form */}
          <section
            className="animate-slide-up"
            style={{ animationDelay: "80ms" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground/80 mb-1.5"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={update}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground/80 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground/80 mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={update}
                  placeholder="What's this about?"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground/80 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={form.message}
                  onChange={update}
                  rows={5}
                  placeholder="Your message..."
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send message"}
                <Send className="w-4 h-4" />
              </button>

              {status === "success" && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Thanks! Your message has been sent.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  Something went wrong. Please email me directly at {EMAIL}.
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
