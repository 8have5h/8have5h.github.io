// src/components/PortfolioClient.tsx
'use client'; // Mark this as a Client Component

import React, { useState, useEffect, CSSProperties } from "react";
// Assuming shadcn/ui is setup and components are available via alias
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Lucide icons
import { Terminal, Code, Rocket, Award, Briefcase, User, Github, Linkedin, Mail, ExternalLink, BrainCircuit, BookOpen, CalendarClock } from "lucide-react";
// Markdown rendering
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
  icon: string;
  color?: 'yellow' | 'blue' | 'purple' | 'green';
}

// Type for the animated background elements state
// Includes standard CSS properties and custom animation properties
interface BackgroundElementStyle extends CSSProperties {
    animationName?: string; // Explicitly add animation properties used
    animationTimingFunction?: string;
    animationIterationCount?: string;
    animationDuration?: string;
    animationDelay?: string;
}

// --- Helper Components ---

// Project Card Component (Corrected Props Typing)
function ProjectCard({
  title,
  subtitle,
  description,
  details,
  technologies,
  projectLink,
  githubLink,
  color = 'gray' // Default value
}: ProjectCardProps) { // Type applied to props argument
  const colorClasses = { blue: 'border-blue-500 hover:shadow-blue-500/30', purple: 'border-purple-500 hover:shadow-purple-500/30', green: 'border-green-500 hover:shadow-green-500/30', yellow: 'border-yellow-500 hover:shadow-yellow-500/30', red: 'border-red-500 hover:shadow-red-500/30', gray: 'border-gray-500 hover:shadow-gray-400/20' };
  const badgeColorClasses = { blue: 'bg-blue-900/30 text-blue-300 border-blue-500', purple: 'bg-purple-900/30 text-purple-300 border-purple-500', green: 'bg-green-900/30 text-green-300 border-green-500', yellow: 'bg-yellow-900/30 text-yellow-300 border-yellow-500', red: 'bg-red-900/30 text-red-300 border-red-500', gray: 'bg-gray-700/30 text-gray-300 border-gray-500' };

  return (
    <Card className={`group bg-gray-800/50 border ${colorClasses[color]} overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col`}>
      <CardContent className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className={`text-2xl font-bold mb-2 text-${color}-300`}>{title}</h3>
        <p className="text-lg text-gray-400 mb-4">{subtitle}</p>
        <p className="text-gray-300 mb-6">{description}</p>
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3">Key Features / Learnings:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">{details.map((detail, index) => (<li key={index}>{detail}</li>))}</ul>
        </div>
        <div className="mb-6">
           <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3">Technologies:</h4>
           <div className="flex flex-wrap gap-2">{technologies.map((tech, index) => (<Badge key={index} variant="outline" className={`${badgeColorClasses[color]} text-xs`}>{tech}</Badge>))}</div>
        </div>
        {(projectLink || githubLink) && (
          <div className="mt-auto pt-4 flex flex-wrap gap-4">
            {githubLink && (<a href={githubLink} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-gray-700 hover:bg-gray-600 transition-colors text-${color}-300 border border-${color}-700`}><Github className="w-4 h-4" /> View Code</a>)}
            {projectLink && (<a href={projectLink} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-${color}-600 hover:bg-${color}-500 transition-colors text-white`}><ExternalLink className="w-4 h-4" /> View Project</a>)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Achievement Card Component (Corrected Props Typing)
function AchievementCard({
    title,
    description,
    icon,
    color = 'yellow' // Default value
}: AchievementCardProps) { // Type applied to props argument
    const colorClasses = { yellow: 'text-yellow-400 border-yellow-500/30', blue: 'text-blue-400 border-blue-500/30', purple: 'text-purple-400 border-purple-500/30', green: 'text-green-400 border-green-500/30' };
  return (
    <div className={`flex items-start space-x-4 p-4 bg-gray-700/20 rounded-lg border-l-4 ${colorClasses[color]} transition-all duration-200 hover:bg-gray-700/40`}>
      <span className={`text-2xl ${colorClasses[color]}`}>{icon}</span>
      <div>
        <h4 className={`font-semibold ${colorClasses[color]}`}>{title}</h4>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}

// Blog Tab Content Component
function BlogTabContent() {
  const [postContent, setPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Typed error state

  useEffect(() => {
    // Fetch the sample Markdown file from the public directory
    fetch('/posts/sample-post.md')
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.text();
      })
      .then(text => { setPostContent(text); setIsLoading(false); })
      .catch((err: Error) => { // Type the error
        console.error("Error fetching blog post:", err);
        setError(`Could not load blog post: ${err.message}. Check path and file.`);
        setIsLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Blog / Musings</h2>
      <div className="max-w-3xl mx-auto bg-gray-800/50 border border-gray-700 rounded-lg p-6 md:p-8">
        {isLoading && <p className="text-center text-gray-400">Loading post...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        {!isLoading && !error && postContent && (
          // Ensure @tailwindcss/typography plugin is installed & configured in tailwind.config.ts
          <article className="prose prose-invert max-w-none lg:prose-lg prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-blue-400 prose-headings:to-purple-500 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-yellow-300 prose-code:text-yellow-300 prose-code:bg-gray-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-md prose-pre:p-4 prose-blockquote:border-l-purple-500 prose-blockquote:text-gray-400 prose-li:marker:text-purple-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{postContent}</ReactMarkdown>
          </article>
        )}
        {!isLoading && !error && !postContent && (<p className="text-center text-gray-500">Blog post content is empty or could not be loaded.</p>)}
        <p className="text-xs text-gray-500 mt-8 text-center">(This is a basic blog setup)</p>
      </div>
    </div>
  );
}


// --- Main Portfolio Component ---
export default function PortfolioClient() {
  const [isVisible, setIsVisible] = useState(false);
  // State for background elements, typed and initialized empty for SSR
  const [backgroundElements, setBackgroundElements] = useState<BackgroundElementStyle[]>([]); // Correctly typed state

  useEffect(() => {
    // Fade in effect timer
    const fadeInTimer = setTimeout(() => setIsVisible(true), 100);

    // *** Hydration Fix Logic: Generate styles only on the client ***
    const generateBackgroundStyles = () => {
      const elements: BackgroundElementStyle[] = [];
      for (let i = 0; i < 20; i++) {
        elements.push({
            position: 'absolute',
            borderRadius: '9999px', // equivalent to rounded-full
            backgroundColor: 'rgba(59, 130, 246, 0.2)', // bg-blue-500/20
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 300 + 50}px`,
            height: `${Math.random() * 300 + 50}px`,
            opacity: Math.random() * 0.3,
            filter: 'blur(70px)',
            // CSS Animation properties (ensure 'float' keyframe is defined in CSS/Tailwind config)
            animationName: 'float',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
        });
      }
      setBackgroundElements(elements); // Update state with client-generated styles
    };

    // Run style generation after the component mounts on the client
    generateBackgroundStyles();

    // Cleanup function for the fade-in timer
    return () => clearTimeout(fadeInTimer);
  }, []); // Empty dependency array ensures this runs only once on client mount

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* --- Hero Section --- */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
        {/* Animated Background Container */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(55,65,81,0.3)_0,_#111827_100%)]"></div>
          {/* Render background elements using state (populated only on client) */}
          {backgroundElements.map((styleProps, i) => (
            <div key={i} style={styleProps} />
          ))}
        </div>
        {/* Hero Content */}
        <div className="container mx-auto px-6 z-20 text-center">
          {/* Use ' for apostrophes in JSX */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Hi, I'm Bhavesh Gurnani
          </h1>
          <h2 className="text-xl md:text-2xl mb-8 text-gray-300">Computer Science & Engineering @ IIT Delhi</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300">Machine Learning Enthusiast | Competitive Programmer | Aspiring Researcher</p>
          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-12">
             <a href="https://github.com/8have5h" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all hover:scale-110" aria-label="GitHub Profile"><Github className="w-6 h-6" /></a>
             <a href="https://www.linkedin.com/in/bhavesh-gurnani-410a68217" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all hover:scale-110" aria-label="LinkedIn Profile"><Linkedin className="w-6 h-6" /></a>
             <a href="mailto:bhavesh.gurnani2003@gmail.com" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all hover:scale-110" aria-label="Send Email"><Mail className="w-6 h-6" /></a>
          </div>
          {/* Skill Badges */}
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="px-4 py-2 bg-blue-900/30 border-blue-500 text-blue-300">Machine Learning</Badge>
            <Badge variant="outline" className="px-4 py-2 bg-purple-900/30 border-purple-500 text-purple-300">Deep Learning</Badge>
            <Badge variant="outline" className="px-4 py-2 bg-green-900/30 border-green-500 text-green-300">C++</Badge>
            <Badge variant="outline" className="px-4 py-2 bg-yellow-900/30 border-yellow-500 text-yellow-300">Python</Badge>
            <Badge variant="outline" className="px-4 py-2 bg-red-900/30 border-red-500 text-red-300">NLP</Badge>
            <Badge variant="outline" className="px-4 py-2 bg-indigo-900/30 border-indigo-500 text-indigo-300">AI Safety</Badge>
          </div>
        </div>
        {/* Scroll Down Arrow */}
        <a href="#main-content" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-gray-400 hover:text-gray-200" aria-label="Scroll down"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></a>
      </header>

      {/* --- Main Content Section --- */}
      <main id="main-content" className="container mx-auto px-4 sm:px-6 py-16">
        <Tabs defaultValue="about" className="mb-16">
           {/* Tab Navigation */}
           <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mb-12 bg-gray-800 p-1 rounded-lg">
             <TabsTrigger value="about" aria-label="About Me" className="h-10 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 flex items-center justify-center gap-2 text-sm sm:text-lg py-2 rounded transition-colors"><User className="w-4 h-4 sm:w-5 sm:h-5" /> About</TabsTrigger>
             <TabsTrigger value="projects" aria-label="My Projects" className="h-10 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 flex items-center justify-center gap-2 text-sm sm:text-lg py-2 rounded transition-colors"><Code className="w-4 h-4 sm:w-5 sm:h-5" /> Projects</TabsTrigger>
             <TabsTrigger value="experience" aria-label="My Experience" className="h-10 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 flex items-center justify-center gap-2 text-sm sm:text-lg py-2 rounded transition-colors"><Briefcase className="w-4 h-4 sm:w-5 sm:h-5" /> Experience</TabsTrigger>
             <TabsTrigger value="achievements" aria-label="My Achievements" className="h-10 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 flex items-center justify-center gap-2 text-sm sm:text-lg py-2 rounded transition-colors"><Award className="w-4 h-4 sm:w-5 sm:h-5" /> Achievements</TabsTrigger>
             <TabsTrigger value="blog" aria-label="My Blog" className="h-10 data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 flex items-center justify-center gap-2 text-sm sm:text-lg py-2 rounded transition-colors"><BookOpen className="w-4 h-4 sm:w-5 sm:h-5" /> Blog</TabsTrigger>
           </TabsList>

          {/* --- Tab Content Panels --- */}

          {/* About Tab */}
          <TabsContent value="about">
             <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">About Me</h2>
                {/* About Card */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mb-12">
                    <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                      {/* Profile Initial/Image Placeholder */}
                      <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl md:text-6xl font-bold shadow-lg flex-shrink-0 overflow-hidden"> <span className="select-none">BG</span> </div>
                      {/* Intro Text & Links */}
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">Bhavesh Gurnani</h3>
                        <p className="text-gray-300 mb-4">I'm a passionate Computer Science student at IIT Delhi, driven by a strong foundation in mathematics and programming. I love exploring the frontiers of AI, particularly the intersections of machine learning, computer vision, and natural language processing.</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <a href="mailto:bhavesh.gurnani2003@gmail.com" className="inline-flex items-center group"> <Badge variant="outline" className="bg-blue-900/30 border-blue-500 text-blue-300 group-hover:bg-blue-800/50 transition-colors"><Mail className="w-3 h-3 mr-1" /> Email Me</Badge></a>
                            <a href="https://github.com/8have5h" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group"> <Badge variant="outline" className="bg-green-900/30 border-green-500 text-green-300 group-hover:bg-green-800/50 transition-colors"><Github className="w-3 h-3 mr-1" /> GitHub</Badge></a>
                            <a href="https://www.linkedin.com/in/bhavesh-gurnani-410a68217" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group"> <Badge variant="outline" className="bg-purple-900/30 border-purple-500 text-purple-300 group-hover:bg-purple-800/50 transition-colors"><Linkedin className="w-3 h-3 mr-1" /> LinkedIn</Badge></a>
                        </div>
                      </div>
                    </div>
                    {/* Prose for detailed about text */}
                    <div className="prose prose-invert max-w-none text-gray-300 prose-p:leading-relaxed prose-headings:text-gray-100 prose-strong:text-yellow-300">
                      <p>Currently, I'm pursuing a dual degree (B.Tech + M.Tech) in Computer Science & Engineering at IIT Delhi. My academic journey began strong, achieving <strong className="text-yellow-400">AIR 116 in JEE Advanced</strong>, which opened the doors to this incredible institution.</p>
                      <p>My core fascination lies within <strong className="text-blue-400">Machine Learning</strong> and <strong className="text-purple-400">Deep Learning</strong>. I'm particularly interested in understanding how these complex models work, which leads me to the field of <strong className="text-indigo-400">Mechanistic Interpretability</strong> – trying to reverse engineer neural networks to ensure AI systems are safe and aligned with human values (<strong className="text-indigo-400">AI Safety</strong>).</p>
                      <p>Beyond theory, I enjoy building practical systems. I'm actively working on challenging problems like the <strong className="text-green-400">ARC-AGI challenge</strong>, exploring techniques from program synthesis to model fine-tuning. I also have a strong background in <strong className="text-yellow-400">Competitive Programming</strong> which sharpens my algorithmic thinking.</p>
                      <p>I'm always eager to learn, collaborate, and tackle complex problems. If you're interested in similar areas, feel free to reach out!</p>
                    </div>
                </div>
                {/* Skills and Interests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Technical Skills Card */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center"><Terminal className="mr-2 text-green-400" /> My Technical Toolkit</h3>
                         <div className="space-y-6">
                           <div><h4 className="font-semibold text-blue-300 mb-2 text-sm uppercase tracking-wider">Programming Languages</h4><div className="flex flex-wrap gap-2">{["Python", "C++", "C", "Java", "JavaScript", "SML", "Prolog", "VHDL"].map((skill, i) => (<Badge key={i} variant="secondary" className="bg-blue-900/40 text-blue-200 border border-blue-700/50">{skill}</Badge> ))}</div></div>
                           <div><h4 className="font-semibold text-green-300 mb-2 text-sm uppercase tracking-wider">Frameworks & Libraries</h4><div className="flex flex-wrap gap-2">{["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "NumPy", "Pandas", "Django", "Flask", "React", "LLVM"].map((skill, i) => (<Badge key={i} variant="secondary" className="bg-green-900/40 text-green-200 border border-green-700/50">{skill}</Badge>))}</div></div>
                           <div><h4 className="font-semibold text-purple-300 mb-2 text-sm uppercase tracking-wider">Tools & Platforms</h4><div className="flex flex-wrap gap-2">{["Git", "Docker", "Linux", "HPC", "VS Code", "Jupyter"].map((skill, i) => (<Badge key={i} variant="secondary" className="bg-purple-900/40 text-purple-200 border border-purple-700/50">{skill}</Badge>))}</div></div>
                         </div>
                    </div>
                    {/* Areas of Interest Card */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                       <h3 className="text-xl font-bold mb-4 flex items-center"><BrainCircuit className="mr-2 text-purple-400" /> Areas I'm Excited About</h3>
                       <div className="space-y-4">
                           <div className="p-3 bg-purple-900/20 border-l-4 border-purple-500 rounded"><h4 className="font-semibold text-purple-300">ML & Deep Learning</h4><p className="text-sm text-gray-300">Neural networks, optimization, RL, generative models</p></div>
                           <div className="p-3 bg-indigo-900/20 border-l-4 border-indigo-500 rounded"><h4 className="font-semibold text-indigo-300">Interpretability & AI Safety</h4><p className="text-sm text-gray-300">Understanding NNs, alignment, robustness</p></div>
                           <div className="p-3 bg-blue-900/20 border-l-4 border-blue-500 rounded"><h4 className="font-semibold text-blue-300">Natural Language Processing</h4><p className="text-sm text-gray-300">LLMs, generation, QA</p></div>
                           <div className="p-3 bg-green-900/20 border-l-4 border-green-500 rounded"><h4 className="font-semibold text-green-300">Computer Vision</h4><p className="text-sm text-gray-300">Object-centric learning, diffusion</p></div>
                           <div className="p-3 bg-yellow-900/20 border-l-4 border-yellow-500 rounded"><h4 className="font-semibold text-yellow-300">Abstract Reasoning & AGI</h4><p className="text-sm text-gray-300">ARC challenge, program synthesis</p></div>
                           <div className="p-3 bg-red-900/20 border-l-4 border-red-500 rounded"><h4 className="font-semibold text-red-300">Quantitative Finance</h4><p className="text-sm text-gray-300">Algo trading, HFT</p></div>
                       </div>
                    </div>
                </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-12">
             <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Things I've Built & Explored</h2>
             {/* Project Cards */}
             <ProjectCard title="ARC-AGI Challenge Exploration" subtitle="Tackling Abstract Reasoning via ML & Program Synthesis" description="Exploring solutions for the ARC challenge, aiming to build AI with human-like fluid intelligence. This involves understanding core patterns from few examples." details={["Implemented test-time fine-tuning...", "Utilized DFS for inference...", "Investigated program synthesis...", "Looking for collaborators!...", "Focusing on generalizable reasoning..."]} technologies={["Python", "PyTorch", "Few-Shot Learning", "Program Synthesis", "Search Algorithms", "AGI Research"]} color="yellow" githubLink="https://github.com/8have5h/ARC-AGI-Task" projectLink="https://arcprize.org/" />
             <ProjectCard title="AI Game Agent" subtitle="Intelligent Bot for Alternating Markov Games" description="I developed an advanced AI agent capable of playing strategic board games like Hex and Chess. It uses Depth-limited Minimax with heuristics trained via Reinforcement Learning." details={["Developed game-specific heuristics...", "Implemented DQN for value approximation...", "Integrated MCTS to enhance DQN...", "Built a self-play framework...", "Analyzed trade-offs..."]} technologies={["Python", "TensorFlow", "Reinforcement Learning", "MCTS", "Minimax"]} color="blue" githubLink="https://github.com/8have5h/COL333-Assignment-1" />
             <ProjectCard title="Object-Centric Vision Models" subtitle="Deep Learning for Object Identification & Generation" description="I implemented computer vision models focused on identifying and generating individual objects within images, improving interpretability and generation quality." details={["Applied Slot Attention on CLEVRTex...", "Developed slot-conditioned diffusion model...", "Built UNet architecture from scratch...", "Implemented ARI for evaluation...", "Created visualization tools..."]} technologies={["PyTorch", "Computer Vision", "Diffusion Models", "UNet", "Transformers", "VAE"]} color="purple" githubLink="https://github.com/8have5h/COL775-Assignment-2" />
             <ProjectCard title="Smart Table QA System" subtitle="Table Cell Classification for Question Answering" description="I created a system to analyze tables and pinpoint cells containing answers to natural language questions, automating data extraction from tabular data." details={["Built transformer-based models...", "Integrated models to identify relevant cells...", "Prompt-tuned the Gemma model...", "Achieved 67% exact match accuracy...", "Developed an evaluation framework..."]} technologies={["Transformers", "NLP", "Prompt Tuning", "LLMs", "Gemma", "Python"]} color="green" githubLink="https://github.com/8have5h/COL772-Assignment-2" />
             <ProjectCard title="Natural Language Math Solver" subtitle="Text to Mathematical Program Converter" description="I engineered an end-to-end system converting natural language math word problems into executable formulas to compute the final answer." details={["Implemented Seq2Seq models...", "Utilized Bi-LSTM with GloVe...", "Created custom formula interpreter...", "Achieved 67% exact match / 73% execution accuracy...", "Improved with fine-tuned BERT..."]} technologies={["Seq2Seq", "LSTM", "BERT", "NLP", "Attention", "Beam Search"]} color="yellow" githubLink="https://github.com/8have5h/COL772-Assignment-1" />
             <ProjectCard title="BioMed Simplifier" subtitle="Lay Summarization of Biomedical Research" description="I developed an AI to transform complex biomedical papers into understandable summaries for non-experts, aiming to bridge the science communication gap." details={["Fine-tuned PLMs on HPC...", "Employed PEFT (LoRA)...", "Used mixed-precision training...", "Benchmarked Flan-T5/BioGPT...", "Evaluated on relevance, readability..."]} technologies={["PLMs", "PEFT", "LoRA", "Flan-T5", "BioGPT", "Summarization", "HPC"]} color="red" githubLink="https://github.com/8have5h/COL774-Project" />
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
             <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">My Journey & Experience</h2>
             <div className="space-y-12"><div className="relative border-l-2 border-gray-700 pl-8 ml-4 space-y-12">
                {/* Upcoming Internship */}
                <div className="relative"><div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-yellow-500 border-4 border-gray-900 animate-pulse"></div><div className="mb-4 flex items-center gap-2"><span className="bg-yellow-900/30 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">Summer 2025 (Upcoming)</span><CalendarClock className="w-4 h-4 text-yellow-400"/></div><h3 className="text-2xl font-bold mb-1">Quantitative Researcher Intern</h3><p className="text-lg text-gray-400 mb-4">Ebullient Securities</p><div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"><p className="mb-4 text-gray-300">Excited for my upcoming Quant Research internship! I'll be diving into the world of high-frequency trading (HFT)...</p><div className="flex flex-wrap gap-2 mt-6"><Badge className="bg-yellow-900/30 text-yellow-300 border-yellow-500">Quant Finance</Badge><Badge className="bg-yellow-900/30 text-yellow-300 border-yellow-500">HFT</Badge><Badge className="bg-yellow-900/30 text-yellow-300 border-yellow-500">Python</Badge><Badge className="bg-yellow-900/30 text-yellow-300 border-yellow-500">C++</Badge><Badge className="bg-yellow-900/30 text-yellow-300 border-yellow-500">Data Analysis</Badge></div></div></div>
                {/* CompilerAI Internship */}
                <div className="relative"><div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-blue-500 border-4 border-gray-900"></div><div className="mb-4"><span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">May 2024 - July 2024</span></div><h3 className="text-2xl font-bold mb-1">Verification Engineer Intern</h3><p className="text-lg text-gray-400 mb-4">CompilerAI Labs Pvt Ltd</p><div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"><p className="mb-4 text-gray-300">Worked on implementing formal verification techniques for the Clang compiler...</p><ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm"><li>Implemented MISRA C rules...</li><li>Developed rules for Equivalence Checker...</li><li>Collaborated with the team...</li></ul><div className="flex flex-wrap gap-2 mt-6"><Badge className="bg-blue-900/30 text-blue-300 border-blue-500">C++</Badge><Badge className="bg-blue-900/30 text-blue-300 border-blue-500">LLVM</Badge><Badge className="bg-blue-900/30 text-blue-300 border-blue-500">Clang</Badge><Badge className="bg-blue-900/30 text-blue-300 border-blue-500">Formal Verification</Badge></div></div></div>
                {/* Economics Club */}
                <div className="relative"><div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-purple-500 border-4 border-gray-900"></div><div className="mb-4"><span className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">June 2022 - May 2023</span></div><h3 className="text-2xl font-bold mb-1">Technical Executive</h3><p className="text-lg text-gray-400 mb-4">Economics Club, IIT Delhi</p><div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"><p className="mb-4 text-gray-300">Led technical development for the club website...</p><ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm"><li>Designed and developed using React.js...</li><li>Implemented event management features...</li><li>Created admin dashboard...</li></ul><div className="flex flex-wrap gap-2 mt-6"><Badge className="bg-purple-900/30 text-purple-300 border-purple-500">React.js</Badge><Badge className="bg-purple-900/30 text-purple-300 border-purple-500">JavaScript</Badge><Badge className="bg-purple-900/30 text-purple-300 border-purple-500">Web Dev</Badge></div></div></div>
                {/* Infinity Hyperloop */}
                <div className="relative"><div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-green-500 border-4 border-gray-900"></div><div className="mb-4"><span className="bg-green-900/30 text-green-300 px-3 py-1 rounded-full text-sm font-medium">June 2022 - May 2023</span></div><h3 className="text-2xl font-bold mb-1">Technical Engineer</h3><p className="text-lg text-gray-400 mb-4">Infinity Hyperloop, IIT Delhi</p><div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"><p className="mb-4 text-gray-300">Contributed to control systems for the pod prototype...</p><ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm"><li>Designed PyQt5 interface...</li><li>Implemented sensor processing & CAN comms...</li><li>Developed data visualization...</li></ul><div className="flex flex-wrap gap-2 mt-6"><Badge className="bg-green-900/30 text-green-300 border-green-500">Python</Badge><Badge className="bg-green-900/30 text-green-300 border-green-500">PyQt5</Badge><Badge className="bg-green-900/30 text-green-300 border-green-500">CAN Protocol</Badge><Badge className="bg-green-900/30 text-green-300 border-green-500">Embedded Systems</Badge></div></div></div>
             </div></div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">My Education & Achievements</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Academic Milestones Card */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-6 flex items-center"><Award className="mr-2 text-yellow-500" /> Academic Milestones</h3>
                    <div className="space-y-4">
                        <AchievementCard title="JEE Advanced 2021" description="Achieved All India Rank 116 (Top ~0.06%)" icon="🏆" color="yellow"/>
                        <AchievementCard title="JEE Mains 2021" description="Achieved All India Rank 493 (100 Percentile in Maths)" icon="🏅" color="yellow"/>
                        <AchievementCard title="KVPY Fellowship 2021" description="Awarded Fellowship (AIR 305)" icon="🔬" color="yellow"/>
                        <AchievementCard title="NTSE Scholar 2019" description="National Talent Search Examination Scholar" icon="🎓" color="yellow"/>
                        <AchievementCard title="INMO Qualifier 2019" description="Qualified for Indian National Mathematics Olympiad" icon="🧮" color="yellow"/>
                    </div>
                </div>
                {/* Education & Other Activities Card */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                   <h3 className="text-2xl font-bold mb-6 flex items-center"><Terminal className="mr-2 text-blue-500" /> My Education</h3>
                   {/* Education Items */}
                   <div className="space-y-6 mb-8">
                       <div className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-700/10 rounded-r-md"><div className="flex justify-between items-center mb-1"><h4 className="text-lg font-semibold text-blue-300">IIT Delhi</h4><span className="text-sm text-blue-400 font-medium">CGPA: 8.5</span></div><p className="text-gray-400 text-sm">B.Tech + M.Tech (Dual), CSE</p><p className="text-xs text-gray-500">2021 - Present</p></div>
                       <div className="border-l-4 border-purple-500 pl-4 py-2 bg-gray-700/10 rounded-r-md"><h4 className="text-lg font-semibold text-purple-300">Lord Buddha Public School</h4><p className="text-gray-400 text-sm">Senior Secondary (Class XII), CBSE</p><p className="text-xs text-gray-500">Completed 2021</p></div>
                       <div className="border-l-4 border-green-500 pl-4 py-2 bg-gray-700/10 rounded-r-md"><h4 className="text-lg font-semibold text-green-300">Lord Buddha Public School</h4><p className="text-gray-400 text-sm">Secondary (Class X), CBSE</p><p className="text-xs text-gray-500">Completed 2019</p></div>
                   </div>
                   {/* Other Activities */}
                   <h3 className="text-2xl font-bold mb-6 flex items-center"><Rocket className="mr-2 text-green-500" /> Other Activities & Learning</h3>
                   <div className="space-y-4">
                       <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50"><h4 className="font-semibold text-green-300 mb-1">Enactus IITD Career Platform</h4><p className="text-gray-300 text-sm">Helped build platform using Django & MySQL (2023).</p></div>
                       <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50"><h4 className="font-semibold text-green-300 mb-1">Harvard CS50x Course</h4><p className="text-gray-300 text-sm">Completed foundational CS course (2021).</p></div>
                   </div>
                </div>
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog"> <BlogTabContent /> </TabsContent>

        </Tabs>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Let's Connect!</h3>
          <p className="text-gray-400 mb-6">Always open to interesting discussions and collaborations.</p>
          {/* Footer Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://github.com/8have5h" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110" aria-label="GitHub"><Github className="w-6 h-6" /></a>
            <a href="https://www.linkedin.com/in/bhavesh-gurnani-410a68217" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110" aria-label="LinkedIn"><Linkedin className="w-6 h-6" /></a>
            <a href="mailto:bhavesh.gurnani2003@gmail.com" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110" aria-label="Email"><Mail className="w-6 h-6" /></a>
          </div>
          {/* Copyright & Credits */}
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Bhavesh Gurnani.</p>
           <p className="text-xs text-gray-600 mt-2">Built with Next.js, React, Tailwind CSS, shadcn/ui & ❤️</p>
        </div>
      </footer>
    </div>
  );
}