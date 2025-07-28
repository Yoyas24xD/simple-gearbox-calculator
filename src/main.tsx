import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { Redirect, Route, Router, Switch } from "wouter";
import { Gearbox } from "./pages/Gearbox.tsx";
import "./index.css";
import { CarSetupProvider } from "./providers/car-setup.provider.tsx";
import { GlobalConfigProvider } from "./providers/global-config.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalConfigProvider>
      <CarSetupProvider>
        <Router base="/carx-tools">
          <Switch>
            <Route path="/" component={() => <Redirect to="/gearbox" />} />
            <Route path="/gearbox" component={Gearbox} />
            <Route path="/suspension">{() => <p>hola</p>}</Route>
            <Route>{Gearbox}</Route> {/* default route */}
          </Switch>
        </Router>
      </CarSetupProvider>
    </GlobalConfigProvider>
    <Toaster richColors />
  </StrictMode>,
);
