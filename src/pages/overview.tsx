import { AlertCircle, Car, FileText, Plus } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import Logo from "../assets/logo-ae86.webp";
import cars from "../data/cars.json";
import { useCarSetup } from "../hooks/use-car-setup";
import { useSetups } from "../hooks/use-setups";

export const Overview = () => {
  const [, navigate] = useLocation();
  const setups = useSetups();
  const { clearSetup } = useCarSetup();

  useEffect(() => {
    clearSetup();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="CarX Tools Logo"
            className="w-48 h-48 rounded-full shadow-lg"
          />
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          The ultimate tool for optimizing your CarX setups. Adjust suspension,
          gearbox, and more with precision.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3">
            <Car className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-900">{cars.length}</p>
              <p className="text-blue-700 text-sm">Available Cars</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200 flex flex-col justify-center items-center text-center">
          <div className="flex items-center space-x-3 mb-2">
            <AlertCircle className="w-8 h-8 text-yellow-600" />{" "}
            {/* A warning/info icon */}
            <p className="text-2xl font-bold text-yellow-900">
              Under Development
            </p>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            We're actively working on adding more features and data. Check back
            soon for updates!
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-purple-900">
                {setups.length}
              </p>
              <p className="text-purple-700 text-sm">Saved Setups</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/new-setup")}
          className="group p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 text-left"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Create New Setup
            </h3>
          </div>
          <p className="text-gray-600">
            Start from a predefined setup or create one from scratch
          </p>
        </button>

        <button
          onClick={() => navigate("/saved-setups")}
          className="group p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 text-left"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">My Setups</h3>
          </div>
          <p className="text-gray-600">
            Access and edit your saved configurations
          </p>
        </button>
      </div>
    </div>
  );
};
