"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import useUserStore from "@/stores/user";

import { WrapperProps } from "@/types/common";
import { deleteCookie, getAccessToken } from "@/app/(actions)/common";
import { getUser } from "@/http";

export default function DashboardWrapper({ children }: WrapperProps) {
  const router = useRouter();
  const { setUser, setAccessToken, logoutUser } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessToken();
      setAccessToken(accessToken);

      try {
        const { data } = await Promise.resolve(await getUser(accessToken));
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
    <div className="relative flex flex-row justify-end items-start mx-auto w-full h-full">
      <Sidebar />
      <div className="flex flex-col 3xl:max-w-[calc(100%-20rem)] max-w-[calc(100%-16rem)] w-full h-full">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
