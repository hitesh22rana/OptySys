"use client";

import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import Sidebar from "@/src/components/dashboard/Sidebar";
import Topbar from "@/src/components/dashboard/Topbar";
import Details from "@/src/components/auth/Details";
import LogoutAlertDialog from "@/src/components/dashboard/lib/LogoutAlertDialog";

import { deleteCookie, getAccessToken } from "@/src/app/(actions)/common";

import { getUser } from "@/src/http";

import { useUserStore, useDashboardStore } from "@/src/stores";

import { WrapperProps } from "@/src/types/common";

export default function DashboardWrapper({ children }: WrapperProps) {
  const router = useRouter();
  const { setUser, setAccessToken, logoutUser } = useUserStore();
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
      <Details />
      <LogoutAlertDialog />

      <div className="relative flex flex-row justify-end items-start mx-auto w-full h-full">
        <Sidebar />
        <div
          className={`flex flex-col min-h-screen ease-in-out duration-300 3xl:max-w-[calc(100%-20rem)] md:max-w-[calc(100%-15rem)] w-full h-full py-2 md:px-5 px-3`}
        >
          <Topbar />
          {children}
        </div>
      </div>
    </Fragment>
  );
}
