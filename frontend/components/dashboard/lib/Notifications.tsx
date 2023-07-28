import { IoMdNotifications } from "react-icons/io";

import Icon from "@/components/common/Icon";
import DropdownMenu from "@/components/common/DropdownMenu";

import useNotification from "@/hooks/useNotifications";

import { useUserStore } from "@/stores";

import { IJsonNotification } from "@/types/common";

export default function Notifications() {
  const { accessToken } = useUserStore();

  const { isReady, notifications } = useNotification(
    process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL + "?access_token=" + accessToken
  );

  return (
    <div className="group relative flex items-center justify-center rounded-full cursor-pointer">
      <Icon disabled={!isReady}>
        {isReady && notifications.length > 0 && (
          <div className="absolute bg-red-500 top-3 right-3 w-[5px] h-[5px] rounded-full" />
        )}
        <IoMdNotifications className="text-2xl" />
      </Icon>
      {isReady && notifications.length > 0 && (
        <DropdownMenu className="max-h-96 w-[280px]">
          <h3 className="font-medium border-b border-gray-200 p-2 w-full">
            You have {notifications.length} new notifications.
          </h3>
          <div className="flex flex-col items-start justify-start gap-4">
            {notifications?.map(
              (notification: IJsonNotification, index: number) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-start w-full border-l-2 border-blue-500 p-2"
                >
                  <span className="text-sm font-medium w-full">
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
