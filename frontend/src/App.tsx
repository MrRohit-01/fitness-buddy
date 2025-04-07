import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthPage from "@/pages/auth/AuthPage"
import SocialPage from "@/pages/social/SocialPage"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/social"
          element={
            <ProtectedRoute>
              <SocialPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}
