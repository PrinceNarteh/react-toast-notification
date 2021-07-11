import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import Notification from "../components/Notification";

interface INotification {
  id: string;
  type: "SUCCESS" | "INFO" | "WARNING" | "DANGER";
  message: string;
}

export const ToastContext = createContext<{}>({});

export const ToastContextProvider: React.FC = ({ children }) => {
  const notifications: INotification[] = [
    {
      id: uuid(),
      type: "DANGER",
      message: "Upload Successful",
    },
    {
      id: uuid(),
      type: "INFO",
      message: "Upload Successful",
    },
    {
      id: uuid(),
      type: "SUCCESS",
      message: "Upload Successful",
    },
    {
      id: uuid(),
      type: "WARNING",
      message: "Upload Successful",
    },
  ];
  return (
    <ToastContext.Provider value={{}}>
      <NotificationWrapper>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </NotificationWrapper>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const NotificationWrapper = styled.div`
  position: fixed;
  width: 300px;
  top: 10px;
  right: 10px;
`;
