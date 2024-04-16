import React from 'react';
import Link from 'next/link';
import { card } from "../../constats";
const Boutiques = () => {

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const isBoutiqueOpen = (openingTime:any, closingTime:any) => {
    const currentTime = getCurrentTime();
    return currentTime >= openingTime && currentTime <= closingTime;
  };

  return (
    <div className='max-w-2xl mx-auto my-5'>
      <h2 className='text-3xl font-semibold text-center text-gray-600 sm:text-4xl'>Nos Boutiques</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6 mt-8">
        {Object.values(card.shoplist).map((shoplist:any) => {
          const isOpen = isBoutiqueOpen(shoplist.openingTime, shoplist.closingTime);
          return (
            <Link href={`/boutiques/${shoplist.shopid}`} key={shoplist.id}>
              <div className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer ${isOpen ? 'border-green-500' : 'border-red-500'}`}>
                <img src={shoplist.image} alt={shoplist.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{shoplist.Address}</h3>
                  <p className="text-gray-600">Company: {shoplist.Company}</p>
                  <p className="text-gray-600">Country: {shoplist.Country}</p>
                  <p className="text-gray-600">PostalCode: {shoplist.PostalCode}</p>
                  <p className={`text-${isOpen ? 'green-600' : 'red-600'}`}>
                    {isOpen ? 'Open' : 'Closed'}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Boutiques;
