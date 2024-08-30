import React, { useState } from 'react';
import axios from 'axios';
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
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate that quantity is not negative
    if (formData.quantity < 0) {
      setError('Quantity cannot be negative');
      setIsSubmitting(false);
      return;
    }

    try {
      const rawAmount = formData.amount.replace(/[^\d.-]/g, '');
      const dataToSend = {
        Customer_Name: formData.customerName,
        Customer_Email: formData.customerEmail,
        Payment_Method: formData.paymentMethod,
        Item_Name: formData.itemName,
        Quantity: formData.quantity,
        Amount: rawAmount,
        Date: formData.date
      };

      const response = await axios.post('http://localhost:3000/api/sales', dataToSend);
      console.log('Response from server:', response.data);

      // Reset form after successful submission
      setFormData({
        customerName: '',
        customerEmail: '',
        itemName: '',
        quantity: '',
        date: '',
        amount: '',
        paymentMethod: 'cash'
      });
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      setError('Error submitting data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sales-container">
      <h2 className="sales-heading">New Sale</h2>
      <form className="sales-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
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
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

const formatAmount = (value) => {
  const num = value.replace(/[^\d.-]/g, '');
  if (!num) return '';
  if (num.length < 4) return num;
  const lastThree = num.slice(-3);
  const otherParts = num.slice(0, -3);
  const formattedNumber = otherParts
    .replace(/\B(?=(\d{2})+(?!\d))/g, ",")
    .concat("," + lastThree);
  return formattedNumber;
};

export default Sales;
