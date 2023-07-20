import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
