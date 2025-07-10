// src/utils/toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success = (msg) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });

export const error = (msg) =>
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });

export const info = (msg) =>
  toast.info(msg, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  });
