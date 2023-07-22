import { useDashboardStore } from "@/stores";

export default function Sidebar() {
  const { isSidebarOpen } = useDashboardStore();

  return (
    <aside
      className={`flex flex-col 3xl:w-80 transition-width ease-in-out duration-300 ${
        isSidebarOpen ? "w-64" : "w-32"
      } h-screen fixed left-0 top-0 bottom-0 bg-gray-100 p-5`}
    >
      <div></div>
    </aside>
  );
}
