import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { Route, Router, Switch } from "wouter";
import "./index.css";
import { Entrypoint } from "./pages/entrypoin.tsx";
import { Gearbox } from "./pages/gearbox.tsx";
import { Suspension } from "./pages/suspension.tsx";
import { CarSetupProvider } from "./providers/car-setup.provider.tsx";
import { GlobalConfigProvider } from "./providers/global-config.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalConfigProvider>
      <CarSetupProvider>
        <Router base="/carx-tools">
          <Switch>
            <Route path="/" component={Entrypoint} />
            <Route path="/gearbox" component={Gearbox} />
            <Route path="/suspension" component={Suspension} />
            <Route component={Entrypoint} /> {/* default route */}
          </Switch>
        </Router>
      </CarSetupProvider>
    </GlobalConfigProvider>
    <Toaster richColors />
  </StrictMode>,
);
