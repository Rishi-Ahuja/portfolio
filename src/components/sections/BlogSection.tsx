"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Users, 
  Calendar, 
  ArrowRight, 
  Search,
  Filter,
  Sparkles,
  MessageCircle,
  ThumbsUp,
  Eye,
  Share2,
  Zap,
  Target,
  BarChart3,
  Network
} from "lucide-react";

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock blog posts with rich content
const blogPosts = [
  {
    id: 1,
      title: "Building Next-Gen AI Applications with React and TypeScript",
      excerpt: "Explore the intersection of modern web development and artificial intelligence. Learn how to integrate AI models into React applications for enhanced user experiences.",
      content: "In this comprehensive guide, we'll dive deep into building AI-powered applications using React and TypeScript. From setting up your development environment to deploying production-ready AI features, this post covers everything you need to know...",
    category: "AI/ML",
    readTime: "8 min read",
      publishDate: "2024-01-15",
      views: 2847,
      likes: 156,
      tags: ["AI", "React", "TypeScript", "Machine Learning", "Web Development"],
      author: "Rishi Ahuja",
      featured: true,
      color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
      title: "The Future of Full-Stack Development: Trends and Predictions",
      excerpt: "Analyzing the latest trends in full-stack development and what they mean for developers in 2024 and beyond.",
      content: "Full-stack development is evolving rapidly. With new frameworks, tools, and methodologies emerging constantly, staying ahead of the curve is crucial for developers...",
      category: "Development",
    readTime: "6 min read",
      publishDate: "2024-01-10",
      views: 1923,
      likes: 89,
      tags: ["Full-Stack", "Trends", "Web Development", "Technology"],
      author: "Rishi Ahuja",
      featured: false,
      color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
      title: "Optimizing React Performance: Advanced Techniques and Best Practices",
      excerpt: "Deep dive into React performance optimization techniques that can significantly improve your application's speed and user experience.",
      content: "Performance optimization in React applications is crucial for delivering exceptional user experiences. In this post, we'll explore advanced techniques...",
      category: "Performance",
    readTime: "10 min read",
      publishDate: "2024-01-05",
      views: 3456,
      likes: 234,
      tags: ["React", "Performance", "Optimization", "JavaScript"],
      author: "Rishi Ahuja",
      featured: true,
      color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
      title: "Building Scalable Backend Systems with Node.js and Microservices",
      excerpt: "Learn how to design and implement scalable backend architectures using Node.js and microservices patterns.",
      content: "Scalability is a critical concern for modern applications. In this comprehensive guide, we'll explore how to build robust, scalable backend systems...",
    category: "Backend",
    readTime: "12 min read",
      publishDate: "2023-12-28",
      views: 4123,
      likes: 198,
      tags: ["Node.js", "Microservices", "Backend", "Scalability", "Architecture"],
      author: "Rishi Ahuja",
      featured: false,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "The Art of Code Review: Best Practices for Team Collaboration",
      excerpt: "Master the art of code review with proven strategies that improve code quality and team collaboration.",
      content: "Code review is more than just finding bugs. It's a collaborative process that improves code quality, knowledge sharing, and team dynamics...",
      category: "Collaboration",
      readTime: "7 min read",
      publishDate: "2023-12-20",
      views: 1678,
      likes: 112,
      tags: ["Code Review", "Collaboration", "Best Practices", "Team Work"],
      author: "Rishi Ahuja",
      featured: false,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const categories = [
    { id: "all", label: "All Posts", count: blogPosts.length },
    { id: "AI/ML", label: "AI/ML", count: blogPosts.filter(p => p.category === "AI/ML").length },
    { id: "Development", label: "Development", count: blogPosts.filter(p => p.category === "Development").length },
    { id: "Performance", label: "Performance", count: blogPosts.filter(p => p.category === "Performance").length },
    { id: "Backend", label: "Backend", count: blogPosts.filter(p => p.category === "Backend").length },
    { id: "Collaboration", label: "Collaboration", count: blogPosts.filter(p => p.category === "Collaboration").length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const generateAIInsights = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const insights = {
      totalPosts: blogPosts.length,
      avgReadTime: Math.round(blogPosts.reduce((acc, post) => acc + parseInt(post.readTime), 0) / blogPosts.length),
      totalViews: blogPosts.reduce((acc, post) => acc + post.views, 0),
      totalLikes: blogPosts.reduce((acc, post) => acc + post.likes, 0),
      topCategory: categories.slice(1).reduce((prev, current) => 
        (prev.count > current.count) ? prev : current
      ).label,
      trendingTags: ["AI", "React", "Performance", "TypeScript", "Node.js"],
      engagementRate: "4.2%",
      recommendations: [
        "Consider writing more about AI/ML integration",
        "Performance optimization posts show high engagement",
        "Backend architecture content is trending"
      ]
    };
    
    setAiInsights(insights);
    setIsAnalyzing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Blog & Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technical articles, insights, and thoughts on modern software development and AI
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
            <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white border-transparent"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                  <span className="text-sm font-medium">{category.label}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
            </motion.button>
          ))}
            </div>
          </div>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">AI Blog Analytics</h3>
                  <p className="text-sm text-muted-foreground">Get insights about your content performance</p>
                </div>
              </div>
              <motion.button
                onClick={generateAIInsights}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-medium hover:from-violet-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Insights
                  </>
                )}
              </motion.button>
            </div>

            {aiInsights && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-1">{aiInsights.totalPosts}</div>
                  <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-1">{aiInsights.avgReadTime}min</div>
                  <div className="text-sm text-muted-foreground">Avg Read Time</div>
          </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-1">{aiInsights.totalViews.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-1">{aiInsights.engagementRate}</div>
                  <div className="text-sm text-muted-foreground">Engagement Rate</div>
            </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ${
                post.featured ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-medium rounded-full">
                    Featured
                  </span>
                </div>
              )}

              {/* Post Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${post.color}`} />
                  <span className="text-sm text-muted-foreground">{post.category}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-foreground hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Post Stats and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {post.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.publishDate)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 className="w-4 h-4 text-muted-foreground" />
                    </motion.button>
                    <motion.button
                      onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-violet-600 hover:to-purple-600 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {selectedPost === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 p-8 bg-white/5"
                  >
                    <div className="prose prose-invert max-w-none">
                      <p className="text-foreground leading-relaxed mb-6">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{post.author}</div>
                            <div className="text-sm text-muted-foreground">Software Developer</div>
                          </div>
                        </div>
                        
                        <motion.button
                          className="ml-auto flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          Discuss
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter
            </p>
          </motion.div>
        )}

        {/* Blog Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Articles", value: blogPosts.length, icon: BookOpen },
            { label: "Total Views", value: blogPosts.reduce((acc, post) => acc + post.views, 0).toLocaleString(), icon: Eye },
            { label: "Total Likes", value: blogPosts.reduce((acc, post) => acc + post.likes, 0), icon: ThumbsUp },
            { label: "Categories", value: categories.length - 1, icon: Network }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
          </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


