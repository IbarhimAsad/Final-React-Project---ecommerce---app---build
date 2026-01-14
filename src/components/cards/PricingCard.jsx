import { Link } from "react-router-dom"
import Badge from "../ui/Badge"

export default function PricingCard({ plan, featured = false }) {
  return (
    <div
      className={`rounded-2xl p-8 ${
        featured
          ? "bg-primary-600 text-white ring-4 ring-primary-600 ring-offset-4 dark:ring-offset-gray-900"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      {featured && <Badge className="mb-4 bg-white text-primary-600">Most Popular</Badge>}
      <h3 className={`text-xl font-bold mb-2 ${featured ? "text-white" : "text-gray-900 dark:text-white"}`}>
        {plan.name}
      </h3>
      <p className={`text-sm mb-6 ${featured ? "text-primary-100" : "text-gray-600 dark:text-gray-400"}`}>
        {plan.description}
      </p>
      <div className="mb-6">
        <span className={`text-4xl font-bold ${featured ? "text-white" : "text-gray-900 dark:text-white"}`}>
          ${plan.price}
        </span>
        <span className={featured ? "text-primary-100" : "text-gray-500 dark:text-gray-400"}>/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <svg
              className={`w-5 h-5 ${featured ? "text-primary-200" : "text-green-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={featured ? "text-primary-50" : "text-gray-600 dark:text-gray-300"}>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/register"
        className={`block w-full py-3 rounded-lg font-semibold text-center transition-colors ${
          featured ? "bg-white text-primary-600 hover:bg-primary-50" : "bg-primary-600 text-white hover:bg-primary-700"
        }`}
      >
        Get Started
      </Link>
    </div>
  )
}
