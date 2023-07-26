import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { IJsonNotification } from "@/types/common";

const useNotification = (socketUrl: string) => {
  const { lastJsonMessage, readyState } = useWebSocket(socketUrl);
  const [notifications, setNotifications] = useState<Array<IJsonNotification>>(
    Array<IJsonNotification>()
  );

  useEffect(() => {
    if (lastJsonMessage) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        lastJsonMessage as unknown as IJsonNotification,
      ]);
    }
  }, [lastJsonMessage]);

  return {
    isReady: readyState === ReadyState.OPEN,
    notifications,
  };
};

export default useNotification;
