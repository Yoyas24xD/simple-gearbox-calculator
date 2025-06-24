import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { InitialDataProvider } from "./providers/initial-data.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InitialDataProvider>
      <App />
    </InitialDataProvider>
  </StrictMode>
);
