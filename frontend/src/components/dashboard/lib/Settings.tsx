import { BiUser } from "react-icons/bi";
import { FiLogOut, FiSettings } from "react-icons/fi";

import DropdownMenu from "@/src/components/common/DropdownMenu";
import Icon from "@/src/components/common/Icon";

import { useDashboardStore, useUserStore } from "@/src/stores";

export default function Settings() {
  const { accessToken, user } = useUserStore();
  const { toggleLogoutAlert } = useDashboardStore();

  return (
    <div className="group relative flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 border-[1px] border-transparent hover:border-gray-200">
      <Icon>
        <FiSettings className="text-2xl" />
      </Icon>

      {accessToken && (
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
            onClick={toggleLogoutAlert}
          >
            <FiLogOut className="text-gray-600 text-xl" />
            <span className="font-medium text-gray-600">Logout</span>
          </button>
        </DropdownMenu>
      )}
    </div>
  );
}
