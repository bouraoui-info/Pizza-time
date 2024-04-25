// CompanyPage.js
"use client"
import React from 'react';
import MenuModal from '../Home/MenuModal';
import { MenuData } from '@/Data/menu-data';
import Header from '@/app/common/Header';
import SideBar from '@/app/common/SideBar';
import Logobanner from '@/app/Home/LogoBanner';
import Icons from '@/app/icons/Icons';

import { card } from '@/constats';
import Footer from '../common/Footer';

interface Company {
    shopid: string;
    openingTime: string;
    closingTime: string;
    Address: string;
    PostalCode: string;
    town: string;
}

interface Props {
    companyIndextoshow: number;
}

const CompanyPage = ({ companyIndextoshow }: Props) => {
    if (companyIndextoshow < 0 || companyIndextoshow >= Object.values(card.shoplist).length) {
        return <p>Index d'entreprise non valide</p>;
    }

    const companyToShow = Object.values(card.shoplist)[companyIndextoshow] as Company;
    const [number, setNumber] = React.useState(0);
    return (
        <div>

            <Header number={number} />
            <SideBar />
            <Logobanner />

            <div className="border z-50 -mt-[335px] ml-[350px] rounded w-[20%] top-1 text-white bg-black bg-opacity-50 p-10 flex items-center">
                <div>
                    <p className="ml-2">{`${companyToShow.shopid.replace(/\s/g, "")}`}</p>
                    <p className="ml-2">ouvert de {companyToShow.openingTime} à {companyToShow.closingTime}</p>
                    <p className="ml-2">
                        {companyToShow.Address},{companyToShow.PostalCode} {companyToShow.town}
                    </p>
                    <a href="" className="ml-2">Informations utiles</a>
                    <Icons />
                </div>
            </div>
            <section className="my-16">
                <div className='max-w-2xl mx-auto my-5 text-center'>
                    <h2 className="text-3xl leading-tight tracking-tighter text-gray-600 sm:text-4xl">Catégories :</h2>
                </div>
                <div className="flex flex-row items-center md:justify-center justify-between mt-12 md:gap-12 overflow-x-auto">
                    {MenuData.map((menu) => (
                        <div className="flex flex-col rounded-full h-16  items-center justify-center p-3 cursor-pointer overflow-hidden hover:bg-slate-200"
                            key={menu.id}>
                            <img src={menu.image} width={60} height={60} alt='catégories' />
                            <div className="whitespace-nowrap text-sm">
                                <h3 className="text-center">{menu.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="mb-24">
                <div className="max-w-2x1 max-auto my-5 text-center">
                    <h2 className="text-3xl leading-tight tracking-tight text-gray-600 sm:text-4xl">
                        Menu
                    </h2>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {MenuData.map((menu: any, index) => (
                        <MenuModal key={index} menu={menu} setNumber={setNumber} number={number} />
                    ))}

                </div>

            </section>
            <Footer />
        </div>

    );
}


export default CompanyPage;
