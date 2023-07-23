import { Fragment } from "react";

import { useDashboardStore } from "@/stores";

export default function Sidebar() {
  const { toggleSidebar, isSidebarOpen } = useDashboardStore();

  return (
    <Fragment>
      <div
        className={`sm:hidden ${
          isSidebarOpen ? "block" : "hidden"
        } w-full fixed top-0 left-0 bg-[#00000080] z-[99] backdrop-blur h-full`}
        onClick={toggleSidebar}
      />
      <aside
        className={`flex flex-col bg-white fixed transition-width ease-in-out max-w-[85%] w-full duration-300 ${
          isSidebarOpen ? "3xl:w-80 sm:w-52 w-full" : "3xl:w-40 sm:w-24 w-min"
        } h-screen left-0 top-0 bottom-0 shadow-gray-200 shadow z-[999]`}
      >
        <div></div>
      </aside>
    </Fragment>
  );
}
