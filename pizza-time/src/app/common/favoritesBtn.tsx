import React from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const FavoritesBtn = () => {
  return (
    <div className='relative hover:opacity-80 transition'>
      <span className="text-green-700 -top-[20px] cursor-pointer">
        <AiOutlineHeart size={40} />
      </span>
    </div>
  );
};

export default FavoritesBtn;
