import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full bg-gradient-dark">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
