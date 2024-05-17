import React from 'react';
import Image from 'next/image'; // Correct import statement
import logo from "../../../public/Objects/logo.jpg"; // Correct import statement
import "../globals.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const Logobanner = () => {
  const bannerImg = "/Objects/banner.jpg";
  
  return (
    <div >
      {/* Banner Image */}
      <div className=" h-72 md:h-72 bg-no-repeat bg-cover w-full" style={{ backgroundImage: `url(${bannerImg})` }} />

        <Image src={logo} width={100} height={100} alt="pizza-time-logo" style={{position:"relative",bottom:"250px"}}/> {/* Corrected src attribute and added curly braces */}
    </div >
  );
};

export default Logobanner;
