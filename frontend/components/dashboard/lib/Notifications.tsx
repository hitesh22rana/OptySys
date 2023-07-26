import { IoMdNotifications } from "react-icons/io";

import Icon from "@/components/common/Icon";

import { useUserStore } from "@/stores";

import useNotification from "@/hooks/useNotifications";

export default function Notifications() {
  const { accessToken } = useUserStore();

  const { isReady, notifications } = useNotification(
    `ws://localhost:8000/api/v1/ws/notifications?access_token=${accessToken}`
  );

  return (
    <Icon disabled={!isReady} onClick={() => {}}>
      <div className="absolute bg-red-500 top-3 right-3 w-[5px] h-[5px] rounded-full" />
      <IoMdNotifications className="text-2xl" />
    </Icon>
  );
}
