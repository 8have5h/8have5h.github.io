'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ArrowRight, Sparkles, Code2, Rocket, Calendar, MapPin, Building } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Blog Post Interface
interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  filename: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Welcome to My Blog',
    date: '2024-01-15',
    excerpt: 'An introduction to my blog where I share thoughts on AI, machine learning, and my journey as a computer science student.',
    tags: ['Introduction', 'AI', 'Machine Learning'],
    filename: 'sample-post.md'
  },
];

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [blogContent, setBlogContent] = useState('');
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const loadBlogPost = (post: BlogPost) => {
    setIsLoadingBlog(true);
    setSelectedBlogPost(post);

    fetch(`/posts/${post.filename}`)
      .then(res => res.text())
      .then(text => {
        setBlogContent(text);
        setIsLoadingBlog(false);
      })
      .catch(() => setIsLoadingBlog(false));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-lg border border-slate-200 rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-6">
          {['About', 'Projects', 'Experience', 'Blog', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.toLowerCase()
                  ? 'text-indigo-600'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/profile.jpg" alt="Bhavesh Gurnani" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full ring-4 ring-white"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Available for Summer 2025 Internships</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="bg-gradient-to-r from-slate-900 via-indigo-800 to-violet-800 bg-clip-text text-transparent">
                  Bhavesh Gurnani
                </span>
              </h1>

              <p className="text-2xl md:text-3xl text-slate-700 font-medium max-w-3xl mx-auto">
                AI Researcher & Developer building intelligent systems at IIT Delhi
              </p>

              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Fifth-year CS student specializing in Machine Learning, Bayesian Networks, and Abstract Reasoning.
                Passionate about AI Safety and Mechanistic Interpretability.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  View My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:bhavesh.gurnani2003@gmail.com"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-full font-medium transition-all shadow-lg hover:shadow-xl border border-slate-200"
                >
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </a>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 pt-8">
                <a href="https://github.com/8have5h" target="_blank" rel="noopener noreferrer"
                   className="p-3 bg-white hover:bg-slate-100 rounded-full transition-all shadow-md hover:shadow-lg border border-slate-200">
                  <Github className="w-5 h-5 text-slate-700" />
                </a>
                <a href="https://www.linkedin.com/in/bhavesh-gurnani-410a68217" target="_blank" rel="noopener noreferrer"
                   className="p-3 bg-white hover:bg-slate-100 rounded-full transition-all shadow-md hover:shadow-lg border border-slate-200">
                  <Linkedin className="w-5 h-5 text-slate-700" />
                </a>
                <a href="mailto:bhavesh.gurnani2003@gmail.com"
                   className="p-3 bg-white hover:bg-slate-100 rounded-full transition-all shadow-md hover:shadow-lg border border-slate-200">
                  <Mail className="w-5 h-5 text-slate-700" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-2 bg-slate-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'JEE Advanced Rank', value: '116', sublabel: 'AIR 2021' },
              { label: 'CGPA', value: '8.5', sublabel: 'IIT Delhi' },
              { label: 'Projects', value: '9+', sublabel: 'Completed' },
              { label: 'Research Areas', value: '6', sublabel: 'Exploring' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-900 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 bg-clip-text text-transparent">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-700 leading-relaxed text-lg">
                    I&apos;m a fifth-year dual degree student at <strong className="text-indigo-700">IIT Delhi</strong>, pursuing B.Tech + M.Tech in Computer Science & Engineering. My journey began with securing <strong className="text-indigo-700">AIR 116 in JEE Advanced 2021</strong>.
                  </p>
                  <p className="text-slate-700 leading-relaxed text-lg mt-4">
                    My research focuses on <strong className="text-violet-700">Bayesian Networks</strong> for medical diagnosis, <strong className="text-violet-700">Abstract Reasoning</strong> (ARC-AGI Challenge), and <strong className="text-violet-700">AI Safety</strong> through Mechanistic Interpretability.
                  </p>
                  <p className="text-slate-700 leading-relaxed text-lg mt-4">
                    I&apos;m passionate about building intelligent systems that are not just powerful, but also safe and interpretable. Currently working with Prof. Mausam on dialogue systems for medical diagnosis.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-8">
                  {['Machine Learning', 'Deep Learning', 'Bayesian Networks', 'NLP', 'Computer Vision', 'AI Safety'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Skills Progress Bars */}
                {[
                  { name: 'Python & ML Frameworks', level: 95, color: 'bg-indigo-500' },
                  { name: 'C++ & Systems', level: 90, color: 'bg-violet-500' },
                  { name: 'Deep Learning', level: 92, color: 'bg-purple-500' },
                  { name: 'Research & Analysis', level: 88, color: 'bg-pink-500' }
                ].map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm font-medium text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className={`${skill.color} h-2.5 rounded-full transition-all duration-1000`}
                        style={{width: `${skill.level}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Languages',
                  icon: Code2,
                  items: ['Python', 'C++', 'Java', 'JavaScript', 'SML', 'Prolog']
                },
                {
                  title: 'ML & AI',
                  icon: Sparkles,
                  items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas', 'OpenCV']
                },
                {
                  title: 'Tools & Platforms',
                  icon: Rocket,
                  items: ['Git', 'Docker', 'Linux', 'HPC', 'LLVM', 'Jupyter']
                }
              ].map((category, i) => (
                <Card key={i} className="border-2 border-slate-200 hover:border-indigo-300 transition-all hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <category.icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <Badge key={item} variant="outline" className="bg-slate-50 border-slate-300 text-slate-700">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Bento Grid */}
      <section id="projects" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-indigo-800 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-xl text-slate-600">Building the future of AI, one project at a time</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project cards will be added here - continuing in next part due to length */}
              {[
                {
                  title: "Medical Diagnosis AI",
                  subtitle: "Bayesian Networks for Healthcare",
                  description: "Developing intelligent dialogue systems using Bayesian Networks to improve diagnostic accuracy.",
                  tech: ["Python", "Bayesian Networks", "NLP"],
                  color: "indigo",
                  featured: true
                },
                {
                  title: "ARC-AGI Challenge",
                  subtitle: "Abstract Reasoning Research",
                  description: "Exploring program synthesis and few-shot learning for human-like reasoning capabilities.",
                  tech: ["PyTorch", "Program Synthesis", "DFS"],
                  color: "violet",
                  featured: true
                },
                {
                  title: "Game AI Agent",
                  subtitle: "Expert Iteration with MCTS",
                  description: "Implemented advanced game-playing agents using Monte Carlo Tree Search and imitation learning.",
                  tech: ["Python", "MCTS", "RL"],
                  color: "purple"
                },
                {
                  title: "Object-Centric Vision",
                  subtitle: "Diffusion Models & Slot Attention",
                  description: "Built diffusion models for object-centric image generation with UNet architecture.",
                  tech: ["PyTorch", "Diffusion", "VAE"],
                  color: "pink"
                },
                {
                  title: "Table QA System",
                  subtitle: "NLP for Structured Data",
                  description: "Created a system for natural language queries on tabular data with 67% accuracy.",
                  tech: ["Transformers", "Gemma", "NLP"],
                  color: "blue"
                },
                {
                  title: "Compiler Verification",
                  subtitle: "MISRA C & Formal Methods",
                  description: "Implemented static analysis rules and equivalence checking for Clang compiler.",
                  tech: ["C++", "LLVM", "Clang"],
                  color: "emerald"
                }
              ].map((project, i) => (
                <Card
                  key={i}
                  className={`group border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                    project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className={`inline-block px-3 py-1 bg-${project.color}-50 text-${project.color}-700 rounded-full text-xs font-medium mb-4`}>
                      {project.featured ? 'Featured' : 'Project'}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium mb-3">{project.subtitle}</p>
                    <p className="text-slate-700 mb-4 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 bg-clip-text text-transparent">
              Experience
            </h2>

            <div className="space-y-8">
              {[
                {
                  title: "Quantitative Researcher Intern",
                  company: "Ebullient Securities",
                  location: "Gurugram",
                  period: "May 2025 - July 2025",
                  current: true,
                  description: "Building alpha-generation pipelines using LLMs for equity trading strategies."
                },
                {
                  title: "Software/Research Engineer Intern",
                  company: "Compiler AI Labs",
                  location: "New Delhi",
                  period: "May 2024 - July 2024",
                  description: "Implemented MISRA C rules and formal verification for Clang compiler."
                },
                {
                  title: "Teaching Assistant",
                  company: "IIT Delhi",
                  location: "New Delhi",
                  period: "2025",
                  description: "Designing assignments and quizzes for COL333 (Artificial Intelligence) under Prof. Mausam."
                }
              ].map((exp, i) => (
                <div key={i} className="relative pl-8 pb-8 border-l-2 border-slate-200 last:pb-0">
                  <div className={`absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                    exp.current ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-500'
                  } ring-4 ring-white`}></div>

                  <Card className="border-2 border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                          <div className="flex items-center gap-2 text-indigo-600 font-medium mt-1">
                            <Building className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        {exp.current && (
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            Upcoming
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      <p className="text-slate-700">{exp.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-900 to-indigo-800 bg-clip-text text-transparent">
              Latest Thoughts
            </h2>

            {!selectedBlogPost ? (
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => loadBlogPost(post)}
                  >
                    <CardContent className="p-8">
                      <div className="text-sm text-slate-500 mb-2">{post.date}</div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-700 mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-indigo-600 font-medium mt-4 group-hover:gap-3 transition-all">
                        <span>Read more</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedBlogPost(null)}
                  className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  ← Back to all posts
                </button>
                <article className="prose prose-lg max-w-none">
                  {isLoadingBlog ? (
                    <p>Loading...</p>
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{blogContent}</ReactMarkdown>
                  )}
                </article>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-indigo-600 to-violet-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-xl text-indigo-100 mb-12">
              I&apos;m always open to discussing research opportunities, collaborations, or just chatting about AI!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:bhavesh.gurnani2003@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5" />
                Send me an email
              </a>
              <a
                href="https://github.com/8have5h"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transition-all border-2 border-white/20"
              >
                <Github className="w-5 h-5" />
                Check my GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="font-bold text-white text-lg">Bhavesh Gurnani</p>
              <p className="text-sm">© 2025 All rights reserved</p>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/8have5h" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/bhavesh-gurnani-410a68217" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:bhavesh.gurnani2003@gmail.com" className="hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
