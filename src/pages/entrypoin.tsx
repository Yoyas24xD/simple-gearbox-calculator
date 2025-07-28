import { Link } from "wouter";

export const Entrypoint = () => {
  // TODO: Implement the main page logic and components
  // This version is only for debug
  console.warn("TODO: Implement the main page logic and components");
  return (
    <section>
      <h1>Welcome to the CarX Tools</h1>
      <Link to="/gearbox">Go to Gearbox</Link>
      <Link to="/suspension">Go to Suspension</Link>
    </section>
  );
};
