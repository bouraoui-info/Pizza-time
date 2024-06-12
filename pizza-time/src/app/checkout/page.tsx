"use client"
import React from 'react';
import { useSnapshot } from 'valtio';
import { store, setpanier } from '../store';
import { useRouter } from 'next/navigation';
const CheckoutPage: React.FC = () => {
    const { panier } = useSnapshot(store);
    const router = useRouter();
    const handleclose = () => {
        setpanier([])
        router.push('/')
    }
    const calculateTotalPrice = () => {
        return panier.reduce((total: number, item: any) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <ul>
                    {panier.map((item: any, index: number) => (
                        <li key={index} className="mb-2 flex justify-between">
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between mt-4">
                    <p className="text-xl font-semibold">Total:</p>
                    <p className="text-xl font-semibold">${calculateTotalPrice()}</p>
                </div>
            </div>
            <button
                className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600'
                onClick={handleclose}
            >
                Close
            </button>
        </div>
    );
};

export default CheckoutPage;
