import { type ComponentType } from "react";
import { Navigation } from "../navigation";

// TypeScript interfaces
// interface PredefinedSetup {
//   id: number;
//   name: string;
//   category: "Drift" | "Racing" | "Drag" | "Rally" | "Street";
//   description: string;
//   cars: number;
// }

export const HOCEntrypoint = (Component: ComponentType) => {
  // const getCategoryColor = (category: PredefinedSetup["category"]): string => {
  //   const colors = {
  //     Drift: "bg-purple-100 text-purple-800",
  //     Racing: "bg-red-100 text-red-800",
  //     Drag: "bg-yellow-100 text-yellow-800",
  //     Rally: "bg-green-100 text-green-800",
  //     Street: "bg-blue-100 text-blue-800",
  //   };
  //   return colors[category];
  // };

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
