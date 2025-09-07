"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  MessageCircle,
  Clock,
  User,
  FileText,
  Zap,
  Globe,
  Download,
  ArrowRight,
  Sparkles,
  Heart
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSocial, setActiveSocial] = useState<string | null>(null);
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/rishiahuja",
      color: "from-gray-600 to-gray-800",
      hoverColor: "from-gray-500 to-gray-700",
      description: "Code repositories"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/rishiahuja",
      color: "from-blue-600 to-blue-800",
      hoverColor: "from-blue-500 to-blue-700",
      description: "Professional network"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/rishiahuja",
      color: "from-sky-500 to-sky-700",
      hoverColor: "from-sky-400 to-sky-600",
      description: "Tech thoughts"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/rishiahuja",
      color: "from-pink-500 to-purple-600",
      hoverColor: "from-pink-400 to-purple-500",
      description: "Behind the scenes"
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rishi.ahuja@uwaterloo.ca",
      href: "mailto:rishi.ahuja@uwaterloo.ca",
      color: "from-blue-500 to-cyan-500",
      description: "Primary contact method"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (647) 123-4567",
      href: "tel:+16471234567",
      color: "from-green-500 to-emerald-500",
      description: "Direct communication"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Waterloo, ON, Canada",
      href: "#",
      color: "from-red-500 to-pink-500",
      description: "Based in Canada"
    },
    {
      icon: Globe,
      label: "Website",
      value: "rishi-portfolio.vercel.app",
      href: "#",
      color: "from-purple-500 to-indigo-500",
      description: "This portfolio"
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSocialClick = (url: string, name: string) => {
    setActiveSocial(name);
    setTimeout(() => {
      window.open(url, '_blank');
      setActiveSocial(null);
    }, 300);
  };

  return (
    <section ref={containerRef} id="contact" className="relative min-h-screen overflow-hidden">
      {/* Optimized background - reduced animations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-16 w-[44rem] h-[44rem] rounded-full bg-gradient-to-tr from-rose-600/15 to-red-400/8 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-[38rem] h-[38rem] rounded-full bg-gradient-to-tr from-indigo-600/15 to-cyan-400/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(20,184,166,0.08),transparent_50%)]" />
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
              background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            CONNECT
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Let's <span className="text-teal-400 font-semibold">collaborate</span> and 
            <span className="text-cyan-400 font-semibold"> build something amazing</span> together - 
            <span className="text-purple-400 font-semibold"> reach out!</span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Send a Message</h3>
                  <p className="text-gray-400">I'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium mb-3 text-white">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none transition-colors text-lg ${
                          errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/20 focus:border-teal-500/50"
                        }`}
                        placeholder="Your full name"
                      />
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-3 text-white">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none transition-colors text-lg ${
                          errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/20 focus:border-teal-500/50"
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3 text-white">
                    Subject *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none transition-colors text-lg ${
                        errors.subject ? "border-red-500/50 focus:border-red-500" : "border-white/20 focus:border-teal-500/50"
                      }`}
                      placeholder="What's this about?"
                    />
                  </div>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium mb-3 text-white">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={6}
                    className={`w-full px-4 py-4 bg-white/10 border rounded-2xl backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none transition-colors resize-none text-lg ${
                      errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/20 focus:border-teal-500/50"
                    }`}
                    placeholder="Tell me about your project or just say hello..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </motion.p>
                  )}
                  <p className="text-sm text-gray-400 mt-2">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-semibold text-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Contact Information</h3>
                    <p className="text-gray-400">Multiple ways to reach me</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    const isHovered = hoveredContact === info.label;
                    
                    return (
                      <motion.a
                        key={index}
                        href={info.href}
                        onHoverStart={() => setHoveredContact(info.label)}
                        onHoverEnd={() => setHoveredContact(null)}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xl font-bold text-white">{info.label}</div>
                          <div className="text-gray-300">{info.value}</div>
                          <div className="text-sm text-gray-400">{info.description}</div>
                        </div>
                        <ArrowRight className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Follow Me</h3>
                    <p className="text-gray-400">Connect on social media</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    const isActive = activeSocial === social.name;
                    
                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleSocialClick(social.url, social.name)}
                        className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                          isActive 
                            ? `bg-gradient-to-r ${social.hoverColor} border-transparent text-white` 
                            : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40"
                        }`}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <Icon className="w-8 h-8" />
                          <div>
                            <div className="font-bold text-lg">{social.name}</div>
                            <div className="text-sm opacity-70">{social.description}</div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Quick Actions</h3>
                    <p className="text-gray-400">Common requests</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.button
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors text-left"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-8 h-8 text-orange-400" />
                    <div>
                      <div className="text-xl font-bold text-white">Download Resume</div>
                      <div className="text-gray-400">Get my latest CV in PDF format</div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 ml-auto" />
                  </motion.button>

                  <motion.button
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors text-left"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Clock className="w-8 h-8 text-orange-400" />
                    <div>
                      <div className="text-xl font-bold text-white">Schedule a Call</div>
                      <div className="text-gray-400">Book a 30-minute consultation</div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 ml-auto" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed top-8 right-8 z-50 p-6 bg-green-500/90 backdrop-blur-xl border border-green-400/50 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-white" />
                <div>
                  <div className="font-semibold text-white">Message Sent!</div>
                  <div className="text-sm text-green-100">I'll get back to you soon.</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-red-400" />
                <h3 className="text-2xl font-bold text-white">Thank You for Visiting!</h3>
                <Heart className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                I'm always excited to connect with fellow developers, entrepreneurs, and innovators. 
                Whether you have a project in mind, want to collaborate, or just want to chat about technology, 
                I'd love to hear from you!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}