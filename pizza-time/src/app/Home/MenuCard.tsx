import React from 'react'
import Image from 'next/image';
import { Menu } from '../../types';
import FavoritesBtn from '../common/favoritesBtn';
type Props = {
  menu: Menu
  openModal: () => void
};

const MenuCard = ({ menu, openModal }: Props) => {
  console.log({menu});
  
  return (
    <div
      className="flex flex-col rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200 ease-out cursor-pointer "
      onClick={openModal}
    >
        <img
                                    src={menu.imageUrl.Default.urlDefault}
                                    alt="Preview"
                                    width={360} height={200}
                                />
      {/* <Image src={menu.imageUrl.Default.urlDefault} width={360} height={200} alt="menu-img" className="h-56 w-full object-scale-down rounded-t-lg" /> */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-center">
          <h2>{menu.title}</h2>
          <span className="text-green-600 font-semibold">${menu.price}</span>
        </div>
        <div className="absolute -top-[10px] -left-[15px] w-12 h-22 rounded-full bg-white">
          <FavoritesBtn />
        </div>
      </div>
    </div>
  );
};
export default MenuCard;