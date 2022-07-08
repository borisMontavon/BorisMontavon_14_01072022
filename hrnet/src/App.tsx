import { Route, Routes } from 'react-router-dom';
import "./css/compiled/compiled.css";
import { EmployeesPage } from './pages/employeesPage';
import { HomePage } from './pages/homePage';

function App() {
  return (
    <div className="h-screen bg-neutral-800">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Routes>
    </div>
  );
}

export default App;
