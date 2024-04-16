import React, { useState } from 'react';
import { HiPlusCircle, HiMinusCircle } from 'react-icons/hi';
import { MenuData } from "../../Data/menu-data";
import { FaPencil } from 'react-icons/fa6';
import { store, usecartStore } from '../store';
import { useSnapshot } from 'valtio';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { toast } from "react-hot-toast";

const CartList = () => {
  const { time ,panier} = useSnapshot(store);
  const {  addToCart, deleteFromcart, increaseCartItem, decreaseCartItem, resetCart } = usecartStore();
  // État local pour la quantité de chaque article
  const [quantities, setQuantities] = useState(panier.map((item: any) => item.quantity));

  const handleRemoveFromCart = (id: string) => {
    deleteFromcart(id);
    toast.success("Article supprimé du panier", { duration: 1000 });}

    return (
      <div>
        <div className="w-82 flex items-center justify-center bg-black text-lg px-4 py-1 text-white border border-green-500 space-x-2 rounded-full hover:text-green-700 hover:bg-black-200">
          Commande en Livraison à :{time} <HiMiniPencilSquare />
        </div>

        <div className="">
          {panier.map((item:any) => (
            <div className="flex justify-between items-center mt-3" key={item.id}>
              <div className="flex space-x-3 border rounded-full px-2">
                {/* Bouton pour diminuer la quantité */}
                <button onClick={() => decreaseCartItem(panier, item.id)} disabled={item.quantity === 1? true : false}>
                  <HiMinusCircle />
                </button>

                <p> {item.quantity}</p>

                {/* Bouton pour augmenter la quantité */}
                <button onClick={() => increaseCartItem(panier, item.id)}>
                  <HiPlusCircle />
                </button>
              </div>

              <div className="px-3">
                <p>
                  {" "}
                  <span className="text-sm">{item.shortDescr}: </span>{" "}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p>{item.price} </p>
                <FaPencil className="cursor-pointer text-green-700"
                  onClick={() => { handleRemoveFromCart(item.id) }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  
};
export default CartList;
