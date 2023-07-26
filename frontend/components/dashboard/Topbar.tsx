"use client";

import { IoMdNotifications } from "react-icons/io";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import TopbarDropDown from "@/components/dashboard/lib/TopbarDropDown";
import Icon from "@/components/common/Icon";

import { useDashboardStore, useUserStore } from "@/stores";

import useWebSocket from "react-use-websocket";

export default function Topbar() {
  const { accessToken } = useUserStore();

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `ws://localhost:8000/api/v1/ws/notifications?access_token=${accessToken}`
  );
  const { isSidebarOpen, toggleSidebar } = useDashboardStore();

  return (
    <header className="flex flex-row items-center justify-between bg-white w-full py-2">
      <Icon onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <RiMenuFoldLine className="cursor-pointer text-xl" />
        ) : (
          <RiMenuUnfoldLine className="cursor-pointer text-xl" />
        )}
      </Icon>

      <div className="relative flex flex-row items-center gap-8">
        <Icon>
          <div className="absolute bg-red-500 top-3 right-3 w-[5px] h-[5px] rounded-full" />
          <IoMdNotifications className="text-2xl" />
        </Icon>

        <TopbarDropDown />
      </div>
    </header>
  );
}
