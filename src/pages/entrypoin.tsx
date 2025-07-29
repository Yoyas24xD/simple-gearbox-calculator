import { Car, FileText, Gauge, Plus, Settings, Wrench } from "lucide-react";
import { useState, type JSX } from "react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";

// TypeScript interfaces
interface PredefinedSetup {
  id: number;
  name: string;
  category: "Drift" | "Racing" | "Drag" | "Rally" | "Street";
  description: string;
  cars: number;
}

interface SavedSetup {
  id: number;
  name: string;
  car: string;
  lastModified: string;
  category: "Drift" | "Racing" | "Drag" | "Rally" | "Street";
}

type ActiveSection = "overview" | "new-setup" | "saved-setups";

// Sample data for predefined setups
const predefinedSetups: PredefinedSetup[] = [
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

// Sample data for saved setups
const savedSetups: SavedSetup[] = [
  {
    id: 1,
    name: "My Drift Setup #1",
    car: "Nissan 370Z",
    lastModified: "2 days ago",
    category: "Drift",
  },
  {
    id: 2,
    name: "Racing Setup v2",
    car: "BMW M3",
    lastModified: "1 week ago",
    category: "Racing",
  },
  {
    id: 3,
    name: "Experimental",
    car: "Toyota Supra",
    lastModified: "3 days ago",
    category: "Drag",
  },
];

export const Entrypoint: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("overview");

  const getCategoryColor = (category: PredefinedSetup["category"]): string => {
    const colors = {
      Drift: "bg-purple-100 text-purple-800",
      Racing: "bg-red-100 text-red-800",
      Drag: "bg-yellow-100 text-yellow-800",
      Rally: "bg-green-100 text-green-800",
      Street: "bg-blue-100 text-blue-800",
    };
    return colors[category];
  };

  const renderOverview = (): JSX.Element => (
    <div className="space-y-8">
      {/* Hero Section */}
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
          onClick={() => setActiveSection("new-setup")}
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
          onClick={() => setActiveSection("saved-setups")}
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

  const renderNewSetup = (): JSX.Element => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Create New Setup</h2>
        <Button flavor="ghost" onClick={() => setActiveSection("overview")}>
          ← Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {predefinedSetups.map((setup: PredefinedSetup) => (
          <div
            key={setup.id}
            className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(setup.category)}`}
                >
                  {setup.category}
                </span>
                <span className="text-sm text-gray-500">{setup.cars} cars</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {setup.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{setup.description}</p>
              <Button flavor="primary" fullWidth>
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

  const renderSavedSetups = (): JSX.Element => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Saved Setups</h2>
        <Button flavor="ghost" onClick={() => setActiveSection("overview")}>
          ← Back
        </Button>
      </div>

      <div className="space-y-4">
        {savedSetups.map((setup: SavedSetup) => (
          <div
            key={setup.id}
            className="group bg-white rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {setup.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{setup.car}</span>
                    <span>•</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getCategoryColor(setup.category)}`}
                    >
                      {setup.category}
                    </span>
                    <span>•</span>
                    <span>Modified {setup.lastModified}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button flavor="ghost" size="sm">
                  Edit
                </Button>
                <Button flavor="success" size="sm">
                  Open
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {savedSetups.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No saved setups yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first setup to get started
          </p>
          <Button
            flavor="primary"
            size="lg"
            onClick={() => setActiveSection("new-setup")}
          >
            Create First Setup
          </Button>
        </div>
      )}
    </div>
  );

  const getNavButtonClass = (section: ActiveSection): string => {
    return `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
      activeSection === section
        ? "bg-blue-500 text-white"
        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    }`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActiveSection("overview")}
                className={getNavButtonClass("overview")}
              >
                Home
              </button>
              <button
                onClick={() => setActiveSection("new-setup")}
                className={getNavButtonClass("new-setup")}
              >
                New Setup
              </button>
              <button
                onClick={() => setActiveSection("saved-setups")}
                className={getNavButtonClass("saved-setups")}
              >
                My Setups
              </button>
            </div>

            {/* Quick Tools */}
            <div className="flex items-center space-x-3">
              <Link to="/gearbox">
                <button className="group p-3 bg-white rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                  <Gauge className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
                </button>
              </Link>
              <Link to="/suspension">
                <button className="group p-3 bg-white rounded-xl border border-gray-200 hover:border-red-500 hover:shadow-lg transition-all duration-300">
                  <Wrench className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-500 ease-in-out">
          {activeSection === "overview" && renderOverview()}
          {activeSection === "new-setup" && renderNewSetup()}
          {activeSection === "saved-setups" && renderSavedSetups()}
        </div>
      </div>
    </div>
  );
};
