'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun } from "lucide-react";
import { NAV_LINKS, CONTACTS, NEWS } from "./data";

// ---------------------------------------------------------------------------
// Theme handling
// ---------------------------------------------------------------------------

function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem("theme");
    } catch {
      stored = null;
    }
    const prefersDark =
      !!window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        window.localStorage.setItem("theme", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return [theme, toggleTheme];
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-white/95 dark:bg-gray-950/95 border-b border-gray-100 dark:border-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/"
            className="text-gray-900 dark:text-white hover:opacity-70 transition-opacity font-medium"
          >
            Bhavesh Gurnani
          </Link>
          <span className="hidden md:inline text-xs md:text-sm text-gray-500 dark:text-gray-500">
            · CS @ IIT Delhi
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-all ${
                isActive(link.href)
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-gray-900 dark:text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-4 py-4 space-y-3 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg transition-colors ${
                isActive(link.href)
                  ? "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50"
                  : "text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

// ---------------------------------------------------------------------------
// Contact list (shared by sidebar + mobile profile)
// ---------------------------------------------------------------------------

export function ContactList({ wrapperClass }: { wrapperClass: string }) {
  return (
    <div className={wrapperClass}>
      {CONTACTS.map((c) => {
        const Icon = c.icon;
        const isExternal =
          !!c.href && !c.href.startsWith("mailto:") && !c.href.startsWith("/");
        return c.href ? (
          <a
            key={c.label}
            href={c.href}
            target={isExternal ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            title={c.label}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{c.label}</span>
          </a>
        ) : (
          <div
            key={c.label}
            className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{c.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar (desktop) + mobile profile
// ---------------------------------------------------------------------------

function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-full md:w-1/3 bg-white dark:bg-gray-950 overflow-hidden flex-col justify-center z-40 md:z-auto px-6 md:px-8">
      <div className="shrink-0 mb-4 md:mb-6">
        <div className="w-full max-w-xs md:max-w-sm mx-auto">
          <div className="rounded-2xl overflow-hidden aspect-square ring-1 ring-border shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="Bhavesh Gurnani"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <ContactList wrapperClass="flex flex-col gap-3 md:gap-4 max-w-xs md:max-w-sm mx-auto w-full" />
    </aside>
  );
}

export function MobileProfile() {
  return (
    <div className="md:hidden mb-8 animate-slide-up">
      <div className="flex flex-col items-center gap-6">
        <div className="w-48 rounded-2xl overflow-hidden aspect-square ring-1 ring-border shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile.jpg"
            alt="Bhavesh Gurnani"
            className="w-full h-full object-cover"
          />
        </div>
        <ContactList wrapperClass="grid grid-cols-2 gap-3 w-full max-w-sm" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// News list (shared by home + /news)
// ---------------------------------------------------------------------------

export function NewsList({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? NEWS.slice(0, limit) : NEWS;
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="group flex gap-3 md:gap-8 py-5 md:py-6 px-4 md:px-5 rounded-lg hover:bg-muted/30 transition-all duration-200 border border-border/50 hover:border-foreground/20"
        >
          <div className="w-20 md:w-32 shrink-0 text-xs font-mono text-foreground/50 pt-0.5">
            {item.date}
          </div>
          <div
            className="flex-1 text-sm text-foreground/80 leading-relaxed news-content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Theme toggle button
// ---------------------------------------------------------------------------

function ThemeToggle({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-all text-gray-700 dark:text-gray-300"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Shell wrapping every page
// ---------------------------------------------------------------------------

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <Sidebar />
      <ThemeToggle theme={theme} toggle={toggleTheme} />
      <main className="flex-1 w-full md:ml-[33.333%] pt-16 md:pt-20">
        {children}
      </main>
    </div>
  );
}
