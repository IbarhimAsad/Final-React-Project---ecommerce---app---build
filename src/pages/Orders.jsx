import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useApp } from "../context/AppContext"
import Badge from "../components/ui/Badge"
import EmptyState from "../components/ui/EmptyState"
import { PageLoader } from "../components/ui/Loader"

export default function Orders() {
  const navigate = useNavigate()
  const { state } = useApp()

  useEffect(() => {
    if (!state.user) {
      navigate("/login")
    }
  }, [state.user, navigate])

  if (!state.user) return <PageLoader />

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success"
      case "pending":
        return "warning"
      case "cancelled":
        return "danger"
      default:
        return "default"
    }
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">View your purchase history and order details</p>
        </div>

        {state.orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="Your completed purchases will appear here"
            action="Browse Courses"
            onAction={() => navigate("/products")}
          />
        ) : (
          <div className="space-y-4">
            {state.orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order #{order.id}</h3>
                        <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{order.items.length} course{order.items.length > 1 ? "s" : ""}</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.map((item) => (
                        <Link
                          key={item.id}
                          to={`/products/${item.id}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white truncate text-sm">{item.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">${item.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Link
                      to={`/learn/${order.items[0]?.id}`}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                      Start Learning
                    </Link>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

