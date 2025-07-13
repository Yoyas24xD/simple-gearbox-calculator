import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { App } from "./App.tsx";
import "./index.css";
import { CarSetupProvider } from "./providers/car-setup.provider.tsx";
import { GlobalConfigProvider } from "./providers/global-config.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalConfigProvider>
      <CarSetupProvider>
        <App />
      </CarSetupProvider>
    </GlobalConfigProvider>
    <Toaster richColors />
  </StrictMode>
);
