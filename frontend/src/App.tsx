import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import CurriculumPage from "./pages/CurriculumPage/CurriculumPage/CurriculumPage";
import CreateProjectionPage from "./pages/CreateProjectionPage/CreateProjectionPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/malla/:rut/:codigo/:catalogo"
          element={<CurriculumPage />}
        />
        <Route path="/malla/crear_proyeccion/:rut/:codigo" element={<CreateProjectionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
