import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { GearsProvider } from "./providers/gears.provider.tsx";
import { InitialDataProvider } from "./providers/initial-data.provider.tsx";
import { Toaster } from "sonner";
import { GlobalConfigProvider } from "./providers/global-config.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalConfigProvider>
      <InitialDataProvider>
        <GearsProvider>
          <App />
        </GearsProvider>
      </InitialDataProvider>
    </GlobalConfigProvider>
    <Toaster richColors />
  </StrictMode>
);
