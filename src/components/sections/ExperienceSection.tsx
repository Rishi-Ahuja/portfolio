"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useResumeData } from "@/lib/useResume";
import { Building2, Calendar, MapPin, ArrowRight, Zap, TrendingUp, Users, Award } from "lucide-react";

export default function ExperienceSection() {
  const { data } = useResumeData();
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const items = data?.experience ?? [];

  const getCompanyDetails = (company: string) => {
    const details: Record<string, { 
      description: string; 
      achievements: string[]; 
      tech: string[]; 
      color: string;
      impact: string;
      duration: string;
    }> = {
      "Vedantu": {
        description: "Developed the Wave platform, enabling seamless and engaging product demos for the sales team. Worked on full-stack development with focus on user experience and performance optimization.",
        achievements: ["Built Wave platform for sales demos", "Improved user engagement by 40%", "Optimized platform performance"],
        tech: ["Python", "Java", "SQL", "HTML", "CSS", "JavaScript", "REST APIs", "AWS"],
        color: "from-blue-500 via-cyan-500 to-teal-500",
        impact: "40% increase in user engagement",
        duration: "6 months"
      },
      "Tinker Zoo": {
        description: "Founded and led a tech solutions company helping individuals and businesses navigate the evolving tech landscape. Generated six figures in revenue within the first four months.",
        achievements: ["Generated six figures revenue in 4 months", "Successfully took multiple businesses online", "Led digital transformation initiatives"],
        tech: ["Business Strategy", "Tech Education", "Digital Transformation", "Revenue Generation"],
        color: "from-purple-500 via-pink-500 to-red-500",
        impact: "Six figures revenue in 4 months",
        duration: "4 months"
      },
      "Wadhwa": {
        description: "Led the digital transformation of the company, seamlessly migrating customer records and operations to online accounts, integrating multiple branches for streamlined management.",
        achievements: ["Led complete digital transformation", "Migrated customer records to online", "Integrated multiple branches"],
        tech: ["Digital Transformation", "Data Migration", "System Integration", "Operations Management"],
        color: "from-green-500 via-emerald-500 to-lime-500",
        impact: "Complete digital transformation",
        duration: "8 months"
      }
    };
    return details[company] || {
      description: "Gained valuable experience in software development and problem-solving.",
      achievements: ["Delivered high-quality solutions", "Collaborated with cross-functional teams"],
      tech: ["Software Development", "Problem Solving", "Team Collaboration"],
      color: "from-gray-500 to-slate-500",
      impact: "High-quality solutions delivered",
      duration: "6 months"
    };
  };

  return (
    <section ref={containerRef} id="experience" className="relative min-h-screen overflow-hidden">
      {/* Optimized background - reduced animations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-16 w-[44rem] h-[44rem] rounded-full bg-gradient-to-tr from-rose-600/15 to-red-400/8 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-[38rem] h-[38rem] rounded-full bg-gradient-to-tr from-indigo-600/15 to-cyan-400/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.08),transparent_50%)]" />
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
              background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            JOURNEY
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            From <span className="text-blue-400 font-semibold">startup founder</span> to 
            <span className="text-cyan-400 font-semibold"> enterprise developer</span> - 
            <span className="text-purple-400 font-semibold"> building the future</span>
          </motion.p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 rounded-full" />
          
          {/* Experience Cards */}
          <div className="space-y-24">
            {items.map((exp, index) => {
              const details = getCompanyDetails(exp.company);
              const isActive = activeExperience === index;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${details.color} rounded-full border-4 border-black shadow-2xl`} />
                  </motion.div>

                  {/* Experience Card */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: isEven ? 5 : -5 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setActiveExperience(isActive ? null : index)}
                    className={`w-5/12 ${isEven ? 'mr-auto pr-8' : 'ml-auto pl-8'} cursor-pointer`}
                  >
                    <div className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r ${details.color} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 ${isActive ? 'opacity-60' : 'opacity-30'}`} />
                      <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                        {/* Company Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-r ${details.color} rounded-2xl flex items-center justify-center`}>
                            <Building2 className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                            <p className="text-lg text-gray-300">{exp.role}</p>
                          </div>
                        </div>

                        {/* Duration & Location */}
                        <div className="flex items-center gap-6 mb-4 text-gray-400">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            {exp.duration}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            {exp.location}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {details.description}
                        </p>

                        {/* Impact Highlight */}
                        <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10">
                          <TrendingUp className="w-6 h-6 text-blue-400" />
                          <span className="text-blue-400 font-semibold">{details.impact}</span>
                        </div>

                        {/* Tech Stack Preview */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {details.tech.slice(0, 4).map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                          {details.tech.length > 4 && (
                            <span className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-sm">
                              +{details.tech.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Expand Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {isActive ? 'Show Less' : 'Learn More'}
                          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Expanded Experience Details */}
        <AnimatePresence>
          {activeExperience !== null && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              {(() => {
                const exp = items[activeExperience];
                const details = getCompanyDetails(exp.company);
                
                return (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl" />
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Achievements */}
                        <div>
                          <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Award className="w-6 h-6 text-yellow-400" />
                            Key Achievements
                          </h4>
                          <div className="space-y-4">
                            {details.achievements.map((achievement, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-300">{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Zap className="w-6 h-6 text-cyan-400" />
                            Technologies Used
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {details.tech.map((tech, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="p-3 bg-white/10 rounded-xl text-center"
                              >
                                <span className="text-white font-medium">{tech}</span>
                              </motion.div>
                            ))}
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Companies", value: items.length, icon: Building2, color: "from-blue-500 to-cyan-500" },
            { label: "Years Experience", value: "2+", icon: Calendar, color: "from-purple-500 to-pink-500" },
            { label: "Projects Delivered", value: "15+", icon: Award, color: "from-green-500 to-emerald-500" },
            { label: "Technologies", value: "20+", icon: Zap, color: "from-orange-500 to-red-500" }
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