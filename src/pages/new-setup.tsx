import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { SetupNameModal } from "../components/setup-name-modal";
import { Button } from "../components/ui/button";
import cars from "../data/cars.json";
import { useCarSetup, type CarSetup } from "../hooks/use-car-setup";
export const NewSetup = () => {
  const [, navigate] = useLocation();
  const [selectedCar, setSelectedCar] = useState<CarSetup["baseCar"] | null>(
    null,
  );
  const { setSetup, attachToCar } = useCarSetup();
  return (
    <section className="space-y-6">
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
        <p className="text-gray-500 mb-4 px-4 py-2 border-l-4 border-yellow-400 bg-yellow-50 italic">
          <span className="font-semibold">Note:</span> It's recommended to use a
          car template to ensure you have the necessary parameters for a
          realistic simulation.
        </p>
        <Button flavor="warning" size="lg">
          Create Blank Setup
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...cars]
          .sort((a, b) => a.car.localeCompare(b.car))
          .map((car) => (
            <button
              key={car.car}
              type="button"
              className={`group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${
                selectedCar?.car === car.car
                  ? "border-blue-500 ring-2 ring-blue-300"
                  : ""
              }`}
              onClick={() => setSelectedCar(car)}
              aria-pressed={selectedCar?.car === car.car}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {car.car}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Engine: {car.engine.power_hp} HP, {car.engine.mass_kg} kg
                </p>
              </div>
            </button>
          ))}
      </div>
      <SetupNameModal
        open={!!selectedCar}
        onClose={() => setSelectedCar(null)}
        onConfirm={(name) => {
          if (!selectedCar) return;
          attachToCar(selectedCar);
          setSetup({
            type: "UPDATE_SETUP_NAME",
            name,
          });
          toast.info("The engine's default torque line has been loaded.", {
            description:
              "For a more precise simulation, please upload your car's updated torque line if you've made any modifications.",
            closeButton: true,
            duration: 10_000,
          });
          setSelectedCar(null);
          window.scrollTo(0, 0);
          navigate("/gearbox");
        }}
      />
    </section>
  );
};
