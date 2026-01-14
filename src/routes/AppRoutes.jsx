import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Products from "../pages/Products"
import ProductDetails from "../pages/ProductDetails"
import Blog from "../pages/Blog"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Instructors from "../pages/Instructors"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import Checkout from "../pages/Checkout"
import Orders from "../pages/Orders"
import CoursePlayer from "../pages/CoursePlayer"
import FAQ from "../pages/FAQ"
import NotFound from "../pages/NotFound"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/instructors" element={<Instructors />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/learn/:id" element={<CoursePlayer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
