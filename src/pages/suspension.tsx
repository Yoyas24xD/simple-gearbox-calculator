import { Redirect } from "wouter";
import { useCarSetup } from "../hooks/use-car-setup";

export const Suspension = () => {
  const { setup, setSetup } = useCarSetup();

  if (!setup.torqueLine.length) {
    return <Redirect to="/" />;
  }
  return (
    <section className="flex flex-col gap-4">
      <h1>Suspension Settings</h1>
      <div>
        <label htmlFor="weight">Weight Distribution</label>
        <input
          type="text"
          id="weight"
          value={setup.weightDistribution.join(", ")}
          onChange={(e) =>
            setSetup({
              type: "UPDATE_WEIGHT_DISTRIBUTION",
              weightDistribution: e.target.value.split(", ").map(Number) as [
                number,
                number,
              ],
            })
          }
        />
      </div>
      <div>
        <label htmlFor="wheelWeight">Wheel Weight</label>
        <input
          type="number"
          id="wheelWeight"
          value={setup.wheelWeight}
          onChange={(e) =>
            setSetup({
              type: "UPDATE_WHEEL_WEIGHT",
              wheelWeight: Number(e.target.value),
            })
          }
        />
      </div>
      <div>
        <label htmlFor="weight">Total Weight</label>
        <input
          type="number"
          id="weight"
          value={setup.weight}
          onChange={(e) =>
            setSetup({
              type: "UPDATE_WEIGHT",
              weight: Number(e.target.value),
            })
          }
        />
      </div>
    </section>
  );
};
