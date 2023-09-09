import { FaRegBell } from "react-icons/fa";

import Icon from "@/src/components/ui/Icon";
import DropdownMenu from "@/src/components/ui/DropdownMenu";

import useNotification from "@/src/hooks/useNotifications";

import { useUserStore } from "@/src/stores";

import { IJsonNotification } from "@/src/types/common";

export default function Notifications() {
  const { accessToken } = useUserStore();

  const { isReady, notifications } = useNotification(
    process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL + "?access_token=" + accessToken
  );

  return (
    <div className="group relative flex cursor-pointer items-center justify-center rounded-full">
      <Icon disabled={!isReady}>
        {isReady && notifications.length > 0 && (
          <div className="absolute right-[10px] top-2 h-[8px] w-[8px] rounded-full bg-red-500" />
        )}
        <FaRegBell className="text-2xl" />
      </Icon>
      {isReady && notifications.length > 0 && (
        <DropdownMenu className="max-h-96 w-[280px]">
          <h3 className="w-full border-b border-gray-200 p-2 font-medium">
            You have {notifications.length} new notifications.
          </h3>
          <div className="flex flex-col items-start justify-start gap-4">
            {notifications?.map(
              (notification: IJsonNotification, index: number) => (
                <div
                  key={index}
                  className="flex w-full flex-row items-center justify-start border-l-2 border-blue-500 p-2"
                >
                  <span className="w-full text-sm font-medium">
                    {notification.data["title"]}
                  </span>
                </div>
              )
            )}
          </div>
        </DropdownMenu>
      )}
    </div>
  );
}
