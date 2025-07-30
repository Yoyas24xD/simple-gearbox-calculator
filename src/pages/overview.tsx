import { Car, FileText, Plus, Settings } from "lucide-react";
import { useLocation } from "wouter";

export const Overview = () => {
  const [, navigate] = useLocation();
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <Car className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CarX Tools
        </h1>
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
              <p className="text-2xl font-bold text-blue-900">45</p>
              <p className="text-blue-700 text-sm">Available Cars</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center space-x-3">
            <Settings className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-900">120</p>
              <p className="text-green-700 text-sm">Predefined Setups</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-purple-900">8</p>
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
