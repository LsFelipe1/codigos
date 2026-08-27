import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import AdminHeader from "./components/adminheader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-(--gray-100)">

      <Sidebar />

      <div className="min-h-screen lg:ml-64">

        <AdminHeader />

        <main className="p-5 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}