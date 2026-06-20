// src/app/page.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MobileProfile, NewsList } from "@/components/site/Shell";
import { HOME_NEWS_COUNT, NEWS } from "@/components/site/data";

export default function Home() {
  const hasMore = NEWS.length > HOME_NEWS_COUNT;

  return (
    <div className="animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
        <MobileProfile />

        {/* About */}
        <section>
          <h2 className="text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-6 md:mb-8">
            About
          </h2>
          <div className="space-y-3 md:space-y-4 text-sm md:text-base text-foreground/90 leading-relaxed md:leading-[1.8]">
            <p>
              Hi! I&apos;m Bhavesh, a Dual Degree (B.Tech + M.Tech) student in{" "}
              <strong>Computer Science &amp; Engineering</strong> at{" "}
              <a
                href="https://www.iitd.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                IIT Delhi
              </a>
              , graduating in May 2026. I work broadly on natural language
              processing and large language models — spanning diffusion language
              models, dialogue systems, and the security of reasoning models.
            </p>
            <p>
              Most recently, I&apos;m a Research Intern at{" "}
              <a
                href="https://www.microsoft.com/en-us/research/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Microsoft Research
              </a>
              , developing conversational agents for medical diagnosis. I&apos;m
              also an AI Security Intern at the{" "}
              <a
                href="https://www.comp.nus.edu.sg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                National University of Singapore
              </a>{" "}
              (
              <a
                href="http://kisp.comp.nus.edu.sg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                KISP Lab
              </a>
              ) with Prof. Prateek Saxena, studying compute-amplification
              attacks on LLMs.
            </p>
            <p>
              My M.Tech thesis, advised by{" "}
              <a
                href="https://www.cse.iitd.ac.in/~parags/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Prof. Parag Singla
              </a>
              , develops{" "}
              <strong>Hierarchical Masked Diffusion Language Models</strong> for
              controllable, non-autoregressive generation. Earlier, I built
              probabilistic dialogue systems for medical diagnosis with{" "}
              <a
                href="https://www.cse.iitd.ac.in/~mausam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Prof. Mausam
              </a>
              , and worked on post-training infrastructure for long-context
              agentic LLMs at Neosigma.
            </p>
            <p>
              Beyond research, I&apos;ve worked as a Quantitative Researcher at
              Ebullient Securities — building and live-testing alpha signals and
              C++ trading strategies — and on compiler tooling and formal
              verification at CompilerAI Labs under Prof. Sorav Bansal.
            </p>
          </div>
        </section>

        <div className="h-px bg-border my-16 md:my-24" />

        {/* News (recent) */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 md:mb-16">
            <div>
              <p className="text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-3">
                Latest
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                News
              </h2>
            </div>
            {hasMore && (
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 group whitespace-nowrap"
              >
                View all
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            )}
          </div>

          <NewsList limit={HOME_NEWS_COUNT} />
        </section>

        {/* Contact CTA */}
        <div className="mt-20 md:mt-24 pt-16 md:pt-20 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <p className="text-lg md:text-xl text-foreground/80 font-medium max-w-2xl">
              Interested in collaborating or want to chat?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-all duration-200 group whitespace-nowrap shadow-sm hover:shadow-md"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
