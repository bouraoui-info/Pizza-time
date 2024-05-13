"use client";
import { useState } from "react";
import Image from "next/image";

import { HiPencil } from "react-icons/hi2";
import UploadImg from "../Components/UploadImg";

export default function RestaurantDetails() {
  const [image, setImage] = useState("");

  const getBannerImgFile = async (file: File) => {
    console.log(file);

  };
  return (
    <>
      <div className="flex items-center justify-center  p-4 text-2xl  text-slate-700 bg-white">
        <h2>Edit Restaurant Details </h2>
        <HiPencil />
      </div>
      <form className="grid w-full px-4 py-8 gap-4 md:grid-cols-2 bg-blue ">
        <div className="grid gap-4 mb-4 sm:grid-cols-2">

          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Your New Name"
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">
              Town
            </label>
            <input type="text" className="form-control" id="inputCity" placeholder="Your City"
            />

          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <select id="inputState" className="form-select">
              <option value="" disabled selected>
                Choose...
              </option>
              <option value="disabled selected" >
                Tunisia
              </option>
              <option value="" >
                France            
                  </option>
              {/* Add other options here */}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
        </div>
        <div>
          <UploadImg handleCallBack={getBannerImgFile} id="restDetails" />
        </div>
        <div className="">
          <button
            type="submit"
            className="py-2 px-4 
              border border-transparent shadow-sm text-sm font-medium rounded-md
               text-white bg-green-600 hover:bg-green-700 focus:outline-none 
               focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save Restaurant Details
          </button>
        </div>

      </form>
    </>
  );
};

