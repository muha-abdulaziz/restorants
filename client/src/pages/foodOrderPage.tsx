import React, { useEffect, useState } from "react";
import { Input, Button, notification, Card, Spin } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import "antd/dist/reset.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useUserAccount } from "../hooks/useAccount";
import { getToken } from "../helpers/auth";
const BASE_URL = process.env.REACT_APP_BACKEND_URL_API;
type FoodItem = {
  id: number;
  name_en: string;
  imageUrl: string;
  price: number;
  restaurantId: number;
};

const mockItems: FoodItem[] = [
  {
    id: 1,
    name_en: "Pizza Margherita",
    imageUrl:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=428&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 100,
    restaurantId: 1,
  },
  {
    id: 2,
    name_en: "Sushi Platter",
    price: 230,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1668146927669-f2edf6e86f6f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurantId: 2,
  },
  {
    id: 3,
    name_en: "Burger Deluxe",
    price: 203,
    imageUrl:
      "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurantId: 3,
  },
];

const FoodOrderComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useUserAccount();
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${BASE_URL}/meal`);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setItems(
            data.data.map((item: any) => ({
              id: item.id,
              name_en: item.name_en,
              imageUrl: item.imageUrl,
              price: Number(item.price),
              restaurantId: item.menu?.restaurant?.id ?? 0,
            }))
          );
        } else {
          throw new Error("Fetch failed");
        }
      } catch (err) {
        notification.warning({
          message: "Using mock items",
          description: "Failed to fetch items from server, using mock data.",
          placement: "topRight" as NotificationPlacement,
        });
        setItems(mockItems);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems =items.length > 0 ? items.filter((item) =>
    item.name_en.toLowerCase().includes(searchTerm.toLowerCase())
  ):[]

  const handleSelect = (item: FoodItem) => {
    setSelectedItems((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleBulkOrder = async () => {
    if (!isAuthenticated()) {
      notification.warning({
        message: "Login Required",
        description: "You must be logged in to place an order.",
        placement: "topRight" as NotificationPlacement,
      });
      return;
    }

    const address = window.prompt("Please enter your delivery address:");
    if (!address) {
      notification.warning({
        message: "Address Required",
        description: "You must provide an address to complete the order.",
        placement: "topRight",
      });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/order/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          items: selectedItems.map((item) => ({ id: item.id, restaurantId: item.restaurantId })),
          address,
        }),
      });

      if (res.ok) {
        notification.success({
          message: "Order Successful",
          description: "You have successfully ordered selected items.",
          placement: "topRight" as NotificationPlacement,
        });
        setSelectedItems([]);
      } else {
        throw new Error("Failed to order");
      }
    } catch (error) {
      notification.error({
        message: "Order Failed",
        description: "Could not complete the order. Please try again.",
        placement: "topRight" as NotificationPlacement,
      });
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto relative">
      <Input
        placeholder="Search food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              cover={
                <img
                  alt={item.name_en}
                  src={item.imageUrl}
                  className="h-48 object-cover"
                />
              }
              className="rounded-2xl shadow-md"
            >
              <Card.Meta title={item.name_en} />
              <p className="mt-2 font-semibold text-gray-700">
                ${item.price}
              </p>
              <div className="mt-4 flex justify-end">
                <Button
                  className="bg-red-100 border-none"
                  onClick={() => handleSelect(item)}
                >
                  {selectedItems.find((i) => i.id === item.id)
                    ? "Remove"
                    : "Add to List"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedItems.length > 0 && (
        <Button
          icon={<ShoppingCartOutlined />}
          onClick={handleBulkOrder}
          className="fixed bottom-6 right-6 bg-red-100 text-black hover:bg-red-200 border-none shadow-xl"
        >
          Order All ({selectedItems.length})
        </Button>
      )}
    </div>
  );
};

export default FoodOrderComponent;
