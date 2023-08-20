"use client";

import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { toast } from "react-toastify";

import Sidebar from "@/src/components/dashboard/Sidebar";
import Topbar from "@/src/components/dashboard/Topbar";
import Details from "@/src/components/auth/Details";
const LogoutAlertDialog = dynamic(
  () => import("@/src/components/dashboard/lib/LogoutAlertDialog")
);

import { deleteCookie, getAccessToken } from "@/src/app/(actions)/common";

import { getUser } from "@/src/http";

import { useUserStore } from "@/src/stores";

import { WrapperProps } from "@/src/types/common";

export default function DashboardWrapper({ children }: WrapperProps) {
  const router = useRouter();
  const { setUser, setAccessToken, logoutUser } = useUserStore();

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

      <div className="relative mx-auto flex h-full w-full flex-row items-start justify-end">
        <Sidebar />
        <div
          className={`flex h-full min-h-screen w-full flex-col px-3 py-2 md:max-w-[calc(100%-16rem)] md:px-5 3xl:max-w-[calc(100%-20rem)]`}
        >
          <Topbar />
          {children}
        </div>
      </div>
    </Fragment>
  );
}
