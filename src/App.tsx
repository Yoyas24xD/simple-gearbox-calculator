import { InitialDataModal } from "./components/initial-data-modal";
import { useHpLine } from "./hooks/use-hp-line";
import { useInitialData } from "./hooks/use-initial-data";

export const App = () => {
  const { data } = useInitialData();
  const hpLine = useHpLine(data);

  const maxHpTorque = data[hpLine.indexOf(Math.max(...hpLine))];
  console.log(maxHpTorque);

  return (
    <main>
      <InitialDataModal />
    </main>
  );
};
