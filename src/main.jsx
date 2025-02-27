import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context.jsx";
import App from "./App.jsx";
import "./locales/I18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter basename="/elcinema/">
        <App />
      </BrowserRouter>
    </ContextProvider>
  </StrictMode>
);
