import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import { SlOrganization } from "react-icons/sl";

import { useDashboardStore } from "@/src/stores";
import { IRoute } from "@/src/types/common";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export default function Sidebar() {
  const pathName = usePathname();
  const { toggleSidebar, isSidebarOpen } = useDashboardStore();

  const routes: Array<IRoute> = [
    {
      name: "Organizations",
      icon: SlOrganization,
      path: "/dashboard/organizations",
      color: "text-violet-500",
    },
  ];

  return (
    <Fragment>
      <div
        className={`md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        } w-full fixed bg-[#00000080] z-[99] backdrop-blur-lg inset-0 h-full`}
        onClick={toggleSidebar}
      />
      <aside
        className={`flex-col bg-gray-900 fixed transition-width ease-in-out duration-300 px-2 py-4 3xl:w-80 sm:w-64 md:max-w-full max-w-[80%] w-full ${
          isSidebarOpen ? "flex" : "md:flex hidden"
        } h-screen left-0 top-0 bottom-0 shadow-gray-200 shadow z-[999] items-center gap-5 justify-start`}
      >
        <Link
          href="/dashboard"
          className="flex flex-row items-center justify-start gap-4 w-full mb-5"
        >
          <Image src="/images/logo.png" height={50} width={50} alt="logo" />
          <h2
            className={`text-white font-medium text-2xl ${montserrat.className}`}
          >
            OptySys
          </h2>
        </Link>
        {routes.map((route: IRoute, index: number) => {
          return (
            <Link
              href={route.path}
              key={index}
              className={`flex items-center rounded-md cursor-pointer flex-row w-full gap-4 px-4 py-3 text-white hover:bg-white/10 ${
                pathName === route.path
                  ? "text-white bg-white/10"
                  : "text-zinc-300"
              }`}
            >
              <route.icon className={`min-w-fit text-xl ${route.color}`} />
              <span className="text-sm font-medium">{route.name}</span>
            </Link>
          );
        })}
      </aside>
    </Fragment>
  );
}
