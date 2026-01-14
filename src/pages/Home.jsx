import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/cards/ProductCard"
import FeatureCard from "../components/cards/FeatureCard"
import TestimonialCard from "../components/cards/TestimonialCard"
import PricingCard from "../components/cards/PricingCard"
import { PageLoader } from "../components/ui/Loader"

export default function Home() {
  const [products, setProducts] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const [productsRes, testimonialsRes] = await Promise.all([
        import("../data/products.json"),
        import("../data/testimonials.json"),
      ])
      setProducts(productsRes.default.filter((p) => p.featured).slice(0, 3))
      setTestimonials(testimonialsRes.default)
      setLoading(false)
    }
    fetchData()
  }, [])

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Hands-on Projects",
      description: "Build real-world projects to add to your portfolio and gain practical skills.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Lifetime Access",
      description: "Get unlimited access to course materials and future updates forever.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      title: "Certificate",
      description: "Earn a verified certificate upon completion to showcase your skills.",
    },
  ]

  const pricingPlans = [
    {
      name: "Basic",
      description: "Perfect for getting started",
      price: 0,
      features: ["Access to free courses", "Community forum access", "Basic certificate"],
    },
    {
      name: "Pro",
      description: "Best for serious learners",
      price: 29,
      features: [
        "All Basic features",
        "Unlimited course access",
        "Priority support",
        "Pro certificate",
        "Offline downloads",
      ],
    },
    {
      name: "Teams",
      description: "For organizations",
      price: 79,
      features: ["All Pro features", "Team management", "Analytics dashboard", "Custom learning paths", "API access"],
    },
  ]

  if (loading) return <PageLoader />

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight text-balance">
                Unlock Your <span className="text-primary-600">Potential</span> with Online Learning
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 text-pretty">
                Join over 100,000+ learners worldwide. Access high-quality courses from industry experts and transform
                your career today.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">100K+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">500+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="/online-learning-student-with-laptop-studying.jpg" alt="Student learning online" className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Course Completed!</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Web Development</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose LearnHub?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Featured Courses</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Our most popular courses chosen by thousands of learners.
              </p>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium"
            >
              View All Courses
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Students Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied learners who have transformed their careers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the plan that works best for you. No hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} featured={index === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join LearnHub today and get access to hundreds of courses. Start your journey to success now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
