import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
