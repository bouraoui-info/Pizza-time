"use client"
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import Header from "@/app/common/Header";
import { store } from "../../store";
import ModalComponent from "@/app/common/ModalComponent";
import MenuModal from "@/app/Home/MenuModal";

interface Product {
    price: number;
    idProduct: number;
    title: string;
    imageUrl: {
        Default: {
            urlDefault: string;
        };
    };
    priceHT: number;
}

const CompanyPage: React.FC = () => {
    const { selectedResto, selectedCat } = useSnapshot(store);
    const [products, setProducts] = useState<Product[]>([]);
    const [number, setNumber] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [menu, setMenu] = useState<any>({});

    const getProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/restaurant/${selectedResto}/${selectedCat}/product`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            console.log({ jsonData });
            setProducts([...jsonData]);
            localStorage.setItem("shopLength", jsonData.length.toString());
        } catch (e) {
            console.error("Error fetching products", e);
        }
    };

    useEffect(() => {
        getProduct();
    }, [selectedResto, selectedCat]);

    const handleAddToCart = (product: Product) => {
        setMenu(product)
        setSelectedProduct(product);
        setIsOpenModal(true);
    };


    return (
        <div>
            <Header number={number} />
            <section className="my-16">
                <div className="max-w-2xl mx-auto my-5 text-center">
                    <h2 className="text-3xl leading-tight tracking-tighter text-gray-600 sm:text-4xl">
                        Products:
                    </h2>
                </div>
            </section>
            <section className="mb-24">
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
                    {products.map((product, key) => (
                        <div key={key} className="flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden border rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                            <img
                                src={product.imageUrl.Default.urlDefault}
                                alt={product.title}
                                className="rounded-full w-32 h-32 mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                            <p className="text-gray-600 mb-2">{product.price ?? product.priceHT} €</p>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            {isOpenModal && (
                // <ModalComponent
                //     isOpenModal={isOpenModal}
                //     setIsOpenModal={setIsOpenModal}
                //     title={selectedProduct.title}
                //     image={selectedProduct.imageUrl.Default.urlDefault}
                //     menu={selectedProduct}
                //     user={null} 
                //     setNumber={setNumber}
                //     number={number}
                // />
                <MenuModal  menu={menu} setNumber={setNumber} number={number} setIsModalOpen={setIsOpenModal}  isModalOpen={isOpenModal}/>
            )}
        </div>
    );
};

export default CompanyPage;
