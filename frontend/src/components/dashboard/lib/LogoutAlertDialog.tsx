import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import AlertDialog from "@/src/components/ui/AlertDialog";

import { logout } from "@/src/http";

import { useDashboardStore, useUserStore } from "@/src/stores";

export default function LogoutAlertDialog() {
  const router = useRouter();

  const { accessToken, logoutUser } = useUserStore();
  const { isLogoutAlert, toggleLogoutAlert } = useDashboardStore();

  async function handleLogout() {
    try {
      await logout(accessToken);
      logoutUser();
      toast.success("Logout successfully");

      setTimeout(() => {
        router.push("/login");
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error("Logout failed");
    }
  }

  return (
    <AlertDialog isOpen={isLogoutAlert}>
      <div className="flex w-full max-w-lg flex-col gap-5 rounded-md border-[1px] border-gray-200 bg-white p-3 shadow-lg drop-shadow-sm sm:px-5">
        <h3 className="text-lg font-medium sm:text-xl sm:font-semibold">
          Are you sure you want to logout?
        </h3>
        <p className="text-sm font-normal text-gray-500 sm:text-base">
          This action will log you out of your account. You will need to log in
          again to access your account.
        </p>
        <div className="flex w-full flex-row items-center justify-end gap-2">
          <button
            className="focus-visible:ring-ring inline-flex h-8 items-center justify-center rounded-md border bg-inherit px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4"
            onClick={toggleLogoutAlert}
          >
            cancel
          </button>
          <button
            className="focus-visible:ring-ring inline-flex h-8 items-center justify-center rounded-md border bg-[#28282B] px-3 py-2 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-[#36454F] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4"
            onClick={handleLogout}
          >
            continue
          </button>
        </div>
      </div>
    </AlertDialog>
  );
}
