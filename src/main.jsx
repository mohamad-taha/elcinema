import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context.jsx";
import "./locales/I18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/elcinema/">
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
