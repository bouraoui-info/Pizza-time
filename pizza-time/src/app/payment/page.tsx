// pages/index.js
"use client"
import React from 'react';
import PayPalButton1 from './PaypalButton';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Secured Payment</h1>
        <PayPalButton1 />
      </div>
    </div>
  );
};

export default HomePage;
