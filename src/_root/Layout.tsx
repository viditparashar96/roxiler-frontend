import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
  return (
    <>
      <div className="flex min-h-screen  dark">
        <Sidebar />
        <main className="flex-1 overflow-hidden pt-16">
          <Outlet />
        </main>
      </div>
    </>
  );
}
