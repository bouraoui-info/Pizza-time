
import FooterMobile from "../common/FooterMobile";
import CartSummary from "../cart/CartSummary";
import CartTopSection from "../cart/CartTopSection";
import React from "react";

export const metadata = {
  title: "Cart",
  description: "...choose the best",
};
export default async function Cart() {
  
  return (
    <>
      <div className="flex flex-col items-center justify-center   py-8 px-6 mb-24">
        <div className="w-full  rounded-lg shadow-xl sm:max-w-md   p-6">
          <CartTopSection />
          <div className="flex flex-col space-y-4 border-t">
            <CartSummary />          </div>
        </div>
      </div>
      <FooterMobile />
    </>
  );
};
