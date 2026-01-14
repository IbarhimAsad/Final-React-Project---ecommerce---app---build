import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { AppProvider } from "./context/AppContext"
import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
