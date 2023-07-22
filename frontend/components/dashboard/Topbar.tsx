"use client";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { BiUser } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

import { logout } from "@/http";
import { useDashboardStore, useUserStore } from "@/stores";

export default function Topbar() {
  const router = useRouter();

  const { accessToken, logoutUser } = useUserStore();
  const { toggleSidebar } = useDashboardStore();

  async function handleLogout() {
    try {
      await logout(accessToken);
      logoutUser();
      toast.success("Logout successfully");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      toast.error("Logout failed");
    }
  }

  return (
    <header className="flex flex-row items-center justify-between bg-white w-full">
      <div
        className="relative flex items-center justify-center bg-slate-50 hover:bg-slate-100 border-[1px] border-gray-200 p-2 text-gray-800 rounded-full cursor-pointer duration-150 transition-all ease-out"
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu className="cursor-pointer text-xl" />
      </div>

      <div className="relative flex flex-row items-center gap-8">
        <div className="relative flex items-center justify-center bg-slate-50 hover:bg-slate-100 border-[1px] border-gray-200 p-2 text-gray-800 rounded-full cursor-pointer duration-150">
          <div className="absolute bg-red-500 top-[11px] right-[10px] w-[6px] h-[7px] rounded-full" />
          <IoMdNotifications className="text-2xl" />
        </div>

        <div className="relative flex items-center justify-center bg-slate-50 hover:bg-slate-100 border-[1px] border-gray-200 p-2 text-gray-800 rounded-full cursor-pointer duration-150">
          <BiUser className="cursor-pointer text-2xl" />
        </div>
        {/* <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button> */}

        <div className="absolute top-12 right-5 w-52 h-52 bg-blue-50 rounded-lg rounded-tr-none">
          <div className="relative flex flex-col items-center justify-center h-full">
            <span className="absolute bg-slate-950 -top-1 w-4 h-4 -right-1" />
          </div>
        </div>
      </div>
    </header>
  );
}
