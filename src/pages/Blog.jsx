import Badge from "../components/ui/Badge"

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "10 Tips to Learn Programming Faster",
      excerpt:
        "Discover proven strategies to accelerate your coding journey and become a better developer in less time.",
      image: "/coding-programming-tips-learn.jpg",
      category: "Learning",
      author: "Sarah Johnson",
      date: "Jan 10, 2026",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Future of Web Development in 2026",
      excerpt: "Explore the latest trends and technologies shaping the future of web development.",
      image: "/future-web-development-technology.jpg",
      category: "Technology",
      author: "Michael Chen",
      date: "Jan 8, 2026",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "How to Build a Successful Career in Tech",
      excerpt: "Learn the essential steps to launch and grow your career in the technology industry.",
      image: "/tech-career-success-professional.jpg",
      category: "Career",
      author: "Emma Wilson",
      date: "Jan 5, 2026",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Introduction to Machine Learning for Beginners",
      excerpt: "A comprehensive guide to understanding the basics of machine learning and AI.",
      image: "/machine-learning-ai-artificial-intelligence.jpg",
      category: "AI",
      author: "David Park",
      date: "Jan 3, 2026",
      readTime: "10 min read",
    },
    {
      id: 5,
      title: "Best Practices for Remote Learning",
      excerpt: "Maximize your online learning experience with these effective strategies and tips.",
      image: "/remote-learning-online-education-home.jpg",
      category: "Learning",
      author: "Lisa Martinez",
      date: "Dec 28, 2025",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "Design Systems: A Complete Guide",
      excerpt: "Learn how to create and maintain design systems that scale across your organization.",
      image: "/design-systems-ui-ux-components.jpg",
      category: "Design",
      author: "Anna Thompson",
      date: "Dec 25, 2025",
      readTime: "7 min read",
    },
  ]

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog & Resources</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest insights, tutorials, and tips from our expert instructors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <Badge className="mb-3">{post.category}</Badge>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  )
}
