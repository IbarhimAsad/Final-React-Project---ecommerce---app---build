import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import Badge from "../components/ui/Badge"
import { PageLoader } from "../components/ui/Loader"

export default function Instructors() {
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInstructors() {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      const data = await import("../data/products.json")
      const products = data.default

      const map = new Map()
      products.forEach((p) => {
        if (!map.has(p.instructor)) {
          map.set(p.instructor, {
            name: p.instructor,
            primaryCategory: p.category,
            courses: [p],
            rating: p.rating,
            students: p.students,
          })
        } else {
          const existing = map.get(p.instructor)
          existing.courses.push(p)
          existing.rating = Math.max(existing.rating, p.rating)
          existing.students += p.students
          map.set(p.instructor, existing)
        }
      })

      const list = Array.from(map.values()).sort((a, b) => b.students - a.students)
      setInstructors(list)
      setLoading(false)
    }
    fetchInstructors()
  }, [])

  const totalStudents = useMemo(
    () => instructors.reduce((sum, inst) => sum + inst.students, 0),
    [instructors],
  )

  if (loading) return <PageLoader />

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Instructors</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Learn from experienced professionals who teach real-world skills through hands-on projects.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{instructors.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Expert Instructors</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {totalStudents.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {instructors.reduce((sum, inst) => sum + inst.courses.length, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Courses Taught</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">4.8</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((inst) => {
            const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              inst.name,
            )}&background=2563eb&color=ffffff`

            return (
              <div
                key={inst.name}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={avatar}
                    alt={inst.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900/50"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{inst.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{inst.primaryCategory} Instructor</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium text-gray-900 dark:text-white">{inst.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{inst.courses.length} course{inst.courses.length > 1 ? "s" : ""}</span>
                  <span>•</span>
                  <span>{inst.students.toLocaleString()} students</span>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Courses</h3>
                  <ul className="space-y-1">
                    {inst.courses.slice(0, 3).map((course) => (
                      <li key={course.id} className="flex items-center justify-between text-sm">
                        <Link
                          to={`/products/${course.id}`}
                          className="text-primary-600 dark:text-primary-400 hover:underline truncate"
                        >
                          {course.title}
                        </Link>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">${course.price}</span>
                      </li>
                    ))}
                    {inst.courses.length > 3 && (
                      <li className="text-xs text-gray-500 dark:text-gray-400">
                        + {inst.courses.length - 3} more course{inst.courses.length - 3 > 1 ? "s" : ""}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm">
                  <Badge>Top Instructor</Badge>
                  <Link
                    to={`/products?instructor=${encodeURIComponent(inst.name)}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                  >
                    View all courses
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


