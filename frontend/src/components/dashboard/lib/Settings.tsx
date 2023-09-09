import { BiUser } from "react-icons/bi";
import { FiLogOut, FiSettings } from "react-icons/fi";

import DropdownMenu from "@/src/components/ui/DropdownMenu";
import Icon from "@/src/components/ui/Icon";

import { useDashboardStore, useUserStore } from "@/src/stores";

export default function Settings() {
  const { accessToken, user } = useUserStore();
  const { toggleLogoutAlert } = useDashboardStore();

  return (
    <div className="group relative flex cursor-pointer items-center justify-center rounded-full border-[1px] border-transparent hover:border-gray-200 hover:bg-gray-100">
      <Icon>
        <FiSettings className="text-2xl" />
      </Icon>

      {accessToken && (
        <DropdownMenu className="w-auto max-w-[250px]">
          <div className="flex w-full cursor-text items-center justify-start gap-2 border-b-2 p-2 pb-3 transition-all duration-200">
            <BiUser className="min-w-fit text-xl" />
            <div className="flex flex-col items-start justify-start">
              <span className="line-clamp-1 text-sm font-medium text-gray-600">
                {user?.name}
              </span>
              <span className="line-clamp-1 text-xs font-medium text-gray-600">
                {user?.email}
              </span>
            </div>
          </div>
          <button
            className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-md p-2 transition-all duration-200 hover:bg-gray-100"
            onClick={toggleLogoutAlert}
          >
            <FiLogOut className="text-xl text-gray-600" />
            <span className="font-medium text-gray-600">Logout</span>
          </button>
        </DropdownMenu>
      )}
    </div>
  );
}
