import React from 'react';
import { HiStar } from 'react-icons/hi2';
import Image from 'next/image'; // Correct import statement

import logo from "../../../public/Objects/logo.jpg"; // Correct import statement
import { card } from '@/constats';
import Icons from '../icons/Icons';

import "../globals.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const Logobanner = () => {
  const bannerImg = "/Objects/banner.jpg";
  
  return (
    <div >
      {/* Banner Image */}
      
      {/* <div className="relative h-72 md:h-72 bg-no-repeat bg-cover w-full" style={{ backgroundImage: `url(${bannerImg})` }} /> */}
      <div className=" h-72 md:h-72 bg-no-repeat bg-cover w-full" style={{ backgroundImage: `url(${bannerImg})` }} />

      {/* Logo */}
      {/* <div className="absolute bottom-0 left-0 rounded-full w-28 h-28 p-1 overflow-hidden bg-white ring-2 ring-white"> */}
        <Image src={logo} width={100} height={100} alt="pizza-time-logo" style={{position:"relative",bottom:"250px"}}/> {/* Corrected src attribute and added curly braces */}
      {/* </div> */}


      {/* Restaurant Details */}
      <div className="absolute bottom-3 left-40">
        <div className="flex flex-col">
        </div>
      </div>
    </div >
  );
};

export default Logobanner;
