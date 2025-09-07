"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen, Brain, BarChart3, ExternalLink, GitCompare, Lightbulb } from "lucide-react";

interface BlogSectionProps {
  id: string;
}

const blogPosts = [
  {
    id: 1,
    title: "Building AI-Powered Financial Sentiment Analysis",
    excerpt: "A deep dive into creating machine learning models that analyze news headlines and predict stock market sentiment...",
    category: "AI/ML",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    tags: ["Machine Learning", "NLP", "Finance", "Python"],
    content: "This post explores the development of an AI-powered financial sentiment analysis tool..."
  },
  {
    id: 2,
    title: "Next.js 14: The Future of React Development",
    excerpt: "Exploring the latest features in Next.js 14, including the App Router, Server Components, and performance improvements...",
    category: "Frontend",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    tags: ["React", "Next.js", "Web Development", "Performance"],
    content: "Next.js 14 introduces groundbreaking features that revolutionize React development..."
  },
  {
    id: 3,
    title: "The Rise of AI in Software Development",
    excerpt: "How artificial intelligence is transforming the way we write, review, and maintain code in modern software projects...",
    category: "AI/ML",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    tags: ["AI", "Software Development", "Code Generation", "Productivity"],
    content: "AI is rapidly changing the landscape of software development..."
  },
  {
    id: 4,
    title: "Building Scalable Microservices with Node.js",
    excerpt: "A comprehensive guide to designing and implementing microservices architecture using Node.js and modern tools...",
    category: "Backend",
    date: "Nov 30, 2024",
    readTime: "12 min read",
    tags: ["Node.js", "Microservices", "Architecture", "Scalability"],
    content: "Microservices architecture offers numerous benefits for modern applications..."
  }
];

const categories = ["All", "AI/ML", "Frontend", "Backend", "DevOps"];

export default function BlogSection({ id }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [aiComparison, setAiComparison] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [explainFor12, setExplainFor12] = useState("");

  const filteredPosts = blogPosts.filter(post => 
    selectedCategory === "All" || post.category === selectedCategory
  );

  const handlePostSelection = (postId: number) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleAIComparison = async () => {
    if (selectedPosts.length !== 2) return;
    
    setIsComparing(true);
    // Simulate AI comparison
    setTimeout(() => {
      const post1 = blogPosts.find(p => p.id === selectedPosts[0]);
      const post2 = blogPosts.find(p => p.id === selectedPosts[1]);
      
      setAiComparison(`AI Analysis: Comparing "${post1?.title}" and "${post2?.title}"

Key Differences:
• ${post1?.category} vs ${post2?.category}: Different technical focus areas
• ${post1?.readTime} vs ${post2?.readTime}: Varying complexity levels
• ${post1?.tags.join(', ')} vs ${post2?.tags.join(', ')}: Distinct technology stacks

Similarities:
• Both demonstrate strong technical writing skills
• Clear structure and practical examples
• Engaging content for developers

Recommendation: Both posts are excellent reads, but choose based on your current learning goals.`);
      setIsComparing(false);
    }, 2000);
  };

  const handleExplainFor12 = async (postId: number) => {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    // Simulate AI explanation
    setTimeout(() => {
      setExplainFor12(`Here's "${post.title}" explained for a 12-year-old:

Imagine you're building a really cool robot that can read the news and tell you if it's good or bad news for your favorite video game company's stock price. That's what this post is about!

Instead of you having to read hundreds of news articles every day, this AI robot does it for you and gives you a simple score. It's like having a super-smart friend who's really good at understanding feelings and can tell you if the news is happy, sad, or just okay.

The robot learns from lots of examples, just like how you learn to recognize if someone is happy or sad by looking at their face and listening to their voice. Pretty cool, right?`);
    }, 1500);
  };

  return (
    <section id={id} className="py-20 bg-muted/20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Blog & Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Thoughts, tutorials, and insights on AI/ML, web development, and technology
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* AI Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {/* AI Compare */}
          <div className="bg-card border border-border/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <GitCompare className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">AI Compare Posts</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Select two blog posts to get an AI-powered comparison
            </p>
            <div className="space-y-3">
              {filteredPosts.slice(0, 4).map((post) => (
                <label key={post.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handlePostSelection(post.id)}
                    className="rounded border-border/20 text-primary focus:ring-primary/50"
                  />
                  <span className="text-sm">{post.title.substring(0, 40)}...</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleAIComparison}
              disabled={selectedPosts.length !== 2 || isComparing}
              className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isComparing ? "Comparing..." : "Compare with AI"}
            </button>
          </div>

          {/* Explain for 12-year-old */}
          <div className="bg-card border border-border/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Explain for 12-year-old</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get a simplified explanation of any blog post
            </p>
            <select
              onChange={(e) => handleExplainFor12(Number(e.target.value))}
              className="w-full p-2 bg-muted border border-border/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select a post...</option>
              {filteredPosts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title.substring(0, 50)}...
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* AI Comparison Result */}
        {aiComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-12 bg-card border border-border/20 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Comparison Result
            </h3>
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground bg-muted p-4 rounded-lg overflow-auto">
              {aiComparison}
            </pre>
          </motion.div>
        )}

        {/* Explain for 12 Result */}
        {explainFor12 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-12 bg-card border border-border/20 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-green-500" />
              Simplified Explanation
            </h3>
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground bg-muted p-4 rounded-lg overflow-auto">
              {explainFor12}
            </pre>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border/20 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Graph Navigation Hint */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block p-6 bg-card/50 border border-border/20 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Graph-Based Navigation</h3>
            </div>
            <p className="text-muted-foreground">
              Coming soon: Interactive force-directed graph showing relationships 
              between blog topics and technologies
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
