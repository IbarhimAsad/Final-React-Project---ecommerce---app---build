import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import { PageLoader } from "../components/ui/Loader"

export default function Checkout() {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  })

  if (!state.user) {
    navigate("/login")
    return null
  }

  if (state.cart.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Add some courses to your cart before checkout</p>
          <Button onClick={() => navigate("/products")}>Browse Courses</Button>
        </div>
      </div>
    )
  }

  const subtotal = state.cart.reduce((acc, item) => acc + item.price, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: state.cart,
      total,
      status: "completed",
      paymentMethod,
    }

    dispatch({ type: "ADD_ORDER", payload: order })
    dispatch({ type: "CLEAR_CART" })
    setLoading(false)
    navigate("/orders")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {["card", "paypal", "bank"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      paymentMethod === method
                        ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-primary-400"
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white capitalize">{method}</div>
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <form className="space-y-4">
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  <Input label="Cardholder Name" name="cardName" value={formData.cardName} onChange={handleChange} placeholder="John Doe" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    <Input label="CVV" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" maxLength={3} type="password" />
                  </div>
                </form>
              )}

              {paymentMethod === "paypal" && (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">You will be redirected to PayPal to complete your payment</p>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">Bank transfer details will be sent to your email</p>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Billing Address</h2>
              <form className="space-y-4">
                <Input label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" name="city" value={formData.city} onChange={handleChange} placeholder="New York" />
                  <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="10001" />
                </div>
                <Input label="Country" name="country" value={formData.country} onChange={handleChange} placeholder="United States" />
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {state.cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate text-sm">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

