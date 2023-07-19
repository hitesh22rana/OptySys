import { cookies } from "next/headers";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value ?? "";

  return (
    <DashboardWrapper accessToken={accessToken}>{children}</DashboardWrapper>
  );
}
