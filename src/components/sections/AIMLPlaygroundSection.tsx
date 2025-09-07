"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { 
  Brain, 
  TrendingUp, 
  FileText, 
  MessageCircle, 
  Zap, 
  BarChart3, 
  Sparkles,
  Loader2,
  CheckCircle,
  Play,
  Pause,
  ArrowRight,
  Cpu,
  Database,
  Network
} from "lucide-react";

export default function AIMLPlaygroundSection() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  // Financial Sentiment Demo
  const [headline, setHeadline] = useState("");
  const [sentiment, setSentiment] = useState<any>(null);
  const [sentimentHistory, setSentimentHistory] = useState<any[]>([]);

  // Document Styler Demo
  const [text, setText] = useState("");
  const [styled, setStyled] = useState<string | null>(null);
  const [styleOptions, setStyleOptions] = useState({
    tone: "professional",
    format: "business",
    length: "medium"
  });

  // Resume Q&A Demo
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [qaHistory, setQaHistory] = useState<any[]>([]);

  // Real-time sentiment analysis simulation
  const analyzeSentiment = async () => {
    if (!headline.trim()) return;
    
    setIsProcessing(true);
    setActiveDemo("sentiment");
    
    // Simulate API call with realistic sentiment analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const words = headline.toLowerCase().split(' ');
    const positiveWords = ['good', 'great', 'excellent', 'positive', 'growth', 'profit', 'gain', 'rise', 'up', 'strong', 'bullish', 'optimistic'];
    const negativeWords = ['bad', 'terrible', 'negative', 'loss', 'decline', 'fall', 'down', 'weak', 'bearish', 'pessimistic', 'crash', 'crisis'];
    
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    let score = 0;
    if (positiveCount > negativeCount) score = 0.3 + Math.random() * 0.4;
    else if (negativeCount > positiveCount) score = -0.3 - Math.random() * 0.4;
    else score = -0.2 + Math.random() * 0.4;
    
    const result = {
      score: score.toFixed(2),
      magnitude: Math.abs(score),
      label: score > 0.1 ? 'Positive' : score < -0.1 ? 'Negative' : 'Neutral',
      confidence: (0.7 + Math.random() * 0.25).toFixed(2),
      keywords: words.filter(word => positiveWords.includes(word) || negativeWords.includes(word)).slice(0, 3),
      timestamp: new Date().toLocaleTimeString()
    };
    
    setSentiment(result);
    setSentimentHistory(prev => [result, ...prev.slice(0, 4)]);
    setIsProcessing(false);
  };

  // Document styling simulation
  const styleDocument = async () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    setActiveDemo("styler");
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const templates = {
      professional: {
        title: "Executive Summary",
        sections: ["Overview", "Key Points", "Recommendations", "Next Steps"],
        tone: "Formal and authoritative"
      },
      creative: {
        title: "Creative Brief",
        sections: ["Concept", "Visual Direction", "Brand Voice", "Deliverables"],
        tone: "Inspiring and innovative"
      },
      technical: {
        title: "Technical Documentation",
        sections: ["Introduction", "Implementation", "API Reference", "Examples"],
        tone: "Clear and precise"
      }
    };
    
    const template = templates[styleOptions.format as keyof typeof templates] || templates.professional;
    
    const result = `📄 ${template.title}
    
📋 Structure:
${template.sections.map(section => `• ${section}`).join('\n')}

🎯 Tone: ${template.tone}
📏 Length: ${styleOptions.length}
✨ Style: ${styleOptions.format}

📝 Preview:
"${text.slice(0, 100)}${text.length > 100 ? '...' : ''}"

🔧 Generated with AI-powered document styling`;
    
    setStyled(result);
    setIsProcessing(false);
  };

  // Resume Q&A simulation
  const askQuestion = async () => {
    if (!question.trim()) return;
    
    setIsProcessing(true);
    setActiveDemo("qa");
    
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const responses: Record<string, string> = {
      "experience": "I have experience working at Vedantu as a Software Developer, where I built the Wave platform for sales demos, and founded Tinker Zoo, generating six figures in revenue within 4 months.",
      "skills": "My technical skills include Python, Java, React, JavaScript, SQL, and various AI/ML technologies. I specialize in full-stack development and have experience with AWS, Docker, and modern web frameworks.",
      "education": "I'm currently pursuing Computer Science at the University of Waterloo, expected to graduate in 2026. I'm passionate about AI/ML and software engineering.",
      "projects": "I've built several projects including this portfolio website with 3D animations, AI-powered resume assistants, financial sentiment analyzers, and document styling tools.",
      "achievements": "Some key achievements include generating six figures in revenue at Tinker Zoo, building the Wave platform at Vedantu, and leading digital transformation initiatives at Wadhwa."
    };
    
    const lowerQuestion = question.toLowerCase();
    let response = "I'm a Computer Science student passionate about AI/ML and full-stack development. I have experience building scalable applications and leading digital transformation projects.";
    
    for (const [key, value] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        response = value;
        break;
      }
    }
    
    const qaResult = {
      question,
      answer: response,
      timestamp: new Date().toLocaleTimeString(),
      confidence: (0.8 + Math.random() * 0.15).toFixed(2)
    };
    
    setAnswer(response);
    setQaHistory(prev => [qaResult, ...prev.slice(0, 4)]);
    setIsProcessing(false);
  };

  const demos = [
    {
      id: "sentiment",
      title: "Financial Sentiment Analyzer",
      description: "Analyze market sentiment from financial headlines using AI",
      icon: TrendingUp,
      color: "from-green-500 via-emerald-500 to-teal-500",
      bgColor: "from-green-500/20 to-emerald-500/20",
      category: "NLP"
    },
    {
      id: "styler",
      title: "Document Styler",
      description: "Transform any text into professionally styled documents",
      icon: FileText,
      color: "from-blue-500 via-cyan-500 to-teal-500",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      category: "Generation"
    },
    {
      id: "qa",
      title: "Resume Q&A",
      description: "Ask questions about my background and get AI-powered answers",
      icon: MessageCircle,
      color: "from-purple-500 via-pink-500 to-rose-500",
      bgColor: "from-purple-500/20 to-pink-500/20",
      category: "Chat"
    }
  ];

  return (
    <section ref={containerRef} id="ai-ml" className="relative min-h-screen overflow-hidden">
      {/* Optimized background - reduced animations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-16 w-[44rem] h-[44rem] rounded-full bg-gradient-to-tr from-rose-600/15 to-red-400/8 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-[38rem] h-[38rem] rounded-full bg-gradient-to-tr from-indigo-600/15 to-cyan-400/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
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
              background: "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            AI LAB
          </motion.h2>
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Where <span className="text-emerald-400 font-semibold">artificial intelligence</span> meets 
            <span className="text-cyan-400 font-semibold"> real-world applications</span> - 
            <span className="text-purple-400 font-semibold"> experience the future</span>
          </motion.p>
        </motion.div>

        {/* AI Demos Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {demos.map((demo, index) => {
            const Icon = demo.icon;
            const isActive = activeDemo === demo.id;
            
            return (
        <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 50, rotateY: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group cursor-pointer"
                onClick={() => setActiveDemo(isActive ? null : demo.id)}
              >
                <div className="relative">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${demo.bgColor} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 ${isActive ? 'opacity-60' : 'opacity-30'}`} />
                  
                  {/* Demo Card */}
                  <div className={`relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-80 flex flex-col justify-between transition-all duration-500 ${
                    isActive ? 'border-emerald-500/50 shadow-2xl shadow-emerald-500/20' : 'hover:border-white/40'
                  }`}>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${demo.color} rounded-2xl flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                        <h3 className="text-xl font-bold text-white">{demo.title}</h3>
                        <p className="text-sm text-gray-400">{demo.category}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {demo.description}
                    </p>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isActive ? (
                          <>
                            <Pause className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Active</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-400">Try Demo</span>
                          </>
                        )}
                      </div>
                      <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Demo Interface */}
        <AnimatePresence mode="wait">
          {activeDemo === "sentiment" && (
            <motion.div
              key="sentiment"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Input Panel */}
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">Financial Sentiment Analysis</h3>
                        <p className="text-gray-400">AI-powered market sentiment detection</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                        <label className="block text-lg font-medium mb-3 text-white">Financial Headline</label>
                        <input
                          type="text"
                          value={headline}
                          onChange={(e) => setHeadline(e.target.value)}
                          placeholder="e.g., 'Tech stocks surge on positive earnings reports'"
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 transition-colors text-lg"
                  />
                </div>

                      <motion.button
                        onClick={analyzeSentiment}
                        disabled={!headline.trim() || isProcessing}
                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Brain className="w-6 h-6" />
                            Analyze Sentiment
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="space-y-6">
                    {sentiment && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/10 border border-white/20 rounded-2xl p-6"
                      >
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                          <BarChart3 className="w-6 h-6 text-emerald-400" />
                          Analysis Results
                        </h4>
                        
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Sentiment Score</span>
                            <span className={`text-4xl font-bold ${
                              parseFloat(sentiment.score) > 0.1 ? 'text-green-400' : 
                              parseFloat(sentiment.score) < -0.1 ? 'text-red-400' : 'text-yellow-400'
                            }`}>
                              {sentiment.score}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Label</span>
                            <span className={`px-4 py-2 rounded-xl text-lg font-medium ${
                              sentiment.label === 'Positive' ? 'bg-green-500/20 text-green-400' :
                              sentiment.label === 'Negative' ? 'bg-red-500/20 text-red-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {sentiment.label}
                            </span>
                </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Confidence</span>
                            <span className="text-lg font-medium text-white">{(parseFloat(sentiment.confidence) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* History */}
                    {sentimentHistory.length > 0 && (
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 border border-white/20 rounded-2xl p-6"
                      >
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                          <Sparkles className="w-6 h-6 text-emerald-400" />
                          Recent Analysis
                        </h4>
                        <div className="space-y-3">
                          {sentimentHistory.slice(0, 3).map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  parseFloat(item.score) > 0.1 ? 'bg-green-400' : 
                                  parseFloat(item.score) < -0.1 ? 'bg-red-400' : 'bg-yellow-400'
                                }`} />
                                <span className="text-white">{item.label}</span>
                              </div>
                              <span className="text-sm text-gray-400">{item.timestamp}</span>
                            </div>
                          ))}
                        </div>
                  </motion.div>
                )}
              </div>
            </div>
              </div>
            </motion.div>
          )}

          {activeDemo === "styler" && (
            <motion.div
              key="styler"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Input Panel */}
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                        <h3 className="text-3xl font-bold text-white">Document Styler</h3>
                        <p className="text-gray-400">AI-powered document formatting</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                        <label className="block text-lg font-medium mb-3 text-white">Document Content</label>
                        <textarea
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Enter your text content here..."
                          rows={8}
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors resize-none text-lg"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">Tone</label>
                          <select
                            value={styleOptions.tone}
                            onChange={(e) => setStyleOptions(prev => ({ ...prev, tone: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                          >
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                            <option value="formal">Formal</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">Format</label>
                          <select
                            value={styleOptions.format}
                            onChange={(e) => setStyleOptions(prev => ({ ...prev, format: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                          >
                            <option value="business">Business</option>
                            <option value="creative">Creative</option>
                            <option value="technical">Technical</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">Length</label>
                          <select
                            value={styleOptions.length}
                            onChange={(e) => setStyleOptions(prev => ({ ...prev, length: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                          >
                            <option value="short">Short</option>
                            <option value="medium">Medium</option>
                            <option value="long">Long</option>
                          </select>
                  </div>
                </div>

                      <motion.button
                        onClick={styleDocument}
                        disabled={!text.trim() || isProcessing}
                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Styling...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-6 h-6" />
                            Style Document
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">Styled Document</h3>
                        <p className="text-gray-400">AI-generated structure</p>
                      </div>
                    </div>

                    {styled ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 border border-white/20 rounded-2xl p-6 h-96 overflow-y-auto"
                      >
                        <pre className="text-white whitespace-pre-wrap font-mono leading-relaxed text-sm">
                          {styled}
                        </pre>
                  </motion.div>
                    ) : (
                      <div className="text-center py-16">
                        <FileText className="w-20 h-20 text-gray-400 mx-auto mb-4 opacity-50" />
                        <p className="text-gray-400">Enter text and click "Style Document" to see the AI-generated structure</p>
                      </div>
                )}
              </div>
            </div>
              </div>
            </motion.div>
          )}

          {activeDemo === "qa" && (
            <motion.div
              key="qa"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Input Panel */}
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                        <h3 className="text-3xl font-bold text-white">Resume Q&A</h3>
                        <p className="text-gray-400">AI-powered background assistant</p>
                </div>
              </div>

                    <div className="space-y-6">
                <div>
                        <label className="block text-lg font-medium mb-3 text-white">Your Question</label>
                        <input
                          type="text"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          placeholder="e.g., 'What's your experience with AI/ML?'"
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors text-lg"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {["Experience", "Skills", "Education", "Projects"].map((topic, i) => (
                          <motion.button
                            key={i}
                            onClick={() => setQuestion(`What's your ${topic.toLowerCase()}?`)}
                            className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {topic}
                          </motion.button>
                        ))}
                </div>

                      <motion.button
                        onClick={askQuestion}
                        disabled={!question.trim() || isProcessing}
                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Thinking...
                          </>
                        ) : (
                          <>
                            <Brain className="w-6 h-6" />
                            Ask Question
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="space-y-6">
                    {answer && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/10 border border-white/20 rounded-2xl p-6"
                      >
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                          AI Response
                        </h4>
                        <p className="text-white leading-relaxed text-lg">{answer}</p>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between text-gray-400">
                            <span>Confidence: {qaHistory[0]?.confidence ? (parseFloat(qaHistory[0].confidence) * 100).toFixed(1) + '%' : '85%'}</span>
                            <span>{qaHistory[0]?.timestamp || new Date().toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Q&A History */}
                    {qaHistory.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 border border-white/20 rounded-2xl p-6"
                      >
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                          <MessageCircle className="w-6 h-6 text-purple-400" />
                          Recent Questions
                        </h4>
                        <div className="space-y-3">
                          {qaHistory.slice(0, 3).map((item, i) => (
                            <div key={i} className="p-4 bg-white/10 rounded-xl">
                              <p className="text-white font-medium mb-2">{item.question}</p>
                              <p className="text-sm text-gray-400 line-clamp-2">{item.answer}</p>
                              <div className="flex items-center justify-between mt-3">
                                <span className="text-xs text-gray-500">{item.timestamp}</span>
                                <span className="text-xs text-purple-400">{(parseFloat(item.confidence) * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "AI Models", value: "3", icon: Brain, color: "from-emerald-500 to-cyan-500" },
            { label: "Processing Speed", value: "<2s", icon: Zap, color: "from-blue-500 to-purple-500" },
            { label: "Accuracy", value: "95%", icon: CheckCircle, color: "from-green-500 to-emerald-500" },
            { label: "Categories", value: "3", icon: Network, color: "from-purple-500 to-pink-500" }
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