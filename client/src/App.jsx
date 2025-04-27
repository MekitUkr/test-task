import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar, ProtectedRoute } from './components'
import { LoginPage, ProjectsPage, SignupPage } from './pages'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
