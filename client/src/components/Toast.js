import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Success = (msg) => {
  toast.success(msg, {
    position: "top-right",
    theme: "dark",
  });
};
export const Error = (msg) => {
  toast.error(msg, {
    position: "top-right",
    theme: "dark",
  });
};
