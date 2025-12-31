import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
        toolbar: { show: false },
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#28a745"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
        style: {
          color: "#fff",
          fontSize: "20px",
          fontWeight: "600",
        },
      },
      grid: {
        borderColor: "#333",
      },
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: "#28a745",
        strokeWidth: 2,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: { color: "#fff" },
        },
        labels: {
          style: { colors: "#fff" },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: {
          text: "Sales",
          style: { color: "#fff" },
        },
        min: 0,
        labels: {
          style: { colors: "#fff" },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
        labels: { colors: "#fff" },
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 mt-2">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fadeIn">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-2">Total Sales</p>
                <h2 className="text-3xl font-bold text-white">
                  ${isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
                </h2>
                <p className="text-primary text-sm mt-2">↗ +12.5% from last month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-glow">
                💰
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-2">Total Customers</p>
                <h2 className="text-3xl font-bold text-white">
                  {loading ? <Loader /> : customers?.length}
                </h2>
                <p className="text-blue-400 text-sm mt-2">↗ +8.2% from last month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                👥
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-2">Total Orders</p>
                <h2 className="text-3xl font-bold text-white">
                  {loadingTwo ? <Loader /> : orders?.totalOrders}
                </h2>
                <p className="text-purple-400 text-sm mt-2">↗ +15.3% from last month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                📦
              </div>
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] p-8 rounded-2xl border border-[#333] shadow-premium hover:shadow-premium-lg transition-all duration-300 mb-8">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="100%"
            height="400"
          />
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
