// src/app/news/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewsList } from "@/components/site/Shell";

export const metadata = {
  title: "News · Bhavesh Gurnani",
};

export default function NewsPage() {
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

        <header className="mb-12 md:mb-16">
          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-3">
            Updates
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            News
          </h1>
        </header>

        <NewsList />
      </div>
    </div>
  );
}
