import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; // your Tailwind CSS file

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
