"use client"
import React, { useState } from 'react';
import { HiBars3, HiOutlineShoppingCart } from "react-icons/hi2";
import Link from 'next/link';
import Location from '../Maps/Location';
import DropDownMenu from './DropDownMenu';
import dynamic from 'next/dynamic';
import { setIsDropdownOpen, store } from '../store';
import { useSnapshot } from 'valtio';


const Header = ({ number }: any) => {
    const { isDropdownOpen } = useSnapshot(store)
    console.log("ttt", localStorage.getItem("totalArticles"));

    const [totalArticles, setTotalArticles] = React.useState(localStorage.getItem("totalArticles"));
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const DropDownMenuDynamic = dynamic(() => import('./DropDownMenu'), { ssr: false });


    function setIsOpenModal(flase: any): void {
        throw new Error('Function not implemented.');
    }

    React.useEffect(() => {
        let totalArticle: any = localStorage.getItem("totalArticles");
        setTotalArticles(totalArticle)
    }, [number])
    return (
        <header className="grid grid-cols-2 py-5 px-4 md:px-12 items-center sticky top-0 z-10 bg-white">
            {/* Left Area */}
            <div className="flex items-center gap-x-8">
                <button>
                    <div className="px-4 sm:px-6 lg:px-8 mt-2">
                        <div className=" py-4">
                            <h2 className="text-lg leading-6 my-4 font-medium text-gray-900">
                                <Location />
                            </h2>
                        </div>
                    </div>
                </button>
            </div>
            {/* Right Area */}
            <div className="hidden md:flex items-center justify-end space-x-4">
                {!isDropdownOpen && <Link href="/cart" className="relative p-2 bg-slate-200 rounded-full text-gray-500 hover:bg-green-200 hover:text-green-600">
                    <div className="pr-1">
                        <HiOutlineShoppingCart size={28} />
                        <span className="absolute top-0 right-1 font-bold text-green-600">{totalArticles !== null ? totalArticles : 0}</span>

                    </div>
                </Link>}

                <div className="flex items-center gap-x-8 relative">

                    {!isDropdownOpen && <div className="cursor-pointer shrink-0" onClick={toggleDropdown}>
                        <HiBars3 size={28} />
                    </div>}
                    {isDropdownOpen && <DropDownMenuDynamic />}

                </div>
            </div>
        </header>
    );
};



export default Header;
