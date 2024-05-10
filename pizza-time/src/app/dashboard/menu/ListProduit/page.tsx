"use client";
import React from "react";
import TableWrapper from "../../Components/TableWrapper";
import { useSnapshot } from "valtio";
import { store } from "@/app/store";
import Image from "next/image";

export default function ListProduit() {
    const handleDelete = (id: number) => {
        // API call to delete the restaurant with the given ID
        fetch(`http://localhost:3001/api/restaurant/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    };

    const handleCategories = (id: number) => {
        // API call to retrieve the categories for the restaurant with the given ID
        fetch(`http://localhost:3001/api/restaurant/${id}/categories`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    };


    const [shopList, setShopList] = React.useState<any>([]);
    const { selectedResto } = useSnapshot(store)
    const { selectedCat } = useSnapshot(store)






    const getShopList = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/restaurant/${selectedResto}/${selectedCat}/product`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            console.log({ jsonData });
            setShopList([...jsonData]);
            localStorage.setItem("shopLength", jsonData.length);
        } catch (e) {
            console.error("Login error", e);
        }
    };

    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        getShopList();

    }, []);

    return (
        <TableWrapper title={"All Product"}>
            <table className="w-full text-left text-slate-500">
                <thead className="text-xs overflow-x-auto whitespace-nowrap text-slate-700 uppercase bg-slate-100">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <input
                                className="w-4 h-4 accent-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                type="checkbox"
                            />
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Id Produit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th><th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
                        </th>


                    </tr>
                </thead>
                <tbody>
                    {shopList.map((el: any, key: number) => (
                        <tr key={key}>
                            <td className="px-6 py-3">
                                <input
                                    className="w-4 h-4 accent-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                    type="checkbox"
                                />
                            </td>
                            <td className="px-6 py-3">{el.idProduct}</td>
                            <td className="px-6 py-3">{el.title}</td>
                            <td className="px-6 py-3">   <img
                                src={el.imageUrl.Default.urlDefault}
                                className="rounded-full"
                                alt=""
                                width={30}
                                height={30}
                            />
                
                            </td>
                            <td className="px-6 py-3">{el.priceHT??el.price}</td>

                            <td className="px-6 py-3">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(el.idProduct)}
                                >
                                    Supprimer Produits
                                </button>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>


        </TableWrapper >
    );
};

