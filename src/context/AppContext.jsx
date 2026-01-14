import { createContext, useContext, useReducer, useEffect } from "react"

const AppContext = createContext()

const initialState = {
  user: null,
  cart: [],
  wishlist: [],
  dashboardProducts: [],
  orders: [],
  enrolledCourses: [],
  reviews: [],
}

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    case "ADD_TO_CART":
      const existsInCart = state.cart.find((item) => item.id === action.payload.id)
      if (existsInCart) return state
      return { ...state, cart: [...state.cart, action.payload] }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) }
    case "CLEAR_CART":
      return { ...state, cart: [] }
    case "ADD_TO_WISHLIST":
      const existsInWishlist = state.wishlist.find((item) => item.id === action.payload.id)
      if (existsInWishlist) return state
      return { ...state, wishlist: [...state.wishlist, action.payload] }
    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter((item) => item.id !== action.payload) }
    case "SET_DASHBOARD_PRODUCTS":
      return { ...state, dashboardProducts: action.payload }
    case "ADD_DASHBOARD_PRODUCT":
      return { ...state, dashboardProducts: [...state.dashboardProducts, action.payload] }
    case "UPDATE_DASHBOARD_PRODUCT":
      return {
        ...state,
        dashboardProducts: state.dashboardProducts.map((p) => (p.id === action.payload.id ? action.payload : p)),
      }
    case "DELETE_DASHBOARD_PRODUCT":
      return {
        ...state,
        dashboardProducts: state.dashboardProducts.filter((p) => p.id !== action.payload),
      }
    case "LOAD_STATE":
      return { ...state, ...action.payload }
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload], enrolledCourses: [...state.enrolledCourses, ...action.payload.items] }
    case "ADD_REVIEW":
      return { ...state, reviews: [...state.reviews, action.payload] }
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } }
    case "UPDATE_ENROLLMENT_PROGRESS":
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.map((course) =>
          course.id === action.payload.courseId
            ? { ...course, progress: action.payload.progress, completedLessons: action.payload.completedLessons }
            : course
        ),
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const saved = localStorage.getItem("appState")
    if (saved) {
      dispatch({ type: "LOAD_STATE", payload: JSON.parse(saved) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state))
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
