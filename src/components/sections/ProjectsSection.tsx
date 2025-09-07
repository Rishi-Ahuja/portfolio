"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useResumeData } from "@/lib/useResume";
import dynamic from "next/dynamic";
import { 
  Code, 
  ExternalLink, 
  Github, 
  Star, 
  Eye, 
  Zap,
  Globe,
  Smartphone,
  Database,
  Brain,
  Palette,
  ArrowRight,
  Play,
  Sparkles
} from "lucide-react";

const ProjectOrb = dynamic(() => import("@/components/3d/ProjectOrb"), { ssr: false });

export default function ProjectsSection() {
  const { data } = useResumeData();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const projects = data?.projects ?? [];

  const getProjectDetails = (project: any) => {
    const details: Record<string, { 
      features: string[]; 
      impact: string; 
      color: string;
      category: string;
      status: string;
      demo: string;
    }> = {
      "Portfolio Website": {
        features: ["3D Animations", "AI Integration", "Responsive Design", "Performance Optimized"],
        impact: "Showcasing advanced web development skills with modern technologies",
        color: "from-blue-500 via-purple-500 to-pink-500",
        category: "Web Development",
        status: "Live",
        demo: "https://rishi-portfolio.vercel.app"
      },
      "AI Resume Assistant": {
        features: ["Natural Language Processing", "Contextual Responses", "Real-time Chat", "Resume Analysis"],
        impact: "Helping users get instant answers about professional background",
        color: "from-green-500 via-teal-500 to-cyan-500",
    category: "AI/ML",
        status: "Live",
        demo: "https://ai-resume-demo.vercel.app"
      },
      "Financial Sentiment Analyzer": {
        features: ["Sentiment Analysis", "Real-time Data", "Market Insights", "Risk Assessment"],
        impact: "Providing valuable market sentiment insights for investment decisions",
        color: "from-yellow-500 via-orange-500 to-red-500",
        category: "Data Science",
        status: "Live",
        demo: "https://sentiment-analyzer.vercel.app"
      },
      "Document Styler": {
        features: ["AI-Powered Styling", "Multiple Formats", "Template Generation", "Brand Consistency"],
        impact: "Automating document styling for consistent brand presentation",
        color: "from-purple-500 via-pink-500 to-rose-500",
    category: "AI/ML",
        status: "Live",
        demo: "https://document-styler.vercel.app"
      }
    };
    return details[project.title] || {
      features: ["Innovative Solution", "User-Focused Design", "Scalable Architecture"],
      impact: "Delivering high-quality solutions with modern technologies",
      color: "from-gray-500 to-slate-500",
      category: "Web Development",
      status: "Live",
      demo: "#"
    };
  };

  const categories = [
    { id: "all", label: "All", icon: Code, color: "from-gray-500 to-slate-500" },
    { id: "web", label: "Web", icon: Globe, color: "from-blue-500 to-cyan-500" },
    { id: "ai", label: "AI/ML", icon: Brain, color: "from-purple-500 to-pink-500" },
    { id: "data", label: "Data", icon: Database, color: "from-orange-500 to-red-500" },
    { id: "mobile", label: "Mobile", icon: Smartphone, color: "from-green-500 to-emerald-500" }
  ];

  const getProjectCategory = (project: any) => {
    const title = project.title?.toLowerCase() || "";
    const description = project.description?.toLowerCase() || "";
    const content = `${title} ${description}`;

    if (content.includes("ai") || content.includes("ml") || content.includes("machine learning")) return "ai";
    if (content.includes("mobile") || content.includes("ios") || content.includes("android")) return "mobile";
    if (content.includes("data") || content.includes("analytics") || content.includes("sentiment")) return "data";
    return "web";
  };

  return (
    <section ref={containerRef} id="projects" className="relative min-h-screen overflow-hidden">
      {/* Optimized background - reduced animations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-16 w-[44rem] h-[44rem] rounded-full bg-gradient-to-tr from-rose-600/15 to-red-400/8 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-[38rem] h-[38rem] rounded-full bg-gradient-to-tr from-indigo-600/15 to-cyan-400/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.08),transparent_50%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-32">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.h2 
            className="text-7xl md:text-8xl font-black mb-8"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            CREATIONS
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Where <span className="text-purple-400 font-semibold">innovation</span> meets 
            <span className="text-pink-400 font-semibold"> execution</span> - 
            <span className="text-cyan-400 font-semibold"> building tomorrow</span>
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="flex gap-4 p-2 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
            <motion.button
                  key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    category.id === "all"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{category.label}</span>
            </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid - Hexagonal Layout */}
        <div className="relative">
          {/* Central Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          {/* Project Cards in Hexagonal Pattern */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => {
              const details = getProjectDetails(project);
              const isHovered = hoveredProject === index;
              const isSelected = selectedProject === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateY: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  onHoverStart={() => setHoveredProject(index)}
                  onHoverEnd={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(isSelected ? null : index)}
                  className="group cursor-pointer"
                >
                  <div className="relative">
                    {/* 3D Orb Background */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <ProjectOrb />
                    </div>

                    {/* Project Card */}
                    <div className={`relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-96 flex flex-col justify-between transition-all duration-500 ${
                      isSelected ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' : 'hover:border-white/40'
                    }`}>
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 bg-gradient-to-r ${details.color} text-white text-xs font-medium rounded-full`}>
                          {details.category}
                        </span>
                      </div>

                      {/* Project Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2">
                          {details.features.slice(0, 3).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                              <span className="text-sm text-gray-400">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <div className="flex items-center gap-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5 text-gray-400" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                          >
                            <Github className="w-5 h-5 text-gray-400" />
                          </motion.button>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                        >
                          <Play className="w-4 h-4" />
                          Demo
                        </motion.button>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${details.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
                      initial={false}
                      animate={{ opacity: isHovered ? 0.2 : 0 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Expanded Project Details */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              {(() => {
                const project = projects[selectedProject];
                const details = getProjectDetails(project);
                
                return (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
                    <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                      <div className="grid lg:grid-cols-2 gap-12">
                        {/* Project Info */}
                        <div>
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 bg-gradient-to-r ${details.color} rounded-2xl flex items-center justify-center`}>
                              <Code className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                              <p className="text-gray-400">{details.category} • {details.status}</p>
                            </div>
                          </div>
                          
                          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            {project.description}
                          </p>

                          <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white">Key Features</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {details.features.map((feature, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.1 }}
                                  className="flex items-center gap-2 p-3 bg-white/10 rounded-xl"
                                >
                                  <Zap className="w-4 h-4 text-purple-400" />
                                  <span className="text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>
                          </div>
                        </div>

                        {/* Tech Stack & Actions */}
                        <div className="space-y-8">
                          {/* Tech Stack */}
                          {project.stack && project.stack.length > 0 && (
                            <div>
                              <h4 className="text-xl font-bold text-white mb-4">Tech Stack</h4>
                              <div className="flex flex-wrap gap-3">
                                {project.stack.map((tech: string, i: number) => (
                                  <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-xl text-sm font-medium"
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white">Explore Project</h4>
                            <div className="flex gap-4">
                              <motion.a
                                href={details.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                              >
                                <Play className="w-5 h-5" />
                                Live Demo
                                <ArrowRight className="w-4 h-4" />
                              </motion.a>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300"
                              >
                                <Github className="w-5 h-5" />
                                Source Code
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Projects Built", value: projects.length, icon: Code, color: "from-purple-500 to-pink-500" },
            { label: "Technologies", value: new Set(projects.flatMap(p => p.stack || [])).size, icon: Star, color: "from-blue-500 to-cyan-500" },
            { label: "Live Demos", value: projects.length, icon: Eye, color: "from-green-500 to-emerald-500" },
            { label: "Categories", value: categories.length - 1, icon: Palette, color: "from-orange-500 to-red-500" }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                className="text-center p-6 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
          </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}