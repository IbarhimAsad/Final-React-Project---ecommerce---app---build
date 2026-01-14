import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useApp } from "../context/AppContext"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import { PageLoader } from "../components/ui/Loader"
import ErrorState from "../components/ui/ErrorState"

export default function ProductDetails() {
  const { id } = useParams()
  const { state, dispatch } = useApp()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setError(null)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const data = await import("../data/products.json")
        const found = data.default.find((p) => p.id === Number.parseInt(id))
        if (!found) {
          throw new Error("Course not found")
        }
        setProduct(found)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <PageLoader />
  if (error) return <ErrorState title="Course not found" message={error} onRetry={() => window.location.reload()} />

  const isInCart = state.cart.some((item) => item.id === product.id)
  const isInWishlist = state.wishlist.some((item) => item.id === product.id)
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)
  const instructorAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    product.instructor,
  )}&background=2563eb&color=ffffff`

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }
  }

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id })
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product })
    }
  }

  const curriculum = [
    { title: "Introduction & Setup", lessons: 5, duration: "45 min" },
    { title: "Core Fundamentals", lessons: 12, duration: "3 hours" },
    { title: "Building Projects", lessons: 8, duration: "4 hours" },
    { title: "Advanced Techniques", lessons: 10, duration: "5 hours" },
    { title: "Final Project", lessons: 3, duration: "2 hours" },
  ]

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-xl overflow-hidden mb-6">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{product.category}</Badge>
              <Badge variant="success">{product.level}</Badge>
              {product.featured && <Badge variant="primary">Bestseller</Badge>}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.title}</h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-gray-900 dark:text-white">{product.rating}</span>
                <span>({product.reviews.toLocaleString()} reviews)</span>
              </div>
              <span>•</span>
              <span>{product.students.toLocaleString()} students</span>
              <span>•</span>
              <span>{product.duration}</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <img src={instructorAvatar} alt={product.instructor} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Created by</div>
                <div className="font-semibold text-gray-900 dark:text-white">{product.instructor}</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Build real-world projects from scratch",
                  "Master modern development tools",
                  "Understand best practices",
                  "Learn debugging techniques",
                  "Write clean, maintainable code",
                  "Deploy to production",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Curriculum</h2>
              <div className="space-y-3">
                {curriculum.map((section, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold text-sm">
                        {i + 1}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{section.title}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {section.lessons} lessons • {section.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Student Reviews</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Alex Rivera",
                    rating: 5,
                    date: "2 weeks ago",
                    comment: "This course exceeded my expectations! The instructor explains everything clearly and the projects are practical. Highly recommended!",
                  },
                  {
                    name: "Sarah Chen",
                    rating: 5,
                    date: "1 month ago",
                    comment: "Amazing course! I learned so much and was able to apply the knowledge immediately in my projects. The support is also great.",
                  },
                  {
                    name: "Michael Johnson",
                    rating: 4,
                    date: "2 months ago",
                    comment: "Great content and well-structured. Some sections could be more detailed, but overall a solid course.",
                  },
                ].map((review, i) => (
                  <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, j) => (
                              <svg
                                key={j}
                                className={`w-4 h-4 ${j < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {state.user && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Write a Review</h3>
                  <textarea
                    placeholder="Share your thoughts about this course..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 mb-3"
                  />
                  <Button size="sm">Submit Review</Button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                <Badge variant="danger">{discount}% off</Badge>
              </div>

              <div className="space-y-3 mb-6">
                <Button variant={isInCart ? "secondary" : "primary"} className="w-full" onClick={handleAddToCart}>
                  {isInCart ? "Added to Cart" : "Add to Cart"}
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={handleToggleWishlist}>
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                30-Day Money-Back Guarantee
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">This course includes:</h3>
                <ul className="space-y-3">
                  {[
                    {
                      icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                      text: `${product.duration} on-demand video`,
                    },
                    {
                      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                      text: "15 articles & resources",
                    },
                    {
                      icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                      text: "Downloadable materials",
                    },
                    {
                      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                      text: "Access on mobile & TV",
                    },
                    {
                      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                      text: "Certificate of completion",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
