import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import AlertDialog from "@/src/components/common/AlertDialog";

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
      <div className="flex flex-col sm:px-5 p-3 max-w-lg gap-5 shadow-lg drop-shadow-sm border-[1px] border-gray-200 bg-white w-full rounded-md">
        <h3 className="sm:text-xl text-lg font-medium">
          Are you sure you want to logout?
        </h3>
        <p className="sm:text-base text-sm font-normal text-gray-500">
          This action will log you out of your account. You will need to log in
          again to access your account.
        </p>
        <div className="flex flex-row items-center w-full justify-end gap-2">
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border shadow-sm bg-inherit hover:bg-gray-50 sm:h-9 h-8 sm:px-4 px-3 py-2"
            onClick={toggleLogoutAlert}
          >
            cancel
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border shadow-sm bg-[#28282B] hover:bg-[#36454F] text-gray-50 sm:h-9 h-8 sm:px-4 px-3 py-2"
            onClick={handleLogout}
          >
            continue
          </button>
        </div>
      </div>
    </AlertDialog>
  );
}
