import styled, { css } from "styled-components";

interface NotificationProps {
  type: "SUCCESS" | "INFO" | "WARNING" | "DANGER";
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message, ...props }) => {
  return (
    <StyledNotification {...props}>
      <p>{message}</p>
      <div className="bar" />
    </StyledNotification>
  );
};

type IStyledNotification = Omit<NotificationProps, "message">;

const StyledNotification = styled.div<IStyledNotification>`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  overflow-x: hidden;
  margin-bottom: 20px;

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
`;

export default Notification;
