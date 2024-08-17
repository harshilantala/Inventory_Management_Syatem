import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import LoginForm from './components/Login';
// import Purchase from './components/Purchase'
import PurchasePage from './pages/PurchasePage';
import SalesPage from './pages/SalesPage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import RegistrationForm from './components/RegistrationForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<LoginForm />} /> */}
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/sale" element={<SalesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
