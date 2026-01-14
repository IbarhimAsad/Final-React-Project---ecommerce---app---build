import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import { PageLoader } from "../components/ui/Loader"
import ErrorState from "../components/ui/ErrorState"

export default function CoursePlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState([])

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const data = await import("../data/products.json")
        const found = data.default.find((p) => p.id === Number.parseInt(id))
        if (!found) {
          throw new Error("Course not found")
        }
        setProduct(found)

        // Check if user is enrolled
        const enrolled = state.enrolledCourses.find((c) => c.id === found.id)
        if (!enrolled && !state.user) {
          navigate("/login")
          return
        }
        if (enrolled) {
          setCompletedLessons(enrolled.completedLessons || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id, state.enrolledCourses, state.user, navigate])

  if (loading) return <PageLoader />
  if (!product) return <ErrorState title="Course not found" message="This course doesn't exist or you don't have access" />

  const sections = [
    {
      title: "Introduction & Setup",
      lessons: [
        { title: "Welcome to the Course", duration: "5:30", type: "video" },
        { title: "Course Overview", duration: "8:15", type: "video" },
        { title: "Setting Up Your Environment", duration: "12:00", type: "video" },
        { title: "Installing Required Tools", duration: "10:45", type: "video" },
        { title: "Your First Project", duration: "7:20", type: "video" },
      ],
    },
    {
      title: "Core Fundamentals",
      lessons: [
        { title: "Understanding the Basics", duration: "15:30", type: "video" },
        { title: "Key Concepts Explained", duration: "18:45", type: "video" },
        { title: "Hands-on Practice", duration: "22:00", type: "video" },
        { title: "Common Patterns", duration: "14:20", type: "video" },
        { title: "Quiz: Test Your Knowledge", duration: "10:00", type: "quiz" },
      ],
    },
    {
      title: "Building Projects",
      lessons: [
        { title: "Project Setup", duration: "8:30", type: "video" },
        { title: "Building the Foundation", duration: "25:00", type: "video" },
        { title: "Adding Features", duration: "30:15", type: "video" },
        { title: "Testing & Debugging", duration: "20:00", type: "video" },
      ],
    },
    {
      title: "Advanced Techniques",
      lessons: [
        { title: "Advanced Concepts", duration: "28:30", type: "video" },
        { title: "Best Practices", duration: "22:45", type: "video" },
        { title: "Performance Optimization", duration: "19:20", type: "video" },
      ],
    },
  ]

  const currentSectionData = sections[currentSection]
  const currentLessonData = currentSectionData?.lessons[currentLesson]

  const handleLessonComplete = () => {
    const lessonId = `${currentSection}-${currentLesson}`
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId]
      setCompletedLessons(newCompleted)
      dispatch({
        type: "UPDATE_ENROLLMENT_PROGRESS",
        payload: {
          courseId: product.id,
          progress: (newCompleted.length / sections.reduce((acc, s) => acc + s.lessons.length, 0)) * 100,
          completedLessons: newCompleted,
        },
      })
    }
  }

  const totalLessons = sections.reduce((acc, s) => acc + s.lessons.length, 0)
  const progress = (completedLessons.length / totalLessons) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button onClick={() => navigate(`/products/${id}`)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="mt-2 font-semibold text-gray-900 dark:text-white line-clamp-2">{product.title}</h2>
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          <div className="p-4">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-4">
                <button
                  onClick={() => setCurrentSection(sectionIndex)}
                  className={`w-full text-left p-2 rounded-lg font-medium transition-colors ${
                    currentSection === sectionIndex
                      ? "bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {section.title}
                </button>
                {currentSection === sectionIndex && (
                  <div className="mt-2 space-y-1">
                    {section.lessons.map((lesson, lessonIndex) => {
                      const lessonId = `${sectionIndex}-${lessonIndex}`
                      const isCompleted = completedLessons.includes(lessonId)
                      const isActive = currentLesson === lessonIndex

                      return (
                        <button
                          key={lessonIndex}
                          onClick={() => setCurrentLesson(lessonIndex)}
                          className={`w-full text-left p-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                            isActive
                              ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                          )}
                          <span className="flex-1">{lesson.title}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{lesson.duration}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-black flex items-center justify-center">
            <div className="text-center text-white">
              <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <p className="text-lg">Video Player</p>
              <p className="text-sm text-gray-400 mt-2">{currentLessonData?.title}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{currentLessonData?.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {currentSectionData?.title} • Lesson {currentLesson + 1} of {currentSectionData?.lessons.length}
                  </p>
                </div>
                <Button onClick={handleLessonComplete} disabled={completedLessons.includes(`${currentSection}-${currentLesson}`)}>
                  {completedLessons.includes(`${currentSection}-${currentLesson}`) ? "Completed" : "Mark as Complete"}
                </Button>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (currentLesson > 0) {
                      setCurrentLesson(currentLesson - 1)
                    } else if (currentSection > 0) {
                      setCurrentSection(currentSection - 1)
                      setCurrentLesson(sections[currentSection - 1].lessons.length - 1)
                    }
                  }}
                  disabled={currentSection === 0 && currentLesson === 0}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (currentLesson < currentSectionData.lessons.length - 1) {
                      setCurrentLesson(currentLesson + 1)
                    } else if (currentSection < sections.length - 1) {
                      setCurrentSection(currentSection + 1)
                      setCurrentLesson(0)
                    }
                  }}
                  disabled={currentSection === sections.length - 1 && currentLesson === currentSectionData.lessons.length - 1}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

