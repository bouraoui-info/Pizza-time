"use client"
import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

const PayPalButton1 = () => {
  const amount= localStorage.getItem("amount")
  
  return (
    <div>
    <PayPalButton
      options={{
        clientId: "AQmsY7G0TT1mlPANlwagHXDJUm8kFLLj9hSu9YJhpUWnh53AB79nr0rO7aHSIFn-WbdCkXNkRVrfc9rW",
        currency: "USD",
      }}
      amount={Number(amount)}
      onSuccess={(details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name);
      }}
    />
  </div>

  );
};

export default PayPalButton1;
