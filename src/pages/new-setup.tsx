import { useLocation } from "wouter";
import { Button } from "../components/ui/button";
import cars from "../data/cars.json";

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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {cars
          .sort((a, b) => a.car.localeCompare(b.car))
          .map((car) => (
            <div
              key={car.car}
              className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {car.car}
                </h3>
                <Button
                  flavor="primary"
                  fullWidth
                  onClick={() =>
                    navigate(`/new-setup/${car.car}`, { state: { car } })
                  } // TODO: Implement setup creation logic
                >
                  Use This Setup
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
