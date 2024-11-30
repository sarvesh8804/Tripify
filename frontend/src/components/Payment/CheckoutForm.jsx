// CheckoutForm.js
import React, { useState } from 'react';
import './App.css';
import PaymentSuccess from './PaymentSuccess';

const CheckoutForm = () => {
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPaymentSuccessful(true);
  };

  return (
    <div className="container">
      {isPaymentSuccessful ? (
        <PaymentSuccess />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <h3 className="title">billing address</h3>
              <div className="inputBox">
                <span>full name :</span>
                <input type="text" placeholder="deep chavan" />
              </div>
              <div className="inputBox">
                <span>email :</span>
                <input type="email" placeholder="example@example.com" />
              </div>
              <div className="inputBox">
                <span>address :</span>
                <input type="text" placeholder="room - street - locality" />
              </div>
              <div className="inputBox">
                <span>city :</span>
                <input type="text" placeholder="mumbai" />
              </div>
              <div className="flex">
                <div className="inputBox">
                  <span>state :</span>
                  <input type="text" placeholder="india" />
                </div>
                <div className="inputBox">
                  <span>zip code :</span>
                  <input type="text" placeholder="123 456" />
                </div>
              </div>
            </div>
            <div className="col">
              <h3 className="title">payment</h3>
              <div className="inputBox">
                <span>cards accepted :</span>
                <img src="./card_img.png" alt="Accepted Cards" />
              </div>
              <div className="inputBox">
                <span>name on card :</span>
                <input type="text" placeholder="mr. deep chavan" />
              </div>
              <div className="inputBox">
                <span>credit card number :</span>
                <input type="number" placeholder="1111-2222-3333-4444" />
              </div>
              <div className="inputBox">
                <span>exp month :</span>
                <input type="text" placeholder="january" />
              </div>
              <div className="flex">
                <div className="inputBox">
                  <span>exp year :</span>
                  <input type="number" placeholder="2024" />
                </div>
                <div className="inputBox">
                  <span>CVV :</span>
                  <input type="text" placeholder="1234" />
                </div>
              </div>
            </div>
          </div>
          <input type="submit" value="proceed to checkout" className="submit-btn" />
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
