import React, { useState } from 'react';
import axios from 'axios';
import '../css/purchase.css';

const Purchase = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorEmail: '',
    paymentMethod: 'cash',
    amount: '',
    itemName: '',
    quantity: '', 
    dateOfPurchase: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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

  const handleAmountChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatAmount(value);
    setFormData({
      ...formData,
      amount: formattedValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove commas from amount before sending to backend
      const amount = formData.amount.replace(/,/g, '');
      const response = await axios.post('http://localhost:3000/vendors', { ...formData, amount });
      console.log('Form data submitted:', response.data);
      // Reset the form fields
      setFormData({
        vendorName: '',
        vendorEmail: '',
        paymentMethod: 'cash',
        amount: '',
        itemName: '',
        quantity: '',
        dateOfPurchase: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="purchase-container">
      <h2 className="purchase-heading">New Purchase</h2>
      <form className="purchase-form" onSubmit={handleSubmit}>
        <label>
          Vendor Name:
          <input 
            type="text" 
            name="vendorName" 
            value={formData.vendorName} 
            onChange={handleChange} 
            autoComplete='off'
            required
          />
        </label>
        <label>
          Vendor Email:
          <input 
            type="email" 
            name="vendorEmail" 
            value={formData.vendorEmail} 
            onChange={handleChange} 
            autoComplete='off'
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
            autoComplete='off'
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
            autoComplete='off'
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
            autoComplete='off'
            required
          />
        </label>
        <label>
          Date of Purchase:
          <input 
            type="date" 
            name="dateOfPurchase" 
            value={formData.dateOfPurchase} 
            onChange={handleChange} 
            autoComplete='off'
            required
          />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Purchase;
