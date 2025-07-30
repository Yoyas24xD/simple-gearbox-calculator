import { type ComponentType } from "react";
import { Navigation } from "../navigation";

export const HOCEntrypoint = (Component: ComponentType) => {
  return () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Navigation />
        <div className="transition-all duration-500 ease-in-out">
          <Component />
        </div>
      </div>
    </div>
  );
};
