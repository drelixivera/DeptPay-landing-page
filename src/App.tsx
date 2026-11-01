import { Analytics } from '@vercel/analytics/react';
import { useState, type ReactNode } from "react";
import {
  ArrowRight, Check, X, Search, ListChecks, FileDown, Wallet, Layers, ScanSearch,
} from "lucide-react";
import repDesktop from "./assets/rep-desktop.jpg";
import studentDesktop from "./assets/student-desktop.jpg";

const APP_URL = "https://deptpay-nine.vercel.app/";
const WHATSAPP_NUMBER = "2349138575377"; 
const CONTACT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I'd like to bring DeptPay to my department. Department: ___ Level: ___",
)}`;

/* ---------- shared bits ---------- */

function Button({ href, children, variant = "light" }: { href: string; children: ReactNode; variant?: "light" | "dark" }) {
  const s = variant === "light" ? "bg-white text-ink hover:bg-mist" : "bg-ink text-white hover:bg-brand-deep";
  return (
    <a target="_blank" href={href} className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${s}`}>
      {children}
    </a>
  );
}

function BrowserFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/20 bg-white shadow-2xl shadow-black/40 ${className}`}>
      <div className="flex items-center gap-1.5 bg-ink px-3 py-2" aria-hidden>
        <span className="size-2.5 rounded-full bg-white/30" />
        <span className="size-2.5 rounded-full bg-white/30" />
        <span className="size-2.5 rounded-full bg-white/30" />
      </div>
      <img src={src} alt={alt} className="block w-full" />
    </div>
  );
}

const repAlt = "DeptPay Class Rep Control Center: verified total, pending and approved counts, and a table of student receipts with Inspect buttons";
const studentAlt = "DeptPay Student Portal: select a payment item, see transfer details, and upload a receipt with name and matric number";

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="overflow-hidden bg-brand-deep text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="font-display text-2xl font-extrabold tracking-tight">DeptPay</a>
        <nav className="hidden gap-8 text-sm font-medium sm:flex" aria-label="Main">
          <a href="#sides" className="hover:underline">For students and reps</a>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#faq" className="hover:underline">FAQ</a>
        </nav>
        <Button href={APP_URL}>
          Open DeptPay
        </Button>
      </header>
      <div className="mx-auto max-w-6xl px-6 pt-10 lg:pt-14">
        <div className="max-w-3xl">
          <p className="mb-5 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
            Live for Chemical Engineering, LAUTECH. More departments coming.
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
            Collect class payments without digging through DMs.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Students upload their receipt, name and matric number in one place. Your class rep reviews, approves, and exports a clean PDF. No more scrolling through 120+ chats or copying names onto paper.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={APP_URL}> 
              Open DeptPay <ArrowRight size={18} />
            </Button>
            <a href="#old-way" className="inline-flex items-center rounded-full px-6 py-3 font-semibold ring-1 ring-white/40 hover:bg-white/10">See what changes</a>
          </div>
        </div>
        <div className="relative mx-auto mt-14 max-w-5xl pb-14 md:pb-20">
          <BrowserFrame src={repDesktop} alt={repAlt} />
          <BrowserFrame src={studentDesktop} alt={studentAlt} className="absolute bottom-0 left-0 hidden w-[46%] -translate-x-4 md:block lg:-translate-x-10" />
        </div>
      </div>
    </section>
  );
}

/* ---------- before / after ---------- */

const oldWay = [
  "Rep posts the payment details in the WhatsApp group",
  "Over 120 students send receipts, names and matric numbers by DM",
  "Rep opens every chat and writes each name and matric number on paper",
];
const newWay = [
  "Rep adds the payment item in DeptPay",
  "Students pay, then submit their receipt, name and matric number",
  "Rep sees everyone in one list, approves, and exports a PDF",
];

function OldVsNew() {
  return (
    <section id="old-way" className="mx-auto max-w-6xl scroll-mt-6 px-6 py-24">
      <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Same payment, a lot less chasing.</h2>
      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-bold text-bad">Before: WhatsApp and paper</h3>
          <ul className="mt-5 space-y-4">
            {oldWay.map((t) => (
              <li key={t} className="flex gap-3 text-ink/70"><X className="mt-0.5 shrink-0 text-bad" size={20} />{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-ok">With DeptPay</h3>
          <ul className="mt-5 space-y-4">
            {newWay.map((t) => (
              <li key={t} className="flex gap-3 font-medium"><Check className="mt-0.5 shrink-0 text-ok" size={20} />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- two sides ---------- */

const sides = {
  student: {
    title: "Pay, then submit in under a minute.",
    points: ["Pick the payment item and copy the transfer details", "Enter your full name and matric number", "Upload your bank receipt screenshot or take a photo", "Come back to Track Status to see if it was approved"],
    src: studentDesktop,
    alt: studentAlt,
  },
  rep: {
    title: "See who has paid at a glance.",
    points: ["Search by matric number or name", "Filter by Pending, Approved or Rejected", "Inspect each receipt, then approve it", "Export the approved list as a PDF"],
    src: repDesktop,
    alt: repAlt,
  },
};

function Sides() {
  const [who, setWho] = useState<keyof typeof sides>("student");
  const side = sides[who];
  return (
    <section id="sides" className="scroll-mt-6 bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">One app, two views.</h2>
        <div role="tablist" aria-label="Choose a view" className="mt-8 inline-flex rounded-full bg-mist p-1">
          {(["student", "rep"] as const).map((k) => (
            <button key={k} role="tab" aria-selected={who === k} onClick={() => setWho(k)}
              className={`rounded-full px-6 py-2.5 font-semibold transition-colors ${who === k ? "bg-brand text-white" : "text-ink/70 hover:text-ink"}`}>
              {k === "student" ? "Student" : "Class rep"}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h3 className="text-3xl font-bold tracking-tight">{side.title}</h3>
            <ul className="mt-6 max-w-md space-y-3">
              {side.points.map((p) => (
                <li key={p} className="flex gap-3 text-lg"><Check className="mt-1 shrink-0 text-ok" size={20} />{p}</li>
              ))}
            </ul>
          </div>
          <BrowserFrame src={side.src} alt={side.alt} className="shadow-ink/20" />
        </div>
      </div>
    </section>
  );
}

/* ---------- features ---------- */

const features = [
  { icon: Layers, title: "Payment items", body: "Create an item for each payment, such as a course fee or dues, and filter every list by it." },
  { icon: Search, title: "Search by matric or name", body: "Find any student in seconds, even with 120+ submissions." },
  { icon: ListChecks, title: "Pending, Approved, Rejected", body: "Every submission has a clear status, so nothing slips through." },
  { icon: ScanSearch, title: "Inspect receipts", body: "Open the uploaded receipt, check it, then approve or reject." },
  { icon: Wallet, title: "Totals that add up", body: "See the verified total and how many receipts are still pending." },
  { icon: FileDown, title: "Clean PDF export", body: "Download the approved list of names and matric numbers, ready to submit." },
];

function Features() {
  return (
    <section id="features" className="scroll-mt-6 bg-ink py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Everything a class rep needs, nothing they don’t.</h2>
        <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon className="text-[#5ee0a8]" size={28} />
              <dt className="mt-4 text-xl font-bold">{title}</dt>
              <dd className="mt-2 max-w-xs leading-relaxed text-white/70">{body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const faqs = [
  { q: "What do students need to submit?", a: "Their full name, matric number and a bank receipt screenshot or photo (JPG or PNG). A WhatsApp number is optional." },
  { q: "What happens if a receipt is rejected?", a: "The class rep marks it Rejected. It moves to the Rejected tab so it is easy to follow up." },
  { q: "What does the PDF contain?", a: "A clean list of the approved students’ names and matric numbers." },
  { q: "Can my department or level use DeptPay?", a: "DeptPay is live for Chemical Engineering today. We are opening it to other departments and levels, so get in touch to be next." },
];

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-6 px-6 py-24">
      <h2 className="text-4xl font-bold tracking-tight">Questions, answered.</h2>
      <div className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
              {q}<span className="text-2xl text-brand transition-transform group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="mt-3 max-w-xl leading-relaxed text-ink/70">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- closing + footer ---------- */

function Closing() {
  return (
    <section id="get-started" className="scroll-mt-6 bg-brand px-6 py-24 text-center text-white">
      <h2 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">Next payment, skip the DMs.</h2>
      <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">Class reps in other departments: tell us your department and level, and we’ll set DeptPay up for you.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href={APP_URL}>Open DeptPay <ArrowRight size={18} /></Button>
        <Button href={CONTACT_URL} variant="dark">Bring it to my department</Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-6 py-8 text-sm text-white/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <span className="font-display text-lg font-extrabold text-white">DeptPay</span>
        <span>Department of Chemical Engineering, Ladoke Akintola University of Technology, Ogbomoso</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <OldVsNew />
        <Sides />
        <Features />
        <FAQ />
      </main>
      <Closing />
      <Footer />
      <Analytics />
    </>
  );
}