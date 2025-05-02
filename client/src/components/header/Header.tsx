import { Link, useNavigate } from "react-router-dom"
import { PrimaryButton } from "../../themes/buttons";
import { Menu } from "antd";
import { useState } from "react";
import { useUserAccount } from "../../hooks/useAccount";
import UserProfileMenu from "../user-profile/userProfileMenu";
import { useUserRole } from "../../hooks/useRole";
import React from "react";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const BusinessDropdown: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/delivery-contract">Delivery</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/restaurant-contract">Restaurant</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button className="text-white bg-orange-600 hover:bg-orange-700 border-none">
        Business <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export function Header() {
  const [selectedKey, setSelectedKey] = useState("home");
  const { isAuthenticated } = useUserAccount();
  const { isAdmin } = useUserRole();
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  const routeToSignInPage = () => {
    navigate("/register");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
        <h1 className="text-2xl font-bold text-red-600 drop-shadow-lg">
          Restaurant <span className="text-yellow-500">Delivery</span>
        </h1>
      </div>

      <nav className="flex gap-4">
        {isAuthenticated() ? (
          <>
            <UserProfileMenu />
          </>
        ) : (
          <>
            <BusinessDropdown />
            <PrimaryButton onClick={routeToSignInPage}>Sign in</PrimaryButton>
          </>
        )}
      </nav>
    </header>
  );
}
