import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { Route, Router, Switch } from "wouter";
import { Gearbox } from "./pages/Gearbox.tsx";
import "./index.css";
import { CarSetupProvider } from "./providers/car-setup.provider.tsx";
import { GlobalConfigProvider } from "./providers/global-config.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalConfigProvider>
      <CarSetupProvider>
        <Router base="/simple-gearbox-calculator">
          <Switch>
            <Route path="/" component={Gearbox} />
            <Route path="/dampers">{() => <p>hola</p>}</Route>
            <Route>{Gearbox}</Route> {/* default route */}
          </Switch>
        </Router>
      </CarSetupProvider>
    </GlobalConfigProvider>
    <Toaster richColors />
  </StrictMode>,
);
