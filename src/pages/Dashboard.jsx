import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useApp } from "../context/AppContext"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import Badge from "../components/ui/Badge"
import Modal from "../components/modal/Modal"
import EmptyState from "../components/ui/EmptyState"
import { PageLoader } from "../components/ui/Loader"

export default function Dashboard() {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("products")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Development",
  })

  useEffect(() => {
    if (!state.user) {
      navigate("/login")
      return
    }

    async function loadProducts() {
      if (state.dashboardProducts.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const data = await import("../data/products.json")
        dispatch({ type: "SET_DASHBOARD_PRODUCTS", payload: data.default })
      }
      setLoading(false)
    }
    loadProducts()
  }, [state.user, navigate, dispatch, state.dashboardProducts.length])

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/")
  }

  const openAddModal = () => {
    setEditingProduct(null)
    setFormData({ title: "", description: "", price: "", category: "Development" })
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const productData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      id: editingProduct ? editingProduct.id : Date.now(),
      originalPrice: Number.parseFloat(formData.price) * 1.5,
      image: "/online-course-education.png",
      rating: 4.5,
      reviews: 0,
      instructor: state.user.name,
      duration: "10 hours",
      level: "Beginner",
      students: 0,
      featured: false,
    }

    if (editingProduct) {
      dispatch({ type: "UPDATE_DASHBOARD_PRODUCT", payload: { ...editingProduct, ...productData } })
    } else {
      dispatch({ type: "ADD_DASHBOARD_PRODUCT", payload: productData })
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch({ type: "DELETE_DASHBOARD_PRODUCT", payload: id })
    }
  }

  const paginatedProducts = state.dashboardProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(state.dashboardProducts.length / itemsPerPage)

  if (loading) return <PageLoader />

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {state.user?.name}!</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your courses and track your progress</p>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Courses",
              value: state.dashboardProducts.length,
              icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
            },
            { label: "In Cart", value: state.cart.length, icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
            {
              label: "Enrolled Courses",
              value: state.enrolledCourses.length,
              icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
            },
            {
              label: "Total Orders",
              value: state.orders.length,
              icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
            },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              {["products", "cart", "wishlist"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setCurrentPage(1)
                  }}
                  className={`px-6 py-4 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-primary-600 text-primary-600 dark:text-primary-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab === "products" ? "My Courses" : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "products" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Courses</h2>
                  <div className="flex gap-3">
                    <Link to="/profile">
                      <Button variant="secondary">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </Button>
                    </Link>
                    <Button onClick={openAddModal}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Course
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "products" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Courses</h2>
                  <Button onClick={openAddModal}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Course
                  </Button>
                </div>

                {paginatedProducts.length > 0 ? (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                            <th className="pb-3 font-medium">Course</th>
                            <th className="pb-3 font-medium">Category</th>
                            <th className="pb-3 font-medium">Price</th>
                            <th className="pb-3 font-medium">Students</th>
                            <th className="pb-3 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {paginatedProducts.map((product) => (
                            <tr key={product.id}>
                              <td className="py-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.title}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                  <div className="max-w-xs">
                                    <div className="font-medium text-gray-900 dark:text-white truncate">
                                      {product.title}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{product.instructor}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4">
                                <Badge>{product.category}</Badge>
                              </td>
                              <td className="py-4 text-gray-900 dark:text-white">${product.price}</td>
                              <td className="py-4 text-gray-600 dark:text-gray-400">
                                {product.students.toLocaleString()}
                              </td>
                              <td className="py-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => openEditModal(product)}
                                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                          >
                            Previous
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <EmptyState
                    title="No courses yet"
                    description="Create your first course to get started"
                    action="Add Course"
                    onAction={openAddModal}
                  />
                )}
              </>
            )}

            {activeTab === "cart" &&
              (state.cart.length > 0 ? (
                <div className="space-y-4">
                  {state.cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${item.price}</p>
                        </div>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total: ${state.cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                    </span>
                    <Link to="/checkout">
                      <Button>Checkout</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <EmptyState title="Your cart is empty" description="Browse courses and add them to your cart" />
              ))}

            {activeTab === "wishlist" &&
              (state.wishlist.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {state.wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">${item.price}</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}>
                            Add to Cart
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item.id })}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState title="Your wishlist is empty" description="Save courses you're interested in for later" />
              ))}

            {activeTab === "cart" && state.cart.length > 0 && (
              <div className="mb-4">
                <Link to="/checkout">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit Course" : "Add New Course"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Course title"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Course description"
              rows={3}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
            />
          </div>
          <Input
            label="Price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
            placeholder="99.99"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Data Science">Data Science</option>
              <option value="Marketing">Marketing</option>
              <option value="Cloud">Cloud</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingProduct ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
