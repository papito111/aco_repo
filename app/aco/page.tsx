"use client";

import { useEffect, useState } from "react";
import AntColony from "../utils/antColony";

const ACOPage = () => {
  const [result, setResult] = useState({ bestPath: [], bestDistance: 0 });

  useEffect(() => {
    const cities = JSON.parse(sessionStorage.getItem("cities") || "[]");
    const parameters = JSON.parse(sessionStorage.getItem("parameters") || "{}");

    if (cities.length > 0 && Object.keys(parameters).length > 0) {
      const colony = new AntColony(cities, parameters.numAnts);
      colony.alpha = parameters.alpha;
      colony.beta = parameters.beta;
      colony.rho = parameters.rho;

      const output = colony.run(parameters.iterations);
      setResult(output);
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">ACO Results</h1>
      <p>Best Distance: {result.bestDistance}</p>
      <p>Best Path: {result.bestPath.map((city) => city.name).join(" → ")}</p>
    </div>
  );
};

export default ACOPage;
