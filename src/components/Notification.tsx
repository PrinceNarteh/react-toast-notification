import { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

interface NotificationProps {
  type: "SUCCESS" | "INFO" | "WARNING" | "DANGER";
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message, ...props }) => {
  const [exit, setExit] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<number | undefined>(undefined);

  const handleStartTimer = () => {
    const id: any = setInterval((prevState) => {
      setWidth((prevState: number) => {
        if (prevState < 100) {
          return prevState + 0.5;
        }
        return prevState;
      });
    }, 20);
    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {}, 400);
  };

  useEffect(() => {
    handleStartTimer();
  }, []);

  useEffect(() => {
    if (width === 100) {
      // close notification
      handleCloseNotification();
    }
  }, []);

  return (
    <StyledNotification
      {...props}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
    >
      <p>{message}</p>
      <div className="bar" style={{ width: `${width}% ${exit && "exist"}` }} />
    </StyledNotification>
  );
};

type IStyledNotification = Omit<NotificationProps, "message">;

const slideLeft = keyframes`
  0% {
    margin-left: 120%
  }

  100% {
    margin-left: 0
  }
`;

const slideRight = keyframes`
  0% {
    margin-left: 120%
  }

  100% {
    margin-left: 0
  }
`;

const StyledNotification = styled.div<IStyledNotification>`
  width: 100%;
  border-radius: 3px;
  overflow-x: hidden;
  margin-bottom: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  animation: ${slideLeft} 0.4s;
  animation-fill-mode: forwards;

  p {
    margin: 0;
    padding: 15px 10px;
  }

  .bar {
    position: relative;
    bottom: 0;
    left: 0;
    height: 5px;
    background-color: green;

    ${(props) =>
      props.type === "SUCCESS" &&
      css`
        background-color: #198754;
      `}

    ${(props) =>
      props.type === "INFO" &&
      css`
        background-color: #0dcaf0;
      `}
    
    ${(props) =>
      props.type === "WARNING" &&
      css`
        background-color: #ffc107;
      `}
    
    ${(props) =>
      props.type === "DANGER" &&
      css`
        background-color: #dc3545;
      `}
  }

  .exist {
    animation: ${slideRight} 0.4s;
    animation-fill-mode: forwards;
  }
`;

export default Notification;
