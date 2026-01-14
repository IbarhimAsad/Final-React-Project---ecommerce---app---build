import { useState, useEffect, useMemo } from "react"
import ProductCard from "../components/cards/ProductCard"
import SearchBar from "../components/filters/SearchBar"
import FilterDropdown from "../components/filters/FilterDropdown"
import { PageLoader } from "../components/ui/Loader"
import EmptyState from "../components/ui/EmptyState"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [instructor, setInstructor] = useState(() => {
    if (typeof window === "undefined") return ""
    const params = new URLSearchParams(window.location.search)
    return params.get("instructor") || ""
  })

  useEffect(() => {
    async function fetchProducts() {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const data = await import("../data/products.json")
      setProducts(data.default)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const categories = [
    { value: "", label: "All" },
    { value: "Development", label: "Development" },
    { value: "Design", label: "Design" },
    { value: "Data Science", label: "Data Science" },
    { value: "Marketing", label: "Marketing" },
    { value: "Cloud", label: "Cloud" },
  ]

  const levels = [
    { value: "", label: "All" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ]

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
  ]

  const instructors = useMemo(() => {
    const set = new Set()
    products.forEach((p) => set.add(p.instructor))
    return [{ value: "", label: "All Instructors" }, ...Array.from(set).map((name) => ({ value: name, label: name }))]
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (search) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.instructor.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (category) {
      result = result.filter((p) => p.category === category)
    }

    if (level) {
      result = result.filter((p) => p.level === level)
    }

    if (instructor) {
      result = result.filter((p) => p.instructor === instructor)
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
        result.sort((a, b) => b.students - a.students)
        break
    }

    return result
  }, [products, search, category, level, sortBy, instructor])

  if (loading) return <PageLoader />

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">All Courses</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover {products.length}+ courses to boost your skills</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search courses, instructors..." />
          </div>
          <div className="flex flex-wrap gap-3">
            <FilterDropdown label="Category" options={categories} value={category} onChange={setCategory} />
            <FilterDropdown label="Level" options={levels} value={level} onChange={setLevel} />
            <FilterDropdown label="Instructor" options={instructors} value={instructor} onChange={setInstructor} />
            <FilterDropdown label="Sort" options={sortOptions} value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "course" : "courses"}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
            title="No courses found"
            description="Try adjusting your search or filters to find what you're looking for."
            action="Clear Filters"
            onAction={() => {
              setSearch("")
              setCategory("")
              setLevel("")
              setSortBy("")
            }}
          />
        )}
      </div>
    </div>
  )
}
