import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import PurchasePage from './pages/PurchasePage';
import SalesPage from './pages/SalesPage';
import OrderHistory from './components/OrderHistory';
// Import the BillPage component
import BillPage from './components/Billgenerate'; // Ensure the path is correct

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/sale" element={<SalesPage />} />
        <Route path="/history" element={<OrderHistory />} />
        {/* Add BillPage Route for generating bills */}
        <Route path="/bill/:id" element={<BillPage />} />
      </Routes>
    </Router>
  );
}

export default App;
