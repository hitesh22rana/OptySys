import { Fragment } from "react";

import Icon from "@/src/components/common/Icon";

import { useDashboardStore } from "@/src/stores";
import { BiUser } from "react-icons/bi";

export default function Sidebar() {
  const { toggleSidebar, isSidebarOpen } = useDashboardStore();

  return (
    <Fragment>
      <div
        className={`sm:hidden ${
          isSidebarOpen ? "block" : "hidden"
        } w-full fixed bg-[#00000080] z-[99] backdrop-blur inset-0 h-full`}
        onClick={toggleSidebar}
      />
      <aside
        className={`flex flex-col bg-white fixed transition-width ease-in-out max-w-[85%] w-full p-5 duration-300 ${
          isSidebarOpen
            ? "3xl:w-80 sm:w-52 w-full"
            : "3xl:w-40 sm:w-24 sm:flex hidden"
        } h-screen left-0 top-0 bottom-0 shadow-gray-200 shadow z-[999] items-center justify-start`}
      >
        <div
          className={`flex items-center rounded-md cursor-pointer ${
            isSidebarOpen
              ? "flex-row w-full bg-gray-100 gap-2 p-1"
              : "flex-col justify-center gap-1"
          }`}
        >
          <Icon>
            <BiUser
              className={`min-w-fit bg-text-g ${
                isSidebarOpen ? "text-lg" : "text-xl"
              }`}
            />
          </Icon>
          <span className="text-sm text-gray-600 font-medium">Profile</span>
        </div>
      </aside>
    </Fragment>
  );
}
