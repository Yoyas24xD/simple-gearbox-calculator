import { Input } from "../components/ui/input";
import { useCarSetup } from "../hooks/use-car-setup";

export const Suspension = () => {
  const { setup, setSetup } = useCarSetup();

  if (!setup.torqueLine.length) {
    console.warn(
      "TODO: Setup not loaded, redirect not apply during development",
    );
    // return <Redirect to="/" />;
  }
  return (
    <section className="flex flex-col gap-4">
      <h1>Suspension Settings</h1>
      <article className="flex gap-2">
        <div>
          <label htmlFor="weight-distribution-front">Front weight</label>
          <Input
            type="text"
            id="weight"
            value={setup.weightDistribution[0]}
            onChange={(e) =>
              setSetup({
                type: "UPDATE_WEIGHT_DISTRIBUTION",
                weightDistribution: [
                  Number(e.target.value),
                  setup.weightDistribution[1],
                ],
              })
            }
          />
        </div>
        <div>
          <label htmlFor="weight-distribution-rear">Rear weight</label>
          <Input
            type="text"
            id="weight-distribution-rear"
            value={setup.weightDistribution[1]}
            onChange={(e) =>
              setSetup({
                type: "UPDATE_WEIGHT_DISTRIBUTION",
                weightDistribution: [
                  setup.weightDistribution[0],
                  Number(e.target.value),
                ],
              })
            }
          />
        </div>
      </article>
      <div>
        <label htmlFor="wheelWeight">Wheel Weight</label>
        <Input
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
        <Input
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
