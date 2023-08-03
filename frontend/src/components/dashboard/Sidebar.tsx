import { Fragment } from "react";

import Icon from "@/src/components/common/Icon";

import { useDashboardStore } from "@/src/stores";
import { BiUser } from "react-icons/bi";

export default function Sidebar() {
  const { toggleSidebar, isSidebarOpen } = useDashboardStore();

  return (
    <Fragment>
      <div
        className={`md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        } w-full fixed bg-[#00000080] z-[99] backdrop-blur-lg inset-0 h-full`}
        onClick={toggleSidebar}
      />
      <aside
        className={`flex-col bg-white fixed transition-width ease-in-out duration-300 p-5 3xl:w-80 sm:w-52 md:max-w-full max-w-[85%] w-full ${
          isSidebarOpen ? "flex" : "md:flex hidden"
        } h-screen left-0 top-0 bottom-0 shadow-gray-200 shadow z-[999] items-center justify-start`}
      >
        <div className="flex items-center rounded-md cursor-pointer flex-row w-full bg-gray-100 gap-2 p-1">
          <Icon>
            <BiUser className="min-w-fit bg-text-g text-lg" />
          </Icon>
          <span className="text-sm text-gray-600 font-medium">Profile</span>
        </div>
      </aside>
    </Fragment>
  );
}
