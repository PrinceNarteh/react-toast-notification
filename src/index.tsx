import ReactDom from "react-dom";
import App from "./components/App";
import { ToastContextProvider } from "./context/toastContext";

ReactDom.render(
  <ToastContextProvider>
    <App />
  </ToastContextProvider>,
  document.querySelector("#root")
);
