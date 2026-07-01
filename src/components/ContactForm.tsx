"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { resume } from "@/data/portfolio";
import { ResumeDownloadButton } from "./ResumeDownloadButton";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      data-animate
      onSubmit={(event) => {
        event.preventDefault();
        event.currentTarget.reset();
        setSent(true);
      }}
      className="border border-white/12 bg-white/[0.03] p-5 sm:p-7 lg:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-white/72">
          Name
          <input suppressHydrationWarning name="name" type="text" required placeholder="Your name" className="min-h-12 border border-white/10 bg-black/45 px-4 text-white outline-none transition placeholder:text-white/28 focus:border-[var(--accent)]" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-white/72">
          Email
          <input suppressHydrationWarning name="email" type="email" required placeholder="you@example.com" className="min-h-12 border border-white/10 bg-black/45 px-4 text-white outline-none transition placeholder:text-white/28 focus:border-[var(--accent)]" />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-medium text-white/72">
        Subject
        <input suppressHydrationWarning name="subject" type="text" required placeholder="What should we build?" className="min-h-12 border border-white/10 bg-black/45 px-4 text-white outline-none transition placeholder:text-white/28 focus:border-[var(--accent)]" />
      </label>

      <label className="mt-4 grid gap-2 text-sm font-medium text-white/72">
        Message
        <textarea suppressHydrationWarning name="message" required rows={6} placeholder="Share the goal, timeline, or problem you want to solve." className="resize-none border border-white/10 bg-black/45 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-[var(--accent)]" />
      </label>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" suppressHydrationWarning className="inline-flex w-full items-center justify-center gap-3 bg-[var(--accent)] px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white sm:w-auto">
          <Send className="size-4" aria-hidden="true" />
          Send Message
        </button>
        {sent ? (
          <p className="text-sm text-[var(--accent)]" role="status">
            Message noted. Use the email link if you want to send it directly.
          </p>
        ) : null}
      </div>
      <ResumeDownloadButton href={resume.href} label={resume.label} placement="inline" />
    </form>
  );
}
