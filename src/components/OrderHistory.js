import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/OrderHistory.css'; // Ensure this path is correct

const OrderHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [showPurchases, setShowPurchases] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchaseResponse = await axios.get('http://localhost:3000/api/itempurchases');
        const salesResponse = await axios.get('http://localhost:3000/api/sales');

        setPurchases(purchaseResponse.data);
        setSales(salesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filteredPurchases = purchases;
      let filteredSales = sales;

      if (startDate && endDate) {
        filteredPurchases = filteredPurchases.filter(purchase => {
          const purchaseDate = new Date(purchase.dateOfPurchase);
          return purchaseDate >= startDate && purchaseDate <= endDate;
        });
        filteredSales = filteredSales.filter(sale => {
          const saleDate = new Date(sale.Date);
          return saleDate >= startDate && saleDate <= endDate;
        });
      }

      if (searchTerm) {
        filteredPurchases = filteredPurchases.filter(purchase =>
          purchase.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          purchase.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        filteredSales = filteredSales.filter(sale =>
          sale.Customer_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.Item_Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredPurchases(filteredPurchases);
      setFilteredSales(filteredSales);
    };

    filterData();
  }, [startDate, endDate, searchTerm, purchases, sales]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Order History</h2>

      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search..."
          className="form-control search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4 text-center">
        <h5 className="text-info">Filter by Date Range</h5>
        <div className="date-picker-container">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="form-control"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="form-control"
          />
        </div>
      </div>

      <div className="text-center mb-4">
        <button
          className={`btn ${showPurchases ? 'btn-primary' : 'btn-secondary'} mr-2`}
          onClick={() => setShowPurchases(true)}
        >
          Show Purchase History
        </button>
        <button
          className={`btn ${!showPurchases ? 'btn-primary' : 'btn-secondary'} mx-3` }
          onClick={() => setShowPurchases(false)}
        >
          Show Sales History
        </button>
      </div>

      {/* Purchase History Section */}
      {showPurchases && (
        <div className="history-section">
          <h3 className="text-primary">Purchase History</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vendor Name</th>
                <th>Email</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.length > 0 ? (
                filteredPurchases.map((purchase, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{purchase.vendorName}</td>
                    <td>{purchase.vendorEmail}</td>
                    <td>{purchase.itemName}</td>
                    <td>{purchase.quantity}</td>
                    <td>${purchase.amount.toFixed(2)}</td>
                    <td>{new Date(purchase.dateOfPurchase).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No purchase records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Sales History Section */}
      {!showPurchases && (
        <div className="history-section">
          <h3 className="text-success">Sales History</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.length > 0 ? (
                filteredSales.map((sale, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{sale.Customer_Name}</td>
                    <td>{sale.Customer_Email}</td>
                    <td>{sale.Item_Name}</td>
                    <td>{sale.Quantity}</td>
                    <td>${sale.Amount.toFixed(2)}</td>
                    <td>{new Date(sale.Date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No sales records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
