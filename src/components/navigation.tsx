import { Gauge, Wrench } from "lucide-react";
import { Link, useLocation } from "wouter";

export const Navigation = () => {
  const [location, navigate] = useLocation();

  const getNavButtonClass = (section: string): string => {
    return `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
      location === section
        ? "bg-blue-500 text-white"
        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    }`;
  };

  return (
    <nav className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate("/")}
            className={getNavButtonClass("/")}
          >
            Home
          </button>
          <button
            onClick={() => navigate("/new-setup")}
            className={getNavButtonClass("/new-setup")}
          >
            New Setup
          </button>
          <button
            onClick={() => navigate("/saved-setups")}
            className={getNavButtonClass("/saved-setups")}
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
    </nav>
  );
};
