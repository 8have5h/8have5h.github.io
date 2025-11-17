// src/components/PortfolioClient.tsx
'use client'; // Mark this as a Client Component

import React, { useState, useEffect } from "react"; // Removed unused CSSProperties
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Code, Rocket, Award, Briefcase, User, Github, Linkedin, Mail, ExternalLink, BrainCircuit, BookOpen, CalendarClock } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- Type Definitions ---
interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  technologies: string[];
  projectLink?: string;
  githubLink?: string;
  color?: 'blue' | 'purple' | 'green' | 'yellow' | 'red' | 'gray';
}

interface AchievementCardProps {
  title: string;
  description: string;
  icon: string; // Assuming icon is a string/emoji
  color?: 'yellow' | 'blue' | 'purple' | 'green';
}

// --- Helper Components (Corrected Typing - Infer Return Type) ---

function ProjectCard({
  title,
  subtitle,
  description,
  details,
  technologies,
  projectLink,
  githubLink,
  color = 'gray'
}: ProjectCardProps) {
  const colorClasses = {
    blue: 'border-l-blue-500 hover:border-l-blue-600 bg-gradient-to-r from-blue-50/50 to-white',
    purple: 'border-l-purple-500 hover:border-l-purple-600 bg-gradient-to-r from-purple-50/50 to-white',
    green: 'border-l-emerald-500 hover:border-l-emerald-600 bg-gradient-to-r from-emerald-50/50 to-white',
    yellow: 'border-l-amber-500 hover:border-l-amber-600 bg-gradient-to-r from-amber-50/50 to-white',
    red: 'border-l-rose-500 hover:border-l-rose-600 bg-gradient-to-r from-rose-50/50 to-white',
    gray: 'border-l-gray-400 hover:border-l-gray-500 bg-gradient-to-r from-gray-50/50 to-white',
  };

  const titleColorClasses = {
    blue: 'text-blue-700',
    purple: 'text-purple-700',
    green: 'text-emerald-700',
    yellow: 'text-amber-700',
    red: 'text-rose-700',
    gray: 'text-gray-700',
  };

  const badgeColorClasses = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    yellow: 'bg-amber-100 text-amber-700 border-amber-200',
    red: 'bg-rose-100 text-rose-700 border-rose-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const buttonColorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    green: 'bg-emerald-600 hover:bg-emerald-700',
    yellow: 'bg-amber-600 hover:bg-amber-700',
    red: 'bg-rose-600 hover:bg-rose-700',
    gray: 'bg-gray-600 hover:bg-gray-700',
  };

  return (
    <Card className={`group ${colorClasses[color]} border-l-4 border-t border-r border-b border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col`}>
      <CardContent className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className={`text-2xl font-bold mb-2 ${titleColorClasses[color]}`}>{title}</h3>
        <p className="text-base text-gray-600 mb-4 font-medium">{subtitle}</p>
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3 tracking-wide">Key Highlights</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
           <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3 tracking-wide">Technologies</h4>
           <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className={`${badgeColorClasses[color]} text-xs font-medium`}>
                  {tech}
                </Badge>
              ))}
            </div>
        </div>

        {(projectLink || githubLink) && (
          <div className="mt-auto pt-4 flex flex-wrap gap-3">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-lg bg-gray-900 hover:bg-gray-800 transition-all text-white font-medium shadow-md hover:shadow-lg"
              >
                <Github className="w-4 h-4" /> View Code
              </a>
            )}
            {projectLink && (
               <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-lg ${buttonColorClasses[color]} transition-all text-white font-medium shadow-md hover:shadow-lg`}
              >
                <ExternalLink className="w-4 h-4" /> View Project
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// AchievementCard Component
function AchievementCard({
    title,
    description,
    icon,
    color = 'yellow'
}: AchievementCardProps) {
    const colorClasses = {
        yellow: 'text-amber-600 border-amber-400 bg-amber-50',
        blue: 'text-blue-600 border-blue-400 bg-blue-50',
        purple: 'text-purple-600 border-purple-400 bg-purple-50',
        green: 'text-emerald-600 border-emerald-400 bg-emerald-50',
    };

    const titleColorClasses = {
        yellow: 'text-amber-900',
        blue: 'text-blue-900',
        purple: 'text-purple-900',
        green: 'text-emerald-900',
    };

  return (
    <div className={`flex items-start space-x-4 p-5 ${colorClasses[color]} rounded-xl border-l-4 ${colorClasses[color]} transition-all duration-200 hover:shadow-md border border-${color === 'yellow' ? 'amber' : color}-200`}>
      <span className={`text-3xl ${colorClasses[color]}`}>{icon}</span>
      <div>
        <h4 className={`font-bold ${titleColorClasses[color]} text-base mb-1`}>{title}</h4>
        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Blog Post Interface
interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  filename: string;
}

// Blog posts data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Welcome to My Blog',
    date: '2024-01-15',
    excerpt: 'An introduction to my blog where I share thoughts on AI, machine learning, and my journey as a computer science student.',
    tags: ['Introduction', 'AI', 'Machine Learning'],
    filename: 'sample-post.md'
  },
  // Add more blog posts here as you create them
];

// Blog Tab Content Component with Enhanced Features
function BlogTabContent() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postContent, setPostContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadPost = (post: BlogPost) => {
    setIsLoading(true);
    setError(null);
    setSelectedPost(post);

    fetch(`/posts/${post.filename}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not fetch blog post: ${response.statusText}`);
        }
        return response.text();
      })
      .then(text => {
        setPostContent(text);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blog post:", err);
        setError(`Failed to load blog post: ${err.message}`);
        setIsLoading(false);
      });
  };

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
        Blog & Thoughts
      </h2>

      {!selectedPost ? (
        <div className="max-w-5xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search posts by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl shadow-sm">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-700 text-lg font-semibold mb-2">No posts found</p>
              <p className="text-gray-500 text-sm">Try a different search term or check back later for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => loadPost(post)}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-2 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-gray-500 mb-3 font-medium">{post.date}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <p className="text-gray-600 text-sm font-medium">
              More posts coming soon! Stay tuned for articles on AI, ML, and my research journey.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedPost(null);
              setPostContent('');
            }}
            className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 font-medium transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Posts
          </button>

          {/* Post Content */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4 pb-6 border-b border-gray-200">
                <span className="font-medium">{selectedPost.date}</span>
                <span className="text-gray-400">•</span>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 border-purple-300 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Loading post...</p>
              </div>
            )}
            {error && (
              <p className="text-center text-red-700 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </p>
            )}
            {!isLoading && !error && postContent && (
              <article className="prose prose-gray max-w-none lg:prose-lg
                                prose-headings:text-gray-900 prose-headings:font-bold
                                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                                prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:underline prose-a:font-medium
                                prose-strong:text-gray-900 prose-strong:font-bold
                                prose-code:text-purple-700 prose-code:bg-purple-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-medium prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                                prose-pre:bg-gray-900 prose-pre:border-2 prose-pre:border-gray-700 prose-pre:rounded-xl prose-pre:p-4 prose-pre:shadow-lg
                                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-700
                                prose-li:marker:text-blue-500 prose-li:text-gray-700
                                prose-ul:my-4 prose-ol:my-4
                                prose-p:text-gray-700 prose-p:leading-relaxed
                                prose-img:rounded-xl prose-img:shadow-xl prose-img:border-2 prose-img:border-gray-200">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{postContent}</ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


// --- Main Portfolio Component (Corrected Typing - Infer Return Type) ---

export default function Portfolio() { // Removed explicit : JSX.Element return type
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-white text-gray-900 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section - Modern Minimalist */}
      <header className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>

        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '4s'}}></div>

        <div className="container mx-auto px-6 z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Profile Image */}
            <div className="mb-8 inline-block">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/profile.jpg"
                    alt="Bhavesh Gurnani"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent leading-tight">
              Bhavesh Gurnani
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
              Computer Science & Engineering @ IIT Delhi
            </p>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Fifth-year student passionate about AI, Machine Learning, and building intelligent systems.
              Researching Bayesian Networks, Game AI, and Abstract Reasoning.
            </p>

            {/* Social Links - Redesigned */}
            <div className="flex justify-center gap-4 mb-12">
              <a href="https://github.com/8have5h" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
                 aria-label="GitHub Profile">
                <Github className="w-5 h-5" />
                <span className="font-medium">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/bhavesh-gurnani-410a68217" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
                 aria-label="LinkedIn Profile">
                <Linkedin className="w-5 h-5" />
                <span className="font-medium">LinkedIn</span>
              </a>
              <a href="mailto:bhavesh.gurnani2003@gmail.com"
                 className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-50 transition-all hover:scale-105 shadow-lg border-2 border-gray-200"
                 aria-label="Send Email">
                <Mail className="w-5 h-5" />
                <span className="font-medium">Email</span>
              </a>
            </div>

            {/* Skills Tags - Modern Design */}
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-700 rounded-full text-sm font-medium shadow-md border border-blue-100">Machine Learning</span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm text-purple-700 rounded-full text-sm font-medium shadow-md border border-purple-100">Deep Learning</span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-medium shadow-md border border-emerald-100">Python</span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm text-amber-700 rounded-full text-sm font-medium shadow-md border border-amber-100">C++</span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm text-rose-700 rounded-full text-sm font-medium shadow-md border border-rose-100">NLP</span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-medium shadow-md border border-indigo-100">AI Safety</span>
              <span className="px-4 py-2 bg-white/80 backdrop-blur-sm text-cyan-700 rounded-full text-sm font-medium shadow-md border border-cyan-100">Bayesian Networks</span>
            </div>
          </div>
        </div>

        <a href="#main-content"
           className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-gray-400 hover:text-gray-700 transition-colors"
           aria-label="Scroll down to main content">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </a>
      </header>

      <main id="main-content" className="container mx-auto px-4 sm:px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
        <Tabs defaultValue="about" className="mb-16">
           <div className="sticky top-4 z-40 mb-16">
           <TabsList className="grid w-full max-w-4xl mx-auto h-14 grid-cols-3 sm:grid-cols-5 bg-white/90 backdrop-blur-lg p-1.5 rounded-2xl shadow-xl border border-gray-200">
             <TabsTrigger value="about" aria-label="About Me" className="h-11 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md text-gray-600 flex items-center justify-center gap-2 text-sm sm:text-base py-2 rounded-xl transition-all font-medium hover:text-blue-600">
               <User className="w-4 h-4 sm:w-5 sm:h-5" /> About
             </TabsTrigger>
             <TabsTrigger value="projects" aria-label="My Projects" className="h-11 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md text-gray-600 flex items-center justify-center gap-2 text-sm sm:text-base py-2 rounded-xl transition-all font-medium hover:text-blue-600">
               <Code className="w-4 h-4 sm:w-5 sm:h-5" /> Projects
             </TabsTrigger>
             <TabsTrigger value="experience" aria-label="My Experience" className="h-11 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md text-gray-600 flex items-center justify-center gap-2 text-sm sm:text-base py-2 rounded-xl transition-all font-medium hover:text-blue-600">
               <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" /> Experience
             </TabsTrigger>
             <TabsTrigger value="achievements" aria-label="My Achievements" className="h-11 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md text-gray-600 flex items-center justify-center gap-2 text-sm sm:text-base py-2 rounded-xl transition-all font-medium hover:text-blue-600">
               <Award className="w-4 h-4 sm:w-5 sm:h-5" /> Achievements
             </TabsTrigger>
              <TabsTrigger value="blog" aria-label="My Blog" className="h-11 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md text-gray-600 flex items-center justify-center gap-2 text-sm sm:text-base py-2 rounded-xl transition-all font-medium hover:text-blue-600">
               <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" /> Blog
             </TabsTrigger>
           </TabsList>
           </div>

          {/* About Tab Content */}
         <TabsContent value="about">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 mb-12 shadow-lg">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                  <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden border-4 border-blue-500/30">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img
                       src="/profile.jpg"
                       alt="Bhavesh Gurnani"
                       className="w-full h-full object-cover"
                     />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">Bhavesh Gurnani</h3>
                    <p className="text-gray-700 mb-5 text-lg leading-relaxed">
                      I&apos;m a passionate Computer Science student at IIT Delhi, driven by a strong foundation in mathematics and programming.
                      I love exploring the frontiers of AI, particularly the intersections of machine learning, computer vision, and natural language processing.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                       <a href="mailto:bhavesh.gurnani2003@gmail.com" className="inline-flex items-center group">
                         <Badge variant="outline" className="bg-blue-50 border-blue-300 text-blue-700 group-hover:bg-blue-100 transition-colors">
                           <Mail className="w-3 h-3 mr-1" /> Email Me
                         </Badge>
                       </a>
                       <a href="https://github.com/8have5h" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group">
                         <Badge variant="outline" className="bg-emerald-50 border-emerald-300 text-emerald-700 group-hover:bg-emerald-100 transition-colors">
                           <Github className="w-3 h-3 mr-1" /> GitHub
                         </Badge>
                       </a>
                       <a href="https://www.linkedin.com/in/bhavesh-gurnani-410a68217" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group">
                         <Badge variant="outline" className="bg-purple-50 border-purple-300 text-purple-700 group-hover:bg-purple-100 transition-colors">
                           <Linkedin className="w-3 h-3 mr-1" /> LinkedIn
                         </Badge>
                       </a>
                    </div>
                  </div>
                </div>
                <div className="prose max-w-none text-gray-700 prose-p:leading-relaxed prose-headings:text-gray-900 prose-strong:font-bold">
                   <p className="text-lg">
                    Currently, I&apos;m pursuing a dual degree (B.Tech + M.Tech) in Computer Science & Engineering at IIT Delhi. My academic journey began strong, achieving <strong className="text-amber-700">AIR 116 in JEE Advanced</strong>, which opened the doors to this incredible institution.
                  </p>
                  <p className="text-lg">
                    My core fascination lies within <strong className="text-blue-700">Machine Learning</strong> and <strong className="text-purple-700">Deep Learning</strong>. I&apos;m particularly interested in understanding how these complex models work, which leads me to the field of <strong className="text-indigo-700">Mechanistic Interpretability</strong> – trying to reverse engineer neural networks to ensure AI systems are safe and aligned with human values (<strong className="text-indigo-700">AI Safety</strong>).
                  </p>
                  <p className="text-lg">
                    I&apos;m actively working on challenging problems like the <strong className="text-emerald-700">ARC-AGI challenge</strong>, exploring techniques from program synthesis to model fine-tuning. I also have a strong background in <strong className="text-amber-700">Competitive Programming</strong> which sharpens my algorithmic thinking.
                  </p>
                  <p className="text-lg">
                    I&apos;m always eager to learn, collaborate, and tackle complex problems. If you&apos;re interested in similar areas, feel free to reach out!
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                    <Terminal className="mr-3 text-blue-600" /> Technical Toolkit
                  </h3>
                   <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-blue-800 mb-3 text-sm uppercase tracking-wider">Programming Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Python", "C++", "C", "Java", "JavaScript", "SML", "Prolog", "VHDL", "ml-lex", "ml-yacc"].map((skill, i) => (
                           <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-700 border border-blue-300 font-medium">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-800 mb-3 text-sm uppercase tracking-wider">Frameworks & Libraries</h4>
                      <div className="flex flex-wrap gap-2">
                        {["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "NumPy", "Pandas", "OpenCV", "Django", "Flask", "React", "LLVM"].map((skill, i) => (
                          <Badge key={i} variant="secondary" className="bg-emerald-100 text-emerald-700 border border-emerald-300 font-medium">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                       <h4 className="font-bold text-purple-800 mb-3 text-sm uppercase tracking-wider">Tools & Platforms</h4>
                       <div className="flex flex-wrap gap-2">
                         {["Git", "Docker", "Linux", "HPC", "VS Code", "Jupyter"].map((skill, i) => (
                            <Badge key={i} variant="secondary" className="bg-purple-100 text-purple-700 border border-purple-300 font-medium">{skill}</Badge>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                    <BrainCircuit className="mr-3 text-purple-600" /> Research Interests
                  </h3>
                  <div className="space-y-4">
                     <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 border-l-4 border-purple-500 rounded-lg hover:shadow-md transition-all duration-200">
                      <h4 className="font-semibold text-purple-800 mb-1">Machine Learning & Deep Learning</h4>
                      <p className="text-sm text-gray-700">Neural networks, optimization, RL, generative models</p>
                    </div>
                     <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100/50 border-l-4 border-indigo-500 rounded-lg hover:shadow-md transition-all duration-200">
                      <h4 className="font-semibold text-indigo-800 mb-1">Mechanistic Interpretability & AI Safety</h4>
                      <p className="text-sm text-gray-700">Understanding NNs, alignment, robustness</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 border-l-4 border-blue-500 rounded-lg hover:shadow-md transition-all duration-200">
                      <h4 className="font-semibold text-blue-800 mb-1">Natural Language Processing</h4>
                      <p className="text-sm text-gray-700">LLMs, generation, summarization, QA</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-l-4 border-emerald-500 rounded-lg hover:shadow-md transition-all duration-200">
                      <h4 className="font-semibold text-emerald-800 mb-1">Computer Vision</h4>
                      <p className="text-sm text-gray-700">Object-centric learning, diffusion models</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 border-l-4 border-amber-500 rounded-lg hover:shadow-md transition-all duration-200">
                      <h4 className="font-semibold text-amber-800 mb-1">Abstract Reasoning & AGI</h4>
                       <p className="text-sm text-gray-700">ARC challenge, program synthesis, cognitive architectures</p>
                    </div>
                     <div className="p-4 bg-gradient-to-r from-rose-50 to-rose-100/50 border-l-4 border-rose-500 rounded-lg hover:shadow-md transition-all duration-200">
                       <h4 className="font-semibold text-rose-800 mb-1">Quantitative Finance & HFT</h4>
                       <p className="text-sm text-gray-700">Algorithmic trading strategies, market microstructure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab Content */}
          <TabsContent value="projects" className="space-y-12 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Things I&apos;ve Built & Explored {/* Corrected: &apos; -> &apos; */}
            </h2>

            <ProjectCard
              title="Improving Dialogue Systems for Medical Diagnosis"
              subtitle="B.Tech Project under Prof. Mausam (July 2024 – May 2025)"
              description="Developing advanced dialogue systems for medical diagnosis using Bayesian Networks to model causal disease-symptom relationships and improve diagnostic accuracy."
              details={[
                "Modeled large-scale medical text data as Bayesian Networks to capture causal disease–symptom relationships",
                "Designed novel inference techniques for Bayesian Networks",
                "Improved performance over standard RAG (Retrieval-Augmented Generation) systems",
                "Created an intelligent dialogue system for medical diagnosis",
                "Working on probabilistic reasoning for accurate disease prediction"
              ]}
              technologies={["Python", "Bayesian Networks", "NLP", "RAG Systems", "Medical AI", "Dialogue Systems"]}
              color="purple"
              githubLink="https://github.com/8have5h"
            />

            <ProjectCard
              title="ARC-AGI Challenge Exploration"
              subtitle="Tackling Abstract Reasoning via ML & Program Synthesis"
              description="Exploring solutions for the Abstraction and Reasoning Corpus (ARC) challenge, aiming to build AI with human-like fluid intelligence. This involves understanding core patterns from few examples."
              details={[
                "Implemented test-time fine-tuning on models for few-shot adaptation",
                "Utilized Depth First Search (DFS) during inference for structured problem-solving",
                "Investigated program synthesis approaches to generate solutions",
                "Currently exploring hybrid methods and looking for collaborators!",
                "Focusing on building generalizable reasoning capabilities"
              ]}
              technologies={["Python", "PyTorch", "Few-Shot Learning", "Program Synthesis", "Search Algorithms", "AGI Research"]}
              color="yellow"
              githubLink="https://github.com/8have5h/ARC-AGI-Task"
              projectLink="https://arcprize.org/"
            />

            <ProjectCard
              title="Expert Iteration for Alternating Markov Games"
              subtitle="Independent Project (Aug 2023 - Oct 2023)"
              description="Implemented Expert Iteration Algorithm using Monte Carlo Tree Search for strategic board games, comparing performance against traditional minimax approaches with custom-trained features."
              details={[
                "Implemented Expert Iteration Algorithm using Monte Carlo Tree Search (MCTS) in Hex game",
                "Tested on games like Rollerball and chess variations",
                "Compared performance to Iterative Deepening Minimax algorithm",
                "Created custom features and trained weights using imitation learning",
                "Analyzed trade-offs between search algorithms and learned heuristics"
              ]}
              technologies={["Python", "MCTS", "Reinforcement Learning", "Minimax", "Imitation Learning", "Game AI"]}
              color="blue"
              githubLink="https://github.com/8have5h/COL333-Assignment-1"
            />

            <ProjectCard
              title="Object-Centric Vision Models"
              subtitle="Deep Learning for Object Identification & Generation"
              description="I implemented computer vision models focused on identifying and generating individual objects within images, improving interpretability and generation quality."
              details={[
                "Applied Slot Attention on CLEVRTex for unsupervised object discovery",
                "Developed a slot-conditioned diffusion model using PyTorch and VAEs",
                "Built UNet architecture from scratch with Residual and Transformer blocks",
                "Implemented Adjusted Rand Index (ARI) for evaluation",
                "Created visualization tools for model analysis"
              ]}
              technologies={["PyTorch", "Computer Vision", "Diffusion Models", "UNet", "Transformers", "VAE"]}
              color="purple"
              githubLink="https://github.com/8have5h/COL775-Assignment-2"
            />

            <ProjectCard
              title="Smart Table QA System"
              subtitle="Table Cell Classification for Question Answering"
              description="I created a system to analyze tables and pinpoint cells containing answers to natural language questions, automating data extraction from tabular data."
              details={[
                "Built transformer-based models for column and row prediction",
                "Integrated models to identify relevant cells from NL queries",
                "Prompt-tuned the Gemma model, significantly boosting accuracy",
                "Achieved 67% exact match accuracy (up from 43% baseline)",
                "Developed an evaluation framework for performance measurement"
              ]}
              technologies={["Transformers", "NLP", "Prompt Tuning", "LLMs", "Gemma", "Python"]}
              color="green"
               githubLink="https://github.com/8have5h/COL772-Assignment-2"
            />

            <ProjectCard
              title="Natural Language Math Solver"
              subtitle="Text to Mathematical Program Converter"
              description="I engineered an end-to-end system converting natural language math word problems into executable formulas to compute the final answer."
              details={[
                "Implemented Seq2Seq models (encoder-decoder architecture)",
                "Utilized Bi-LSTM with GloVe embeddings and Bahdanau attention",
                "Created a custom interpreter for executing generated formulas",
                "Achieved 67% exact match / 73% execution accuracy via beam search",
                "Improved to 78% / 81% by fine-tuning BERT as the encoder"
              ]}
              technologies={["Seq2Seq", "LSTM", "BERT", "NLP", "Attention", "Beam Search"]}
              color="yellow"
              githubLink="https://github.com/8have5h/COL772-Assignment-1"
            />

            <ProjectCard
              title="BioMed Simplifier"
              subtitle="Lay Summarization of Biomedical Research"
              description="I developed an AI to transform complex biomedical papers into understandable summaries for non-experts, aiming to bridge the science communication gap."
              details={[
                "Fine-tuned Pre-trained Language Models (PLMs) on HPC",
                "Employed Parameter-Efficient Fine-Tuning (PEFT) like LoRA",
                "Used mixed-precision training for efficiency",
                "Benchmarked against Flan-T5 and BioGPT",
                "Evaluated summaries on relevance, readability, and factuality"
              ]}
              technologies={["PLMs", "PEFT", "LoRA", "Flan-T5", "BioGPT", "Summarization", "HPC"]}
              color="red"
              githubLink="https://github.com/8have5h/COL774-Project"
            />

            <ProjectCard
              title="Lexer, Parser & Interpreter for Rational Numbers"
              subtitle="COL226 under Prof. S. Arun Kumar (April 2023)"
              description="Built a complete language implementation supporting rational numbers, BigInt operations, with custom lexer, parser, and interpreter from scratch."
              details={[
                "Built custom BigInt and Rational module in SML",
                "Used ML-Lex and ML-Yacc to generate Abstract Syntax Tree (AST)",
                "Implemented static scoping with various maps",
                "Built an evaluator that performs DFS on AST",
                "Support for variables, conditionals, loops, recursion, BigInt, rational & logical operations, and I/O"
              ]}
              technologies={["SML", "ML-Lex", "ML-Yacc", "Compiler Design", "Functional Programming", "AST"]}
              color="purple"
              githubLink="https://github.com/8have5h"
            />

            <ProjectCard
              title="Custom Multi-Threading Library"
              subtitle="COP290 under Prof. Abhilash Jindal (Feb 2023 - March 2023)"
              description="Developed a custom multithreading library in C using ucontext, simulating parallel thread execution and comparing performance with pthread library."
              details={[
                "Used ucontext library in C to build custom multithreading library",
                "Simulated and tested parallel thread execution",
                "Implemented word count application using HashMap across multiple files",
                "Compared performance to built-in pthread library",
                "Varied factors like word frequency and file count for performance analysis"
              ]}
              technologies={["C", "ucontext", "Multithreading", "Systems Programming", "Performance Analysis", "pthread"]}
              color="green"
              githubLink="https://github.com/8have5h"
            />
          </TabsContent>

          {/* Experience Tab Content */}
          <TabsContent value="experience">
             <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              My Journey & Experience
            </h2>
            <div className="space-y-12 max-w-5xl mx-auto">
              <div className="relative border-l-2 border-gray-300 pl-8 ml-4 space-y-12">
                 {/* Upcoming Internship */}
                 <div className="relative">
                   <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-amber-500 border-4 border-white shadow-lg animate-pulse"></div>
                   <div className="mb-4 flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">May 2025 – July 2025 (Upcoming)</span>
                    <CalendarClock className="w-4 h-4 text-amber-600"/>
                  </div>
                   <h3 className="text-2xl font-bold mb-1 text-gray-900">Quantitative Researcher Intern</h3>
                   <p className="text-lg text-gray-600 mb-4 font-medium">Ebullient Securities, Gurugram</p>
                   <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                     <p className="mb-4 text-gray-700 leading-relaxed">
                       Upcoming quantitative research internship focusing on algorithmic trading and alpha generation for equity markets.
                     </p>
                     <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm mb-4">
                       <li>Building and back-testing alpha signals for short-term equity directionality from equities and futures</li>
                       <li>Automating alpha-generation pipeline using LLMs with custom evaluation loops for iterative refinement</li>
                       <li>Developing quantitative strategies for high-frequency trading</li>
                     </ul>
                     <div className="flex flex-wrap gap-2 mt-6">
                       <Badge className="bg-amber-100 text-amber-800 border-amber-300">Quantitative Finance</Badge>
                       <Badge className="bg-amber-100 text-amber-800 border-amber-300">Alpha Generation</Badge>
                       <Badge className="bg-amber-100 text-amber-800 border-amber-300">LLMs</Badge>
                       <Badge className="bg-amber-100 text-amber-800 border-amber-300">Python</Badge>
                       <Badge className="bg-amber-100 text-amber-800 border-amber-300">Trading Strategies</Badge>
                     </div>
                   </div>
                 </div>
                 {/* Past Experiences */}
                <div className="relative">
                  <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-lg"></div>
                  <div className="mb-4">
                    <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">May 2024 - July 2024</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-gray-900">Software/Research Engineer Intern</h3>
                  <p className="text-lg text-gray-600 mb-4 font-medium">Compiler AI Labs Private Limited, New Delhi</p>
                  <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      Worked on implementing formal verification techniques for the Clang compiler, focusing on MISRA C static analysis rules and code equivalence checking.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                      <li>Implemented MISRA C static analysis rules within Clang compiler across Preprocessor, AST, and LLVM IR stages</li>
                      <li>Enhanced Equivalence Checker tool for formal verification of compiled executable code against C source code</li>
                      <li>Collaborated with the team, analyzing the Clang codebase and using Git for version control</li>
                      <li>Worked on compiler optimization and static analysis techniques</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-6">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">C++</Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">LLVM</Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">Clang</Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">Formal Verification</Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">MISRA C</Badge>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-purple-500 border-4 border-white shadow-lg"></div>
                  <div className="mb-4">
                    <span className="bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">2025</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-gray-900">Teaching Assistant - Artificial Intelligence</h3>
                  <p className="text-lg text-gray-600 mb-4 font-medium">COL333 under Prof. Mausam, IIT Delhi</p>
                  <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      Currently serving as Teaching Assistant for the AI course, helping students understand core AI concepts.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                      <li>Designed quizzes and assignments for COL333 (Artificial Intelligence)</li>
                      <li>Conducted doubt sessions and mentored students on AI concepts</li>
                      <li>Evaluated student projects and provided feedback</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-6">
                      <Badge className="bg-purple-100 text-purple-800 border-purple-300">Teaching</Badge>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-300">AI</Badge>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-300">Mentoring</Badge>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-indigo-500 border-4 border-white shadow-lg"></div>
                  <div className="mb-4">
                    <span className="bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">2024</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-gray-900">Research & Competition Lead</h3>
                  <p className="text-lg text-gray-600 mb-4 font-medium">Various Initiatives, IIT Delhi</p>
                  <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                      <li><strong className="text-gray-900">ML in Astronomy Workshop:</strong> Built LSTM-Attention models on light curves for astronomical object classification</li>
                      <li><strong className="text-gray-900">ARIES Research Team Member:</strong> Conducted NLP sessions and contributed to multiple industry research projects</li>
                      <li><strong className="text-gray-900">Inter IIT Tech Team Lead (Adobe):</strong> Led team for Adobe Research Problem Statement; designed solution for artifacts detection in AI-generated images</li>
                      <li><strong className="text-gray-900">Tower Research Limestone Challenge:</strong> Achieved Top 50 selection twice in data science competition</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-6">
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300">Research</Badge>
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300">Competition</Badge>
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300">Leadership</Badge>
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300">ML</Badge>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-lg"></div>
                  <div className="mb-4">
                    <span className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">2023</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-gray-900">Academic Mentor</h3>
                  <p className="text-lg text-gray-600 mb-4 font-medium">MTL100 (Calculus), IIT Delhi</p>
                  <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      Mentored 150+ freshers for the Calculus course, conducting regular doubt sessions in hybrid mode.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                      <li>Conducted doubt clearing sessions for MTL100 (Calculus)</li>
                      <li>Mentored over 150 freshers in understanding complex mathematical concepts</li>
                      <li>Organized both online and offline sessions for accessibility</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-6">
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">Mentoring</Badge>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">Mathematics</Badge>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">Teaching</Badge>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-orange-500 border-4 border-white shadow-lg"></div>
                  <div className="mb-4">
                    <span className="bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">June 2022 - May 2023</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-gray-900">Technical Engineer</h3>
                  <p className="text-lg text-gray-600 mb-4 font-medium">Infinity Hyperloop, CAIC, IIT Delhi</p>
                  <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <p className="mb-4 text-gray-700 leading-relaxed">
                     As part of the student hyperloop team, I contributed to developing control systems for our pod prototype.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                      <li>Designed a PyQt5 interface for pod control and real-time monitoring</li>
                      <li>Implemented sensor input processing and STM microcontroller communication via CAN</li>
                      <li>Developed data visualization components for telemetry data</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-6">
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300">Python</Badge>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300">PyQt5</Badge>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300">CAN Protocol</Badge>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300">Embedded Systems</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab Content */}
          <TabsContent value="achievements">
             <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              My Education & Achievements
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-white to-amber-50 border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                  <Award className="mr-2 text-amber-600" /> Academic Milestones
                </h3>
                <div className="space-y-4">
                  <AchievementCard title="JEE Advanced 2021" description="Achieved All India Rank 116 among 200,000 students (Top ~0.06%)" icon="🏆" color="yellow"/>
                  <AchievementCard title="JEE Mains 2021" description="Achieved All India Rank 493 among 1 million+ students (100 Percentile in Maths)" icon="🏅" color="yellow"/>
                  <AchievementCard title="KVPY Fellowship 2021" description="Awarded Prestigious Fellowship by IISc (AIR 302)" icon="🔬" color="yellow"/>
                  <AchievementCard title="NTSE Scholar 2019" description="Among top 2000 students nationwide, NCERT Scholarship" icon="🎓" color="yellow"/>
                  <AchievementCard title="INMO Qualifier 2019" description="Among top 300 students to qualify for Indian National Mathematics Olympiad" icon="🧮" color="yellow"/>
                  <AchievementCard title="Tower Research Challenge 2024" description="Achieved Top 50 selection twice in Limestone Data Challenge" icon="📊" color="blue"/>
                </div>
              </div>
              <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                  <Terminal className="mr-2 text-blue-600" /> My Education
                </h3>
                <div className="space-y-6 mb-8">
                  <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50/50 rounded-r-lg hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-lg font-semibold text-blue-900">Indian Institute of Technology Delhi</h4>
                      <span className="text-sm text-blue-700 font-bold bg-blue-100 px-2 py-1 rounded">CGPA: 8.5</span>
                    </div>
                    <p className="text-gray-700 text-sm font-medium">B.Tech + M.Tech (Dual Degree), Computer Science & Engineering</p>
                    <p className="text-xs text-gray-600 mt-1">2021 - Present</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50/50 rounded-r-lg hover:shadow-md transition-all duration-200">
                     <h4 className="text-lg font-semibold text-purple-900">Lord Buddha Public School</h4>
                     <p className="text-gray-700 text-sm font-medium">Senior Secondary (Class XII), CBSE</p>
                     <p className="text-xs text-gray-600 mt-1">Completed 2021</p>
                  </div>
                   <div className="border-l-4 border-emerald-500 pl-4 py-3 bg-emerald-50/50 rounded-r-lg hover:shadow-md transition-all duration-200">
                     <h4 className="text-lg font-semibold text-emerald-900">Lord Buddha Public School</h4>
                     <p className="text-gray-700 text-sm font-medium">Secondary (Class X), CBSE</p>
                     <p className="text-xs text-gray-600 mt-1">Completed 2019</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                  <Rocket className="mr-2 text-emerald-600" /> Other Activities & Learning
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 p-4 rounded-lg border border-emerald-200 hover:shadow-md transition-all duration-200">
                    <h4 className="font-semibold text-emerald-900 mb-2">Enactus IITD Career Platform (2023)</h4>
                    <p className="text-gray-700 text-sm">Backend developer for career upskilling platform using Django & MySQL, enabling skill development and job matching.</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Harvard CS50x Course (2021)</h4>
                    <p className="text-gray-700 text-sm">Completed Harvard&apos;s foundational CS course covering C, Python, data structures, algorithms, web development, and security concepts. {/* Corrected: &apos; -> &apos; */}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Blog Tab Content */}
          <TabsContent value="blog">
            <BlogTabContent />
          </TabsContent>

        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 border-t-4 border-blue-600 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Let&apos;s Connect! {/* Corrected: &apos; -> &apos; */}
          </h3>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Always open to interesting discussions, collaborations, and opportunities in AI, ML, and research.
          </p>
          <div className="flex justify-center gap-5 mb-10">
            <a href="https://github.com/8have5h" target="_blank" rel="noopener noreferrer" className="group p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-gray-500" aria-label="GitHub Profile">
              <Github className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/bhavesh-gurnani-410a68217" target="_blank" rel="noopener noreferrer" className="group p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-blue-500" aria-label="LinkedIn Profile">
              <Linkedin className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
             <a href="mailto:bhavesh.gurnani2003@gmail.com" className="group p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-purple-500" aria-label="Send Email">
              <Mail className="w-7 h-7 text-gray-400 group-hover:text-purple-400 transition-colors" />
            </a>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-sm text-gray-400 mb-2 font-medium">
              © {new Date().getFullYear()} Bhavesh Gurnani. All rights reserved.
            </p>
             <p className="text-xs text-gray-500">
              Built with <span className="text-red-400">❤️</span> using Next.js, React, Tailwind CSS & shadcn/ui
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}