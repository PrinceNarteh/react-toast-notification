import { createContext, useContext, useReducer } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import Notification from "../components/Notification";

interface INotification {
  id: string;
  type: "SUCCESS" | "INFO" | "WARNING" | "DANGER";
  message: string;
}

export const ToastContext = createContext<INotification>({
  id: uuid(),
  type: "SUCCESS",
  message: "Successful",
});

const reducer = (state: INotification[], action: any) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, { ...action.payload }];
    case "REMOVE_NOTIFICATION":
      return state.filter((notification) => notification.id === action.id);
    default:
      return state;
  }
};

const initialState: INotification[] = [
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

const intialState = {
  id: uuid(),
  type: "SUCCESS",
  message: "",
};

export const ToastContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ToastContext.Provider value={{ state = initialState, dispatch }}>
      <NotificationWrapper>
        {state.map((notification) => (
          <Notification
            key={notification.id}
            dispatch={dispatch}
            {...notification}
          />
        ))}
      </NotificationWrapper>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext<INotification>(ToastContext);

const NotificationWrapper = styled.div`
  position: fixed;
  width: 300px;
  top: 10px;
  right: 10px;
`;
