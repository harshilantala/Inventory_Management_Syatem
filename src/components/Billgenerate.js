import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../css/BillPage.css';

const BillPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [purchaseData, setPurchaseData] = useState(null);
  const [salesData, setSalesData] = useState(null);

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
    if (selectedItem) {
      const foundPurchase = purchases.find(purchase => purchase.itemName === selectedItem);
      const foundSales = sales.find(sale => sale.Item_Name === selectedItem);
      setPurchaseData(foundPurchase || null);
      setSalesData(foundSales || null);
    }
  }, [selectedItem, purchases, sales]);

  const calculateUnitProfit = (purchaseData, salesData) => {
    if (!purchaseData || !salesData) return 0;

    const unitPurchaseCost = purchaseData.amount / purchaseData.quantity;
    const unitSellingPrice = salesData.Amount / salesData.Quantity;
    return unitSellingPrice - unitPurchaseCost;
  };

  const calculateTotalProfit = (unitProfit, salesQuantity) => (unitProfit * salesQuantity).toFixed(2);

  const generatePDF = () => {
    if (!purchaseData && !salesData) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont('Helvetica', 'bold');
    doc.text('INVOICE', 20, 10);

    // Company Info
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.text('Your Company Name', 20, 20);
    doc.text('Address Line 1', 20, 25);
    doc.text('Address Line 2', 20, 30);
    doc.text('Phone: (123) 456-7890', 20, 35);
    doc.text('Email: contact@company.com', 20, 40);
    doc.text('Date: ' + new Date().toLocaleDateString(), 20, 45);

    // Bill Details
    doc.setFontSize(14);
    doc.setFont('Helvetica', 'bold');
    doc.text('Bill Details', 20, 60);

    const tableColumn = [
      'Type',
      'Item Name',
      'Quantity',
      'Amount',
      'Profit'
    ];
    const tableRows = [];

    if (purchaseData) {
      tableRows.push([
        'Purchase',
        purchaseData.itemName,
        `${purchaseData.quantity}`, // Show quantity as-is
        'N/A', // No amount field in Purchase
        'N/A'
      ]);
    }

    if (salesData) {
      const unitProfit = calculateUnitProfit(purchaseData, salesData);
      const totalProfit = calculateTotalProfit(unitProfit, salesData.Quantity);
      tableRows.push([
        'Sales',
        salesData.Item_Name,
        salesData.Quantity,
        `$${salesData.Amount.toFixed(2)}`,
        `$${totalProfit}`
      ]);
    }

    doc.autoTable(tableColumn, tableRows, { startY: 70, theme: 'striped' });

    // Footer
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'italic');
    doc.text('Thank you for your business!', 20, doc.autoTable.previous.finalY + 10);

    doc.save('bill.pdf');
  };

  return (
    <div className="bill-page container my-5">
      <h2 className="text-center mb-4">Generate Bill</h2>

      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Enter Item Name"
          className="form-control mb-2"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        />
      </div>

      {purchaseData && (
        <div className="bill-details mb-4 text-center">
          <h4>Purchase Details</h4>
          <p><strong>Purchase Quantity:</strong> {purchaseData.quantity}</p> {/* Show quantity as-is */}
        </div>
      )}

      {salesData && (
        <div className="bill-details mb-4 text-center">
          <h4>Sales Details</h4>
          <p><strong>Sales Quantity:</strong> {salesData.Quantity}</p>
          <p><strong>Sales Price:</strong> ${salesData.Amount.toFixed(2)}</p>
          <p><strong>Profit:</strong> ${purchaseData ? calculateTotalProfit(calculateUnitProfit(purchaseData, salesData), salesData.Quantity) : 0}</p>
        </div>
      )}

      <div className="text-center">
        <button className="btn btn-primary" onClick={generatePDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default BillPage;
