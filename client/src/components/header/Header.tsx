import { Link, Navigate, useNavigate } from "react-router-dom";
import style from "./style.module.css";
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
    // <div className={style.mainHeader}>
    //   <div
    //     style={{
    //       backgroundColor: "orange",
    //       fontFamily: "fantasy",
    //     }}
    //   >
    //     <h1 style={{ color: "white", fontWeight: "bold" }}>
    //       Restaurant Delivery
    //     </h1>
    //   </div>

    //   <div className="flex justify-between" style={{ width: "40%" }}>
    //     <Menu
    //       onClick={handleMenuClick}
    //       selectedKeys={[selectedKey]}
    //       mode="horizontal"
    //       inlineCollapsed={false}
    //     >
    //       {isAuthenticated() ? (
    //         <>
    //           <Menu.Item key="home">
    //             <Link to="/">Home</Link>
    //           </Menu.Item>

    //           {isAdmin() && (
    //             <Menu.Item key="users">
    //               <Link to="/users">Users</Link>
    //             </Menu.Item>
    //           )}
    //           <Menu.Item key="apartments">
    //             <Link to="/meals">meals</Link>
    //           </Menu.Item>
    //         </>
    //       ) : (
    //         <></>
    //       )}
    //     </Menu>
    //   </div>
    //   <div style={{ width: "200px flex justify-between" }}>
    //     <BusinessDropdown />
    //     {isAuthenticated() ? (
    //       <>
    //         <UserProfileMenu />
    //       </>
    //     ) : (
    //       <PrimaryButton onClick={routeToSignInPage}>Sign in</PrimaryButton>
    //     )}
    //   </div>
    // </div>
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div
        style={{
          backgroundColor: "orange",
          fontFamily: "fantasy",
        }}
      >
        <h1 style={{ color: "white", fontWeight: "bold" }}>
          Restaurant Delivery
        </h1>
      </div>

      <nav className="flex gap-4">
        <BusinessDropdown />

        {isAuthenticated() ? (
          <>
            <UserProfileMenu />
          </>
        ) : (
          <PrimaryButton onClick={routeToSignInPage}>Sign in</PrimaryButton>
        )}
      </nav>
    </header>
  );
}
