// PaymentSuccess.js
import React from 'react';
import './App.css';

const PaymentSuccess = () => {
  return (
    <div className="success-container">
      <h3 className="title">Payment Successful!</h3>
      <p className="success-text">
        Thank you for your purchase. Your payment has been processed successfully.
      </p>
      <p className="success-text">You will receive a confirmation email shortly.</p>
    </div>
  );
};

export default PaymentSuccess;
