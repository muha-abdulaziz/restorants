import { useEffect, useState } from "react";
import { getRole } from "../../helpers/auth";
import { UserRole } from "../../common/types/enum";
import { Link } from "react-router-dom";

const admin = [
  { name: "Request", route: "/requests" },
  { name: "Users Management", route: "/users" },
];

const delivery = [
  { name: "Shipment Management", route: "/shipment" },
  { name: "Order Management", route: "/order-queue" },
];

export function SideBar() {
  const [items, setItems] = useState<{ name: string; route: string }[]>([]);

  useEffect(() => {
    const role = getRole();
    if (role === UserRole.ADMIN) {
      setItems(admin);
    } else if (role === UserRole.DELIVERY) {
      setItems(delivery);
    }
  }, []);

  return (
    <aside className="w-64 h-full bg-white shadow-md z-10 border-r border-gray-200 flex flex-col">
      <div className="p-6 text-2xl font-bold text-orange-600 border-b border-gray-200">
        {getRole()?.toLowerCase()} Panel
      </div>
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {items.map((ch, i) => (
          <Link
            key={i}
            to={ch.route}
            className="block rounded px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:font-semibold transition-all"
          >
            {ch.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
