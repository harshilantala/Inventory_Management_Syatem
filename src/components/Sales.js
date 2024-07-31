import React, { useState } from 'react';
import '../css/sales.css';

const Sales = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    itemName: '',
    quantity: '',
    date: '',
    amount: '',
    paymentMethod: 'cash'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAmountChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatAmount(value);
    setFormData({
      ...formData,
      amount: formattedValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
  };

  return (
    <div className="sales-container">
      <h2 className="sales-heading">New Sale</h2>
      <form className="sales-form" onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input 
            type="text" 
            name="customerName" 
            value={formData.customerName} 
            onChange={handleChange} 
            required
          />
        </label>
        <label>
          Customer Email:
          <input 
            type="email" 
            name="customerEmail" 
            value={formData.customerEmail} 
            onChange={handleChange} 
            required
          />
        </label>
        <label>
          Payment Method:
          <select 
            name="paymentMethod" 
            value={formData.paymentMethod} 
            onChange={handleChange}
          >
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
        </label>
        <label>
          Item Name:
          <input 
            type="text" 
            name="itemName" 
            value={formData.itemName} 
            onChange={handleChange} 
            required
          />
        </label>
        <label>
          Quantity:
          <input 
            type="number" 
            name="quantity" 
            value={formData.quantity} 
            onChange={handleChange} 
            required
          />
        </label>
        <label>
          Amount:
          <input 
            type="text" 
            name="amount" 
            value={formData.amount} 
            onChange={handleAmountChange} 
            required
          />
        </label>
        <label>
          Date:
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required
          />
        </label>
        
        
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

const formatAmount = (value) => {
  // Remove any non-numeric characters
  const num = value.replace(/[^\d]/g, '');

  // Handle empty input
  if (!num) return '';

  // If the number is less than 1000, return it as is
  if (num.length < 4) return num;

  // Split the number into parts
  const lastThree = num.slice(-3);
  const otherParts = num.slice(0, -3);
  
  // Add commas for lakhs and crores
  const formattedNumber = otherParts
    .replace(/\B(?=(\d{2})+(?!\d))/g, ",")
    .concat("," + lastThree);

  return formattedNumber;
};

export default Sales;
