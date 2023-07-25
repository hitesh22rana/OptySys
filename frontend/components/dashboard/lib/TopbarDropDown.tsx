import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { BiUser } from "react-icons/bi";
import { FiLogOut, FiSettings } from "react-icons/fi";

import DropdownMenu from "@/components/common/DropdownMenu";
import Icon from "@/components/common/Icon";

import { logout } from "@/http";
import { useUserStore } from "@/stores";

export default function TopbarDropDown() {
  const router = useRouter();

  const { accessToken, logoutUser, user } = useUserStore();

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
    <div className="group relative flex items-center justify-center rounded-full cursor-pointer">
      <Icon>
        <FiSettings className="text-2xl" />
      </Icon>
      <DropdownMenu className="w-auto max-w-[250px]">
        <div className="cursor-text flex items-center w-full gap-2 justify-start p-2 transition-all duration-200 border-b-2 pb-3">
          <BiUser className="text-xl min-w-fit" />
          <div className="flex flex-col items-start justify-start">
            <span className="font-medium text-sm text-gray-600 line-clamp-1">
              {user?.name}
            </span>
            <span className="font-medium text-xs text-gray-600 line-clamp-1">
              {user?.email}
            </span>
          </div>
        </div>
        <button
          className="flex items-center w-full gap-2 justify-start cursor-pointer transition-all duration-200 hover:bg-gray-100 rounded-md p-2"
          onClick={handleLogout}
        >
          <FiLogOut className="text-gray-600 text-xl" />
          <span className="font-medium text-gray-600">Logout</span>
        </button>
      </DropdownMenu>
    </div>
  );
}
