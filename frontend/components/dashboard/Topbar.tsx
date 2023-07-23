"use client";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

import DropdownMenu from "@/components/common/DropdownMenu";

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
        router.push("/login");
        window.location.reload();
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

        <div className="group relative flex items-center justify-center bg-slate-50 hover:bg-slate-100 border-[1px] border-gray-200 p-2 text-gray-800 rounded-full cursor-pointer duration-150">
          <BiUser className="cursor-pointer text-2xl" />
          <DropdownMenu className="w-40">
            <button
              className="flex items-center w-full gap-2 justify-start cursor-pointer transition-all duration-200 hover:bg-gray-100 rounded-md p-2"
              onClick={handleLogout}
            >
              <FiLogOut className="text-gray-600" />
              <span className="font-medium text-gray-600">Logout</span>
            </button>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
