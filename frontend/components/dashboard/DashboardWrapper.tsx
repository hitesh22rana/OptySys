"use client";

import { useEffect } from "react";
import { WrapperProps } from "@/types/common";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import { getUser } from "@/http";
import { normalizeAccessToken } from "@/lib/helpers";
import useUserStore from "@/stores/user";

export default function DashboardWrapper({
  accessToken,
  children,
}: WrapperProps) {
  const { token, setUser, setToken } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      setToken(normalizeAccessToken(accessToken));

      try {
        const { data } = await Promise.resolve(await getUser(token));
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
