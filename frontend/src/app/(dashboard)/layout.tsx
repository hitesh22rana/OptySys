import dynamic from "next/dynamic";

const DashboardWrapper = dynamic(
  () => import("@/src/components/dashboard/DashboardWrapper")
);

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
