"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useResumeData } from "@/lib/useResume";
import { Brain, Code, Zap, Target, Users, Award, Sparkles, ArrowRight } from "lucide-react";

export default function AboutSection() {
  const { data } = useResumeData();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const edu = data?.education?.[0];
  const skills = data?.skills ?? [];

  const skillCategories = [
    { 
      name: "AI/ML", 
      skills: skills.filter(s => ["Python", "Deep Learning", "Machine Learning", "TensorFlow", "NLP"].includes(s)), 
      color: "from-purple-500 via-pink-500 to-red-500",
      icon: Brain,
      description: "Building intelligent systems"
    },
    { 
      name: "Frontend", 
      skills: skills.filter(s => ["React", "JavaScript", "TypeScript", "HTML", "CSS"].includes(s)), 
      color: "from-blue-500 via-cyan-500 to-teal-500",
      icon: Code,
      description: "Creating beautiful interfaces"
    },
    { 
      name: "Backend", 
      skills: skills.filter(s => ["Node.js", "Python", "SQL", "PostgreSQL", "MongoDB"].includes(s)), 
      color: "from-green-500 via-emerald-500 to-lime-500",
      icon: Zap,
      description: "Powering scalable systems"
    },
    { 
      name: "Tools", 
      skills: skills.filter(s => ["Git", "AWS", "Docker", "Linux", "Bash"].includes(s)), 
      color: "from-orange-500 via-red-500 to-pink-500",
      icon: Target,
      description: "Streamlining workflows"
    }
  ];

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen overflow-hidden">
      {/* Optimized background - reduced animations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-16 w-[44rem] h-[44rem] rounded-full bg-gradient-to-tr from-rose-600/15 to-red-400/8 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-[38rem] h-[38rem] rounded-full bg-gradient-to-tr from-indigo-600/15 to-cyan-400/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.08),transparent_50%)]" />
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            ABOUT
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Building the future through <span className="text-purple-400 font-semibold">AI/ML</span>, 
            <span className="text-blue-400 font-semibold"> full-stack development</span>, and 
            <span className="text-pink-400 font-semibold"> innovative problem-solving</span>
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Education & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Education Card */}
            {edu && (
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Education</h3>
                      <p className="text-gray-400">Academic Foundation</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {edu.school}
                    </h4>
                    <p className="text-xl text-gray-300">{edu.degree}</p>
                    <div className="flex items-center gap-6 text-gray-400">
                      <span className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        {edu.graduation}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Philosophy Card */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: -5 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Philosophy</h3>
                    <p className="text-gray-400">My Approach</p>
                  </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I believe in creating technology that doesn't just solve problems, but 
                  <span className="text-blue-400 font-semibold"> transforms how we think about them</span>. 
                  Every line of code is an opportunity to build something that matters.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Skills Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-white mb-4">Technical Arsenal</h3>
              <p className="text-gray-400 text-lg">Mastering the tools that shape tomorrow</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {skillCategories.map((category, index) => {
                const Icon = category.icon;
                const isHovered = hoveredSkill === category.name;
                
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                    onHoverStart={() => setHoveredSkill(category.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="relative group cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 ${isHovered ? 'opacity-60' : 'opacity-30'}`} />
                    <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-48 flex flex-col justify-between">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{category.name}</h4>
                          <p className="text-sm text-gray-400">{category.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {category.skills.slice(0, 3).map((skill, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                            <span className="text-sm text-gray-300">{skill}</span>
                          </motion.div>
                        ))}
                        {category.skills.length > 3 && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full" />
                            <span className="text-sm text-gray-500">+{category.skills.length - 3} more</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                Explore My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}