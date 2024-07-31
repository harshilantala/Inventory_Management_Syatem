import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './components/Login';
// import Purchase from './components/Purchase'
import PurchasePage from './pages/PurchasePage';
import SalesPage from './pages/SalesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/sale" element={<SalesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
