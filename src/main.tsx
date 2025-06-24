import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { GearsProvider } from "./providers/gears.provider.tsx";
import { InitialDataProvider } from "./providers/initial-data.provider.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InitialDataProvider>
      <GearsProvider>
        <App />
      </GearsProvider>
    </InitialDataProvider>
    <Toaster richColors />
  </StrictMode>
);
