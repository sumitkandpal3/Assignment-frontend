import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserState from "./context/user/userState.jsx";

createRoot(document.getElementById("root")).render(
  <UserState>
    <App />
  </UserState>
);
