import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login/Login';
import CurriculumPage from './pages/CurriculumPage/CurriculumPage/CurriculumPage'; 
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route
            path="/malla/:userId/:careerCode/:catalogYear"
            element={
              <ProtectedRoute>
                <CurriculumPage />
              </ProtectedRoute>
            }
          />
          
          {/* Ruta para admins */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;