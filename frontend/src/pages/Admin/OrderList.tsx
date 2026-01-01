import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <AdminMenu />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Order Management
          </h1>
          <p className="text-gray-400 mt-2">Monitor and manage all customer orders</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl shadow-premium overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-[#333]">
              <p className="text-sm text-gray-400">
                Total Orders: <span className="text-primary font-semibold">{orders?.length}</span>
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#333]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Delivery
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#333]">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-[#252525] transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.orderItems[0].image}
                            alt={order.orderItems[0].name}
                            className="w-16 h-16 object-cover rounded-lg border border-[#333]"
                          />
                          <div>
                            <p className="text-white font-medium line-clamp-1">
                              {order.orderItems[0].name}
                            </p>
                            {order.orderItems.length > 1 && (
                              <p className="text-xs text-gray-400">
                                +{order.orderItems.length - 1} more item(s)
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-400 font-mono">
                          {order._id.substring(0, 8)}...
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">
                          {order.user ? order.user.username : "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                            : "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-white">
                          ${order.totalPrice.toFixed(2)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {order.isPaid ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                            <FaCheck className="mr-1" /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                            <FaTimes className="mr-1" /> Pending
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {order.isDelivered ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                            <FaCheck className="mr-1" /> Delivered
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                            <FaTimes className="mr-1" /> In Transit
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link to={`/order/${order._id}`}>
                          <button className="inline-flex items-center px-4 py-2 bg-primary/20 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary rounded-lg font-medium transition-all duration-300">
                            <FaEye className="mr-2" />
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {orders?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No orders found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderList;
