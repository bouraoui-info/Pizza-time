import React from 'react';

import { HiOutlineChevronLeft } from 'react-icons/hi'; // Assuming you've imported the HiOutlineChevronLeft icon
import Link from "next/link";

const CartTopSection = () => {
  return (
    <div>
      
      <div className="mb-8">
        <Link
          href={"/boutiques/PizzaTimeGuyangourt"}
          className="flex items-center justify-center bg-green-600 text-lg px-4 py-1 text-white border border-green-500 space-x-2 rounded-full hover:text-green-700 hover:bg-green-200"
        >
          <HiOutlineChevronLeft /> <span>Mon Panier</span>{" "}
        </Link>
      </div>
    </div>
  );
};

export default CartTopSection;
