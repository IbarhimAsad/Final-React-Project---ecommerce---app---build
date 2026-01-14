"use client"

import type React from "react"

import { useState, useEffect } from "react"

// Theme Context
import { createContext, useContext } from "react"
import Link from "next/link"

const ThemeContext = createContext<{
  darkMode: boolean
  toggleDarkMode: () => void
}>({
  darkMode: false,
  toggleDarkMode: () => {},
})

function useTheme() {
  return useContext(ThemeContext)
}

// App Context
type Product = {
  id: number
  title: string
  description: string
  price: number
  originalPrice: number
  image: string
  category: string
  rating: number
  reviews: number
  instructor: string
  duration: string
  level: string
  students: number
  featured: boolean
}

type Testimonial = {
  id: number
  name: string
  role: string
  image: string
  content: string
  rating: number
  course: string
}

const AppContext = createContext<{
  cart: Product[]
  wishlist: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (id: number) => void
}>({
  cart: [],
  wishlist: [],
  addToCart: () => {},
  removeFromCart: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
})

function useApp() {
  return useContext(AppContext)
}

// Products data
const productsData: Product[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack developer.",
    price: 89.99,
    originalPrice: 199.99,
    image: "/web-development-course.png",
    category: "Development",
    rating: 4.8,
    reviews: 2456,
    instructor: "Sarah Johnson",
    duration: "52 hours",
    level: "Beginner",
    students: 45230,
    featured: true,
  },
  {
    id: 2,
    title: "Advanced React & Next.js Masterclass",
    description:
      "Master React hooks, context, Redux, Next.js 14, Server Components, and build production-ready applications.",
    price: 79.99,
    originalPrice: 149.99,
    image: "/react-nextjs-course.jpg",
    category: "Development",
    rating: 4.9,
    reviews: 1823,
    instructor: "Michael Chen",
    duration: "38 hours",
    level: "Intermediate",
    students: 28450,
    featured: true,
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles, Figma, wireframing, prototyping, and create beautiful user interfaces.",
    price: 69.99,
    originalPrice: 129.99,
    image: "/ui-ux-design-course.png",
    category: "Design",
    rating: 4.7,
    reviews: 1245,
    instructor: "Emma Wilson",
    duration: "28 hours",
    level: "Beginner",
    students: 19870,
    featured: true,
  },
]

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Frontend Developer at Google",
    image: "/professional-man-portrait.png",
    content:
      "LearnHub completely transformed my career. The web development bootcamp gave me the skills I needed to land my dream job.",
    rating: 5,
    course: "Complete Web Development Bootcamp",
  },
  {
    id: 2,
    name: "Jennifer Chen",
    role: "UX Designer at Airbnb",
    image: "/professional-woman-portrait.png",
    content:
      "The UI/UX Design course was exactly what I needed. The practical projects helped me build an impressive portfolio.",
    rating: 5,
    course: "UI/UX Design Fundamentals",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Data Scientist at Netflix",
    image: "/professional-man-african-american-portrait.jpg",
    content:
      "The Python for Data Science course is comprehensive and well-structured. I went from zero to analyzing real datasets.",
    rating: 5,
    course: "Python for Data Science",
  },
  {
    id: 4,
    name: "Sophie Williams",
    role: "Full Stack Developer at Stripe",
    image: "/professional-woman-blonde-portrait.jpg",
    content: "The React masterclass is top-notch. The instructor explains complex concepts simply. Highly recommended!",
    rating: 5,
    course: "Advanced React & Next.js Masterclass",
  },
]

// Badge Component
function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode
  variant?: "default" | "primary" | "success" | "warning" | "danger"
  className?: string
}) {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

// Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.content}"</p>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image || "/placeholder.svg"}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

// Pricing Card Component
function PricingCard({
  plan,
  featured = false,
}: {
  plan: { name: string; description: string; price: number; features: string[] }
  featured?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-8 ${
        featured
          ? "bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-4 dark:ring-offset-gray-900"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      {featured && <Badge className="mb-4 bg-white text-blue-600">Most Popular</Badge>}
      <h3 className={`text-xl font-bold mb-2 ${featured ? "text-white" : "text-gray-900 dark:text-white"}`}>
        {plan.name}
      </h3>
      <p className={`text-sm mb-6 ${featured ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>
        {plan.description}
      </p>
      <div className="mb-6">
        <span className={`text-4xl font-bold ${featured ? "text-white" : "text-gray-900 dark:text-white"}`}>
          ${plan.price}
        </span>
        <span className={featured ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}>/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <svg
              className={`w-5 h-5 ${featured ? "text-blue-200" : "text-green-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={featured ? "text-blue-50" : "text-gray-600 dark:text-gray-300"}>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`block w-full py-3 rounded-lg font-semibold text-center transition-colors ${
          featured ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Get Started
      </button>
    </div>
  )
}

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  const { cart } = useApp()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">LearnHub</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: "Blog", href: "/blog" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <div className="hidden md:flex items-center gap-2">
              <button className="px-4 py-2 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Login
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-1">
              {[
                { label: "Home", href: "/" },
                { label: "Courses", href: "/courses" },
                { label: "Blog", href: "/blog" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 text-left"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
                <button className="px-4 py-2 text-gray-600 dark:text-gray-300 text-sm font-medium text-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  Login
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium text-center">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-white">LearnHub</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Empowering learners worldwide with high-quality online education.
            </p>
          </div>

          {[
            { title: "Product", links: ["Courses", "Pricing", "Features"] },
            { title: "Company", links: ["About", "Blog", "Contact"] },
            { title: "Support", links: ["Help Center", "Terms", "Privacy"] },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <button className="text-sm text-gray-400 hover:text-white transition-colors">{link}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
export default function LearnHubApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [cart, setCart] = useState<Product[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("darkMode")
    if (saved) setDarkMode(JSON.parse(saved))

    const savedCart = localStorage.getItem("cart")
    if (savedCart) setCart(JSON.parse(savedCart))

    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  const addToCart = (product: Product) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, product])
    }
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const addToWishlist = (product: Product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product])
    }
  }

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id))
  }

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

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <AppContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist }}>
        <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
          <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
            <Navbar />

            <main>
              {/* Hero Section */}
              <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight text-balance">
                        Unlock Your <span className="text-blue-600">Potential</span> with Online Learning
                      </h1>
                      <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 text-pretty">
                        Join over 100,000+ learners worldwide. Access high-quality courses from industry experts and
                        transform your career today.
                      </p>
                      <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
                          Explore Courses
                        </button>
                        <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center">
                          Learn More
                        </button>
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
                      <img
                        src="/online-learning-student.png"
                        alt="Student learning online"
                        className="rounded-2xl shadow-2xl"
                      />
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
              <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Why Choose LearnHub?
                    </h2>
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
              <section className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Featured Courses
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Our most popular courses chosen by thousands of learners.
                      </p>
                    </div>
                    <button className="hidden sm:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                      View All
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productsData.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Testimonials */}
              <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      What Our Students Say
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      Join thousands of satisfied learners who have transformed their careers.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonialsData.map((testimonial) => (
                      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Pricing */}
              <section className="py-20 bg-white dark:bg-gray-800">
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
              <section className="py-20 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Learning?</h2>
                  <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                    Join LearnHub today and get access to hundreds of courses. Start your journey to success now.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                      Get Started Free
                    </button>
                    <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                      Browse Courses
                    </button>
                  </div>
                </div>
              </section>
            </main>

            <Footer />
          </div>
        </div>
      </AppContext.Provider>
    </ThemeContext.Provider>
  )
}



// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const { cart, wishlist, addToCart, addToWishlist, removeFromWishlist } = useApp()
  const isInCart = cart.some((item) => item.id === product.id)
  const isInWishlist = wishlist.some((item) => item.id === product.id)
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <Badge variant="primary" className="absolute top-3 left-3">
            Bestseller
          </Badge>
        )}
        <button
          onClick={() => (isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product))}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isInWishlist ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-white"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill={isInWishlist ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge>{product.category}</Badge>
          <Badge variant="success">{product.level}</Badge>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          by <span className="text-gray-700 dark:text-gray-300">{product.instructor}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.380-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium text-gray-900 dark:text-white">{product.rating}</span>
          </div>
          <span className="text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{product.duration}</span>
          <span>•</span>
          <span>{product.students.toLocaleString()} students</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
            <Badge variant="danger">{discount}% off</Badge>
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          className={`mt-4 w-full py-2.5 rounded-lg font-medium transition-colors ${
            isInCart
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
