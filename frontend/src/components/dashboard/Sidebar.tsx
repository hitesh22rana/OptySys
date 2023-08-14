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
        } fixed inset-0 z-[99] h-full w-full bg-[#00000080] backdrop-blur-lg`}
        onClick={toggleSidebar}
      />
      <aside
        className={`fixed w-full max-w-[80%] flex-col bg-gray-900 px-2 py-4 transition-width duration-300 ease-in-out sm:w-64 md:max-w-full 3xl:w-80 ${
          isSidebarOpen ? "flex" : "hidden md:flex"
        } bottom-0 left-0 top-0 z-[999] h-screen items-center justify-start gap-5 shadow shadow-gray-200`}
      >
        <Link
          href="/dashboard"
          className="mb-5 flex w-full flex-row items-center justify-start gap-4"
        >
          <Image src="/images/logo.png" height={50} width={50} alt="logo" />
          <h2
            className={`text-2xl font-medium text-white ${montserrat.className}`}
          >
            OptySys
          </h2>
        </Link>
        {routes.map((route: IRoute, index: number) => {
          return (
            <Link
              href={route.path}
              key={index}
              className={`flex w-full cursor-pointer flex-row items-center gap-4 rounded-md px-4 py-3 text-white hover:bg-white/10 ${
                pathName === route.path
                  ? "bg-white/10 text-white"
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
