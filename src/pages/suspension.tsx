import { Input } from "../components/ui/input";
import { useCarSetup } from "../hooks/use-car-setup";

const RIDE_FREQUENCY = 3; // Hz
const DAMPING_RATIO = 1;

export const Suspension = () => {
  const { setup, setSetup } = useCarSetup();

  // Front suspension calculations
  const frontWeight = (setup.weightDistribution[0] / 100) * setup.weight;
  const frontSprungMass = frontWeight / 2 - setup.wheelWeight;
  const frontSpringStiffness =
    4 * Math.PI ** 2 * frontSprungMass * RIDE_FREQUENCY ** 2;
  const frontDampingCoefficient =
    2 *
    DAMPING_RATIO *
    Math.sqrt(frontSpringStiffness * frontSprungMass) *
    DAMPING_RATIO;

  // Rear suspension calculations
  const rearWeight = (setup.weightDistribution[1] / 100) * setup.weight;
  const rearSprungMass = rearWeight / 2 - setup.wheelWeight;
  const rearSpringStiffness =
    4 * Math.PI ** 2 * rearSprungMass * RIDE_FREQUENCY ** 2;
  const rearDampingCoefficient =
    2 *
    DAMPING_RATIO *
    Math.sqrt(rearSpringStiffness * rearSprungMass) *
    DAMPING_RATIO;

  if (!setup.torqueLine.length) {
    console.warn(
      "TODO: Setup not loaded, redirect not apply during development",
    );
    // return <Redirect to="/" />;
  }
  return (
    <section className="gap-4">
      <h1>Suspension Settings</h1>
      <section className="flex gap-2">
        <div>
          <label htmlFor="weight-distribution-front">Front weight</label>
          <Input
            type="number"
            min={0}
            max={100}
            id="weight"
            value={setup.weightDistribution[0]}
            onChange={(e) => {
              const value = Number(e.target.value);
              setSetup({
                type: "UPDATE_WEIGHT_DISTRIBUTION",
                weightDistribution: [value, 100 - value],
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="weight-distribution-rear">Rear weight</label>
          <Input
            min={0}
            max={100}
            type="number"
            id="weight-distribution-rear"
            value={setup.weightDistribution[1]}
            onChange={(e) => {
              const value = Number(e.target.value);

              setSetup({
                type: "UPDATE_WEIGHT_DISTRIBUTION",
                weightDistribution: [100 - value, value],
              });
            }}
          />
        </div>
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
      <h2>Calculated data</h2>
      <section className="flex gap-2">
        <div>
          <label htmlFor="front-spring-stiffness">Front Spring Stiffness</label>
          <Input
            type="number"
            id="front-spring-stiffness"
            value={(frontSpringStiffness / 1000).toFixed(2)}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="rear-spring-stiffness">Rear Spring Stiffness</label>
          <Input
            type="number"
            id="rear-spring-stiffness"
            value={(rearSpringStiffness / 1000).toFixed(2)}
            readOnly
          />
        </div>
      </section>
      <section>
        <h3>Front Dampers</h3>
        <article className="flex gap-4">
          <div>
            <label htmlFor="front-bump">Bump</label>
            <Input
              type="number"
              id="front-bump"
              value={Math.trunc((frontDampingCoefficient * 2) / 3)}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="front-fast-bump">Fast bump</label>
            <Input
              type="number"
              id="front-fast-bump"
              value={Math.trunc((frontDampingCoefficient * 1) / 3)}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="front-rebound">Fast rebound</label>
            <Input
              type="number"
              id="front-rebound"
              value={Math.trunc((frontDampingCoefficient * 3) / 2)}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="front-fast-rebound">Fast rebound</label>
            <Input
              type="number"
              id="front-fast-rebound"
              value={Math.trunc((frontDampingCoefficient * 3) / 4)}
              readOnly
            />
          </div>
        </article>
        <h3>Rear Dampers</h3>
        <article className="flex gap-4">
          <div>
            <label htmlFor="rear-bump">Bump</label>
            <Input
              type="number"
              id="rear-bump"
              value={Math.trunc((rearDampingCoefficient * 2) / 3)}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="rear-fast-bump">Fast bump</label>
            <Input
              type="number"
              id="rear-fast-bump"
              value={Math.trunc((rearDampingCoefficient * 1) / 3)}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="rear-rebound">Fast rebound</label>
            <Input
              type="number"
              id="rear-rebound"
              value={Math.trunc((rearDampingCoefficient * 3) / 2)}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="rear-fast-rebound">Fast rebound</label>
            <Input
              type="number"
              id="rear-fast-rebound"
              value={Math.trunc((rearDampingCoefficient * 3) / 4)}
              readOnly
            />
          </div>
        </article>
      </section>
    </section>
  );
};
