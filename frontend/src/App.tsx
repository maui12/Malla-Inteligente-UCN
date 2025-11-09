import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import CurriculumPage from "./pages/CurriculumPage/CurriculumPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/malla/:rut/:codigo/:catalogo"
          element={<CurriculumPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
