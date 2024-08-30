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

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const formatAmount = (value) => {
    const num = value.replace(/[^\d]/g, '');
    if (!num) return '';
    if (num.length < 4) return num;

    const lastThree = num.slice(-3);
    const otherParts = num.slice(0, -3);

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
    setIsSubmitting(true);
    setError('');

    try {
      const amount = formData.amount.replace(/,/g, '');

      // Send data to Vendor collection
      const vendorResponse = await axios.post('http://localhost:3000/api/vendors', {
        vendorName: formData.vendorName,
        vendorEmail: formData.vendorEmail,
        paymentMethod: formData.paymentMethod,
        amount,
        itemName: formData.itemName,
        quantity: formData.quantity,
        dateOfPurchase: formData.dateOfPurchase
      });

      console.log('Vendor data submitted:', vendorResponse.data);

      // Send data to ItemPurchase collection
      const itemPurchaseData = {
        itemName: formData.itemName,
        quantity: formData.quantity,
        vendorName: formData.vendorName,
        vendorEmail: formData.vendorEmail,
        paymentMethod: formData.paymentMethod,
        amount,
        dateOfPurchase: formData.dateOfPurchase
      };
      const itemPurchaseResponse = await axios.post('http://localhost:3000/api/itempurchases', itemPurchaseData);

      console.log('ItemPurchase data submitted:', itemPurchaseResponse.data);

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
      setError('Error submitting data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="purchase-container">
      <h2 className="purchase-heading">New Purchase</h2>
      {error && <p className="error-message">{error}</p>}
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
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Purchase;
