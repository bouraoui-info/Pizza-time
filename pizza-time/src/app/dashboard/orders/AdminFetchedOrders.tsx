import { HiCheck, HiXCircle } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AdminOrderModal from "./AdminOrderModal";

type AdminFetchedOrdersProps = {
  panier: any[];
  onLoadMore: () => void;
};

export const AdminFetchedOrders = ({ panier, onLoadMore }: AdminFetchedOrdersProps) => {
  const router = useRouter();

  const changeOrderStatus = async (id: string, newStatus: string, successMessage: string) => {
    let userId=JSON.parse(localStorage.getItem("user")??"")?.id
    try {
      const res = await fetch(`/api/panier`, {
        method: "Get",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          newStatus,
        }),
      });

      if (res.ok) {
        toast.success(successMessage, { duration: 3000 });
        router.refresh();
      } else {
        toast.error("An error occurred.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <tbody>
        {panier.map((panier) => (
          <tr className="bg-white whitespace-nowrap" >
            <td className="px-6 py-3">{panier.id} </td>
            <td className="px-6 py-3 ">{panier.etat}</td>
            <td className="px-6 py-3">{panier.time} </td>
            <td className="px-6 py-3">{panier.userId} </td>
            <td className="px-6 py-3">{panier.prix} </td>

            <td className="px-6 py-3 max-w-xs ">
              {" "}
              <p className="truncate ...">
                {panier.deliveryAddress}{" "}
              </p>{" "}
            </td>
            <td className="px-6 py-3">
              {panier.paid ? (
                <HiCheck className=" w-5 h-5 font-bold text-green-600" />
              ) : (
                <HiXCircle className="text-red-600" size={20} />
              )}
            </td>
            <td className="px-6 py-3 ">
              {panier.status === "COLLECTED" || panier.status === "DELIVERED" ? (
                <HiCheck className=" font-bold text-green-600" size={20} />
              ) : (
                <button
                  className="rounded text-xs font-semibold bg-green-100 px-2 py-1 text-green-500 "
                  onClick={() => changeOrderStatus(panier.id, "COLLECTED", "Order status changed to Collected")}
                >
                  Mark Collected
                </button>
              )}
            </td>
            <td className="px-6 py-3 ">
              {panier.status === "DELIVERED" ? (
                <HiCheck className=" font-bold text-green-600" size={20} />
              ) : (
                <button
                  className="rounded text-xs font-semibold bg-red-100 px-2 py-1 text-red-400 "
                  onClick={() => changeOrderStatus(panier.id, "DELIVERED", "Order status changed to Delivered")}
                >
                  Mark Delivered
                </button>
              )}
            </td>

            <td className="px-6 py-3">
              <AdminOrderModal panier={panier?.panier??[]} />{" "}
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot className="flex justify-center py-3">
        <tr>
          <td>
            {!panier.length && (
              <button
                onClick={onLoadMore}
                className="bg-green-600 text-white text-center
           hover:bg-green-200  hover:text-green-700  py-1 px-2 rounded  focus:outline-none "
              >
                Load More
              </button>
            )}
          </td>
        </tr>
      </tfoot>
    </>
  );
}