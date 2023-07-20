"use server";

import { cookies } from "next/headers";

import { normalizeAccessToken } from "@/lib/helpers";

export async function getAccessToken() {
  const cookieStore = cookies();
  let accessToken = cookieStore.get("access_token")?.value ?? "";
  return normalizeAccessToken(accessToken);
}

export async function deleteCookie(name: string) {
  cookies().set({
    name: name,
    value: "",
    expires: new Date(),
    maxAge: 0,
    path: "/",
  });
}
