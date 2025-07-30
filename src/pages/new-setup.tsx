import { useLocation } from "wouter";
import { Button } from "../components/ui/button";

const predefinedSetups = [
  {
    id: 1,
    name: "Drift Pro",
    category: "Drift",
    description: "Optimized setup for drift with maximum control",
    cars: 15,
  },
  {
    id: 2,
    name: "Track Master",
    category: "Racing",
    description: "Configuration for high-speed circuits",
    cars: 22,
  },
  {
    id: 3,
    name: "Drag Beast",
    category: "Drag",
    description: "Specialized setup for acceleration races",
    cars: 8,
  },
  {
    id: 4,
    name: "Rally King",
    category: "Rally",
    description: "All-terrain configuration for rally racing",
    cars: 12,
  },
  {
    id: 5,
    name: "Street Cruiser",
    category: "Street",
    description: "Balanced setup for urban driving",
    cars: 18,
  },
];

export const NewSetup = () => {
  const [, navigate] = useLocation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Create New Setup</h2>
        <Button flavor="ghost" onClick={() => navigate("/")}>
          ← Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {predefinedSetups.map((setup) => (
          <div
            key={setup.id}
            className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full`}>
                  {setup.category}
                </span>
                <span className="text-sm text-gray-500">{setup.cars} cars</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {setup.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{setup.description}</p>
              <Button
                flavor="primary"
                fullWidth
                onClick={() => navigate(`/new-setup/${setup.id}`)} // TODO: Implement setup creation logic
              >
                Use This Setup
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Prefer to start from scratch?
        </h3>
        <p className="text-gray-600 mb-4">
          Create a completely custom setup without using any template
        </p>
        <Button flavor="warning" size="lg">
          Create Blank Setup
        </Button>
      </div>
    </div>
  );
};
