import { Link } from "react-router-dom"
import { useApp } from "../../context/AppContext"
import Badge from "../ui/Badge"

export default function ProductCard({ product }) {
  const { state, dispatch } = useApp()
  const isInCart = state.cart.some((item) => item.id === product.id)
  const isInWishlist = state.wishlist.some((item) => item.id === product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (!isInCart) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    if (isInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id })
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product })
    }
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
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
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isInWishlist ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-white"
          }`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
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

        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          by <span className="text-gray-700 dark:text-gray-300">{product.instructor}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
          onClick={handleAddToCart}
          className={`mt-4 w-full py-2.5 rounded-lg font-medium transition-colors ${
            isInCart
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-primary-600 text-white hover:bg-primary-700"
          }`}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </Link>
  )
}
