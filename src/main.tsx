import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { Route, Router, Switch } from "wouter";
import { HOCEntrypoint } from "./components/hoc/entrypoin.tsx";
import "./index.css";
import { Gearbox } from "./pages/gearbox.tsx";
import { NewSetup } from "./pages/new-setup.tsx";
import { Overview } from "./pages/overview.tsx";
import { SavedSetups } from "./pages/saved-setups.tsx";
import { Suspension } from "./pages/suspension.tsx";
import { CarSetupProvider } from "./providers/car-setup.provider.tsx";
import { GlobalConfigProvider } from "./providers/global-config.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalConfigProvider>
      <CarSetupProvider>
        <Router base="/simple-gearbox-calculator">
          <Switch>
            <Route path="/" component={HOCEntrypoint(Overview)} />
            <Route path="/new-setup" component={HOCEntrypoint(NewSetup)} />
            <Route
              path="/saved-setups"
              component={HOCEntrypoint(SavedSetups)}
            />
            <Route path="/gearbox" component={Gearbox} />
            <Route path="/suspension" component={Suspension} />
            <Route component={HOCEntrypoint(Overview)} /> {/* default route */}
          </Switch>
        </Router>
      </CarSetupProvider>
    </GlobalConfigProvider>
    <Toaster richColors position="top-center" />
  </StrictMode>,
);
