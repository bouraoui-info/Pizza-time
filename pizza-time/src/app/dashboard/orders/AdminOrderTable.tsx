"use client"
import React, { useEffect, useState } from "react";
import TableWrapper from "../Components/TableWrapper";
import { AdminFetchedOrders } from "./AdminFetchedOrders";

// Define the type for Panier
interface Panier {
  id: string;
  etat: string;
  prix: string;
  userId: string;
  time: string;
  deliveryAddress: string;
  paid: boolean;
  status: string;
  

}

const AdminOrderTable = () => {
  const [panier, setPanier] = useState<Panier[]>([]);
  const [pageVariables, setPageVariables] = useState([
    {
      first: 4,
      after: null as null | string,
    },
  ]);

  useEffect(() => {
    const fetchedPanier = async () => {
        // let userId=JSON.parse(localStorage.getItem("user")??"")?.id

      try {
        const response = await fetch(`http://localhost:3001/api/panier`);
        const data = await response.json();
        setPanier(data);
      } catch (error) {
        console.error("Error fetching panier:", error);
      }
    };
    fetchedPanier();
  }, []);

  const onLoadMore = () => {
    // Implement your logic to load more data
  };

  return (
    <TableWrapper title={"All Orders"}>
      <table className="w-full text-left text-slate-500">
        <thead className="text-xs overflow-x-auto whitespace-nowrap text-slate-700 uppercase bg-slate-100">
          {/* Table header */}
        </thead>
          <AdminFetchedOrders panier={panier} onLoadMore={onLoadMore} />
      </table>
    </TableWrapper>
  );
};

export default AdminOrderTable;
