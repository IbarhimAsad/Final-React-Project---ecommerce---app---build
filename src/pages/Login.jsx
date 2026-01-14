import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

export default function Login() {
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const DEMO_USER = {
    email: "student@learnhub.com",
    password: "password123",
    name: "Demo Student",
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const { email, password } = formData

    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      setErrors((prev) => ({
        ...prev,
        general: "Invalid email or password. Use the demo credentials shown below.",
      }))
      setLoading(false)
      return
    }

    dispatch({
      type: "SET_USER",
      payload: {
        id: 1,
        name: DEMO_USER.name,
        email: DEMO_USER.email,
      },
    })
    setLoading(false)
    navigate("/dashboard")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to continue your learning journey</p>
          <p className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Demo account</span>:{" "}
            <span className="font-mono">student@learnhub.com</span> / <span className="font-mono">password123</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {errors.general && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-900/40 dark:text-red-100">
              {errors.general}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
