"use client";

import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import Details from "@/components/auth/Details";

import { useUserStore, useDashboardStore } from "@/stores";

import { WrapperProps } from "@/types/common";
import { deleteCookie, getAccessToken } from "@/app/(actions)/common";
import { getUser } from "@/http";

export default function DashboardWrapper({ children }: WrapperProps) {
  const router = useRouter();
  const { setUser, setAccessToken, logoutUser, getActivationStatus } =
    useUserStore();
  const { isSidebarOpen } = useDashboardStore();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessToken();
      setAccessToken(accessToken);

      try {
        const { data } = await getUser(accessToken);
        setUser(data);
      } catch (err) {
        toast.error("Session expired");
        logoutUser();
        await deleteCookie("access_token");
        router.push("/login");
      }
    };
    fetchData();
  }, [setUser, setAccessToken, logoutUser, router]);

  return (
    <Fragment>
      {!getActivationStatus() && <Details />}

      <div className="relative flex flex-row justify-end items-start mx-auto w-full h-full">
        <Sidebar />
        <div
          className={`flex flex-col min-h-screen ease-in-out duration-300 w-screen ${
            isSidebarOpen
              ? "3xl:max-w-[calc(100%-20rem)] sm:max-w-[calc(100%-13rem)]"
              : "3xl:max-w-[calc(100%-10rem)] sm:max-w-[calc(100%-6rem)]"
          } w-full h-full sm:py-2 sm:px-10 p-5`}
        >
          <Topbar />
          {children}
        </div>
      </div>
    </Fragment>
  );
}
