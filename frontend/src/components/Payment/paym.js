import React, { useState } from 'react';

const FakePaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv && billingAddress) {
      // Simulate a successful payment
      setMessage('Payment Successful!');
    } else {
      // Simulate a failed payment
      setMessage('Payment Failed. Please check your details.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Fake Payment Gateway</h2>
      <form style={styles.form}>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Billing Address"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          style={styles.input}
        />
        <button type="button" onClick={handlePayment} style={styles.button}>
          Pay Now
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    maxWidth: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    fontWeight: 'bold',
  },
};

export default FakePaymentGateway;
