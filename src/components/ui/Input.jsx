export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>}
      <input
        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 
          ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-primary-500"
          } 
          focus:ring-2 focus:border-transparent outline-none transition-all duration-200
          ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
