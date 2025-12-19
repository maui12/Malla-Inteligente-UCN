import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login/Login';
import MallaPage from './pages/CurriculumPage/CurriculumPage/CurriculumPage'; 
import CreateProjectionPage from './pages/CreateProjectionPage/CreateProjectionPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import SavedProjectionsPage from './pages/SavedProjectionsPage/SavedProjectionsPage';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route
            path="/malla/:careerCode/:catalogYear"
            element={
              <ProtectedRoute>
                <MallaPage />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/proyeccion/:careerCode/:catalogYear" 
            element={
              <ProtectedRoute>
                <CreateProjectionPage />
              </ProtectedRoute>
              } 
            />
          
          <Route 
            path="/proyecciones-guardadas" 
            element={
              <ProtectedRoute>
                <SavedProjectionsPage />
              </ProtectedRoute>} 
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