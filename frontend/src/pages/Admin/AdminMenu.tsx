import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaBox,
  FaTags,
  FaClipboardList,
  FaUsers
} from "react-icons/fa";

const AdminMenu = () => {
  const menuItems = [
    {
      to: "/admin/dashboard",
      icon: FaChartLine,
      label: "Dashboard",
    },
    {
      to: "/admin/categorylist",
      icon: FaTags,
      label: "Categories",
    },
    {
      to: "/admin/productlist",
      icon: FaBox,
      label: "Products",
    },
    {
      to: "/admin/allproductslist",
      icon: FaClipboardList,
      label: "All Products",
    },
    {
      to: "/admin/userlist",
      icon: FaUsers,
      label: "Users",
    },
    {
      to: "/admin/orderlist",
      icon: FaClipboardList,
      label: "Orders",
    },
  ];

  return (
    <div className="bg-[#0f0f10] border-b border-[#333] sticky top-[80px] z-40 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                  }`
                }
              >
                <Icon className="text-lg" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AdminMenu;
