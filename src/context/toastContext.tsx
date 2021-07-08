import { createContext } from "react";

export const ToastContext = createContext();

export const ToastContextProvider: React.FC = ({ children }) => {
  return <ToastContext.Provider value={{}}>{children}</ToastContext.Provider>;
};
