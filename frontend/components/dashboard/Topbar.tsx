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
      await Promise.resolve(await logout(accessToken));
      logoutUser();
      toast.success("Logout successfully");
      router.push("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  }

  return (
    <header className="flex flex-row items-center justify-between bg-white w-full transition-width ease-in-out duration-300">
      <div
        className="relative flex items-center justify-center bg-gray-50 border-[1px] border-gray-100 p-2 text-gray-800 rounded-full cursor-pointer transition-all ease-out"
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu className="cursor-pointer text-2xl" />
      </div>

      <div className="flex flex-row items-center gap-8">
        <div className="relative flex items-center justify-center bg-gray-50 border-[1px] border-gray-100 p-2 text-gray-800 rounded-full cursor-pointer">
          <div className="absolute bg-red-500 top-[9px] right-[11px] w-[8px] h-[8px] rounded-full" />
          <IoMdNotifications className="text-2xl" />
        </div>

        <div className="relative flex items-center justify-center bg-gray-50 border-[1px] border-gray-100 p-2 text-gray-800 rounded-full cursor-pointer">
          <BiUser className="cursor-pointer text-2xl" />
        </div>
        {/* <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button> */}
      </div>
    </header>
  );
}
