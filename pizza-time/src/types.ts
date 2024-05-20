import { type } from "os";

export type Menu = {
    prepType: any;
    id: string;
    title: string;
    shortDescr: string;
    lengDescr: string;
    price: number;
    imageUrl: { Default: { urlDefault: string } } ;
    category: string;
    quantity:number

};
type CartOptions = {
    quantity: number;
    instrictions: string;
    prepare: string;
};
export type CartItemType = CartOptions & Menu;

export type CartType = {
    panier: CartItemType[];
};
export type CartAction = {
    addToCart: (item: CartItemType) => void;
    deleteFromcart: (id: string) => void;
    increaseCartItem: (menu: CartItemType[], id: string) => void;
    decreaseCartItem: (menu: CartItemType[], id: string) => void;
    resetCart: () => void;
};

export type CustomCategory = {
    desc: string;
    id: string;
    category: string;
    imageSrc: string;
};