
"use client";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import Header from "@/app/common/Header";
import SideBar from "@/app/common/SideBar";
import Logobanner from "@/app/Home/LogoBanner";
import Footer from "@/app/common/Footer";
import Icons from "@/app/icons/Icons";
import { card } from "@/constats";
import { store } from "../store";
import { List } from "reactstrap";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  title: string;
  imageUrl: {
    Default: {
      urlDefault: string;
    };
  };
}

export default function CompanyPage() {
  const { selectedResto } = useSnapshot(store);
  const [categories, setCategories] = useState<Category[]>([]);
  const [number, setNumber] = React.useState(0);
  const router = useRouter(); 
  
  const handleCategoryClick = (categoryID:number)=>{
    store.selectedCat=categoryID; 
    router.push("boutiques/ListProduct");

  }
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/restaurant/${selectedResto}/categories`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const jsonData = await response.json();
      setCategories(jsonData);
      console.log({ jsonData });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [selectedResto]);


  return (
    <div>
      <Header number={number} />
      <SideBar />
      <Logobanner />
      <section className="my-16">
        <div className="max-w-2xl mx-auto my-5 text-center">
          <h2 className="text-3xl leading-tight tracking-tighter text-gray-600 sm:text-4xl">
            Catégories :
          </h2>
        </div>
      </section>
      <section className="mb-24">
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {Object.values(categories).map((category) => (
            <div
              className="flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden border rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
              key={category.id}
              onClick={() => handleCategoryClick(category.id)
          }
            >
              <img
                src={category.imageUrl.Default.urlDefault}
                width={60}
                height={60}
                alt="catégories"
                className="mb-2"
              />
              <h3 className="text-center text-lg font-semibold text-gray-700">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}




                   
//                     {/* {MenuData.map((menu: any, index) => (
//                         <MenuModal key={index} menu={menu} setNumber={setNumber} number={number} />
//                     ))} */}

