"use client"
import { HiOutlineShoppingCart, HiBars3 } from "react-icons/hi2";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { setIsDropdownOpen, store } from '../store';
import { useSnapshot } from 'valtio';
import React from "react";
import { UserLocationProvider } from "../hooks/useLocation";

const useUser = () => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        // Mock login check, replace with actual logic
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    return { user };
};

const Header = ({ number }: any) => {
    const { isDropdownOpen } = useSnapshot(store);
    const { user } = useUser();
    const [totalArticles, setTotalArticles] = React.useState(() => {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem("totalArticles");
        } else {
            return null; 
        }
    });

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const DropDownMenuDynamic = dynamic(() => import('./DropDownMenu'), { ssr: false });

    React.useEffect(() => {
        let totalArticle: any = localStorage.getItem("totalArticles");
        setTotalArticles(totalArticle);
    }, [number]);

    return (
        <header className="flex justify-between py-5 px-4 md:px-12 items-center sticky top-0 z-10 bg-white shadow-md">
            {/* Left Area */}
            <div className="flex items-center gap-x-4">
                <div className="flex items-center px-4 sm:px-6 lg:px-8 mt-2">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                        <UserLocationProvider />
                    </h2>
                </div>
            </div>
            {/* Right Area */}
            <div className="flex items-center space-x-4">
                <Link href="/cart" className="relative p-2 bg-slate-200 rounded-full text-gray-500 hover:bg-green-200 hover:text-green-600">
                    <HiOutlineShoppingCart size={28} />
                    <span className="absolute top-0 right-1 text-sm font-bold text-green-600 bg-white rounded-full w-5 h-5 flex items-center justify-center">{totalArticles !== null ? totalArticles : 0}</span>
                </Link>

                <div className="relative">
                    {!isDropdownOpen && !user && (
                        <div className="cursor-pointer shrink-0" onClick={toggleDropdown}>
                            <HiBars3 size={28} className="text-gray-500 hover:text-green-600" />
                        </div>
                    )}
                    {user && (
                        <img src={user.image} alt="User Image" className="w-8 h-8 rounded-full cursor-pointer hover:text-green-600" onClick={toggleDropdown} />
                    )}
                    {isDropdownOpen && <DropDownMenuDynamic />}
                </div>
            </div>
        </header>
    );
};

export default Header;
