import { FileText, Settings } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { ConfirmModal } from "../components/confirm-modal";
import { Button } from "../components/ui/button";
import { useCarSetup } from "../hooks/use-car-setup";
import { useSetups } from "../hooks/use-setups";

// const savedSetups = [
//   {
//     id: 1,
//     name: "My Drift Setup #1",
//     car: "Nissan 370Z",
//     lastModified: "2 days ago",
//     category: "Drift",
//   },
//   {
//     id: 2,
//     name: "Racing Setup v2",
//     car: "BMW M3",
//     lastModified: "1 week ago",
//     category: "Racing",
//   },
//   {
//     id: 3,
//     name: "Experimental",
//     car: "Toyota Supra",
//     lastModified: "3 days ago",
//     category: "Drag",
//   },
// ];

export const SavedSetups = () => {
  const [, navigate] = useLocation();
  const { deleteSetup, loadSetup } = useCarSetup();
  const [setupToDelete, setSetupToDelete] = useState<string | null>(null);
  const setups = useSetups();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Saved Setups</h2>
        <Button flavor="ghost" onClick={() => navigate("/")}>
          ← Back
        </Button>
      </div>
      <div className="space-y-4">
        {setups.map((setup) => (
          <div
            key={setup}
            className="group bg-white rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {setup}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{setup}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded text-xs`}>{setup}</span>
                    <span>•</span>
                    <span>Modified: TODO</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  flavor="warning"
                  size="sm"
                  onClick={() => setSetupToDelete(setup)}
                >
                  Delete
                </Button>
                <Button
                  flavor="success"
                  size="sm"
                  onClick={() => loadSetup(setup)}
                >
                  Open
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {setups.length === 0 && (
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
            onClick={() => navigate("/new-setup")} // TODO: Implement setup creation logic
          >
            Create First Setup
          </Button>
        </div>
      )}
      <ConfirmModal
        title="Delete Setup"
        message={`Are you sure you want to delete the setup "${setupToDelete}"? This action cannot be undone.`}
        open={setupToDelete !== null}
        onCancel={() => setSetupToDelete(null)}
        onConfirm={() => {
          if (setupToDelete) {
            deleteSetup(setupToDelete);
            setSetupToDelete(null);
          }
        }}
      />
    </div>
  );
};
