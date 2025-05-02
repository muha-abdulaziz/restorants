import { Outlet } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { SideBar } from "../../components/sidebar/sidebarTk";
import { useUserAccount } from "../../hooks/useAccount";

export function Home() {
  const { isAuthenticated} = useUserAccount()
  return (
    <>
      <Header />
      <div className="flex h-screen">
        {isAuthenticated() ?         <div className="w-64 bg-gray-100 border-r">
          <SideBar />
        </div>: <></> }
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}


