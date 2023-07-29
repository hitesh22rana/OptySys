"use server";

import fs from "fs";
import { cookies } from "next/headers";

import { normalizeAccessToken } from "@/src/lib/helpers";

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

export async function getCSVData(filePath: string): Promise<Array<any>> {
  const skills: Array<string> = [];

  fs.readFileSync(filePath, "utf8")
    .split(",")
    .forEach((skill) => {
      skills.push(skill);
    });
  return skills;
}
