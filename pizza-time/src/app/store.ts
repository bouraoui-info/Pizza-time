import { proxy } from "valtio";
import { devtools, persist } from 'zustand/middleware';
import {create} from "zustand";
import { CartType,CartAction } from "../types";
type StoreType = {
    totalPrice: number;
    panier:any
    time: number;
    isDropdownOpen: boolean;
    id: number; 
    selectedResto:number
};

export const store = proxy<StoreType>({
    
    time: Date.now(),
    isDropdownOpen: false,
    totalPrice: 0,
    panier:[],
    id:0,
    selectedResto:0

});
export function setId(id: number): void {
    store.id = id;}

export function setTime(time: any): void {
    store.time = time;
}

export function setIsDropdownOpen(isDropdownOpen: boolean): void {
    store.isDropdownOpen = isDropdownOpen;
}


const INITIAL_STATE = {
    panier: [],
};
export function setpanier(
    panier:any
): void {
    store.panier = panier;
}
export function setSelectedResto(
    selectedResto:any
): void {
    store.selectedResto = selectedResto;
}
export const usecartStore = create<CartType & CartAction>()(
    devtools(
        persist(
            (set, get) => ({
                panier: INITIAL_STATE.panier,
                addToCart(item) {
                    const panier = get().panier;
                    setpanier([...panier, item]);
                },
                deleteFromcart(itemId: string) {
                    const panier = get().panier;
                    const updatedpanier = panier.filter((menu) => menu.id !== itemId);
                    setpanier(updatedpanier );
                },
                increaseCartItem(data, id) {
                    const newData = [...JSON.parse(JSON.stringify(data))];
                    console.log({newData});
                    
                    newData.forEach((item) => {
                        if (item.id === id) item.quantity =item.quantity+ 1;
                    });
                    setpanier(newData );
                },
                decreaseCartItem(data, id) {
                    const newData = [...JSON.parse(JSON.stringify(data))];
                    newData.forEach((item) => {
                        if (item.id === id) item.quantity =item.quantity- 1;
                    });
                    setpanier(newData );
                },
                resetCart() {
                    set(INITIAL_STATE);
                },
            }),
            { name: "CART", skipHydration: true },
        )
    )
);



