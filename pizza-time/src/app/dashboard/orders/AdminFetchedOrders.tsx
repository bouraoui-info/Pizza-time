import { HiCheck, HiXCircle } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AdminOrderModal from "./AdminOrderModal";

type AdminFetchedOrdersProps = {
  orders: any[];
  onLoadMore: () => void;
};

export const AdminFetchedOrders = ({ orders, onLoadMore }: AdminFetchedOrdersProps) => {
  const router = useRouter();

  const changeOrderStatus = async (id: string, newStatus: string, successMessage: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
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
        {orders.map((order) => (
          <tr className="bg-white whitespace-nowrap" key={order.id}>
            <td className="px-6 py-3">{order.orderNumber} </td>
            <td className="px-6 py-3 ">{order.paymentToken}</td>
            <td className="px-6 py-3">{order.orderDate} </td>
            <td className="px-6 py-3">{order.userName} </td>
            <td className="px-6 py-3 max-w-xs ">
              {" "}
              <p className="truncate ...">
                {order.deliveryAddress}{" "}
              </p>{" "}
            </td>
            <td className="px-6 py-3">
              {order.paid ? (
                <HiCheck className=" w-5 h-5 font-bold text-green-600" />
              ) : (
                <HiXCircle className="text-red-600" size={20} />
              )}
            </td>
            <td className="px-6 py-3 ">
              {order.status === "COLLECTED" || order.status === "DELIVERED" ? (
                <HiCheck className=" font-bold text-green-600" size={20} />
              ) : (
                <button
                  className="rounded text-xs font-semibold bg-green-100 px-2 py-1 text-green-500 "
                  onClick={() => changeOrderStatus(order.id, "COLLECTED", "Order status changed to Collected")}
                >
                  Mark Collected
                </button>
              )}
            </td>
            <td className="px-6 py-3 ">
              {order.status === "DELIVERED" ? (
                <HiCheck className=" font-bold text-green-600" size={20} />
              ) : (
                <button
                  className="rounded text-xs font-semibold bg-red-100 px-2 py-1 text-red-400 "
                  onClick={() => changeOrderStatus(order.id, "DELIVERED", "Order status changed to Delivered")}
                >
                  Mark Delivered
                </button>
              )}
            </td>

            <td className="px-6 py-3">
              <AdminOrderModal order={order} />{" "}
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot className="flex justify-center py-3">
        <tr>
          <td>
            {!orders.length && (
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