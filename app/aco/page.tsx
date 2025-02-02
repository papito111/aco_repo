"use client";

import { useEffect, useState } from "react";
import AntColony from "../utils/antColony";
import CityMap from "../components/CityMap"; 

type City = {
  id: number;
  x: number;
  y: number;
};

type PathResult = {
  bestPath: City[];
  bestDistance: number;
};


const ACOPage = () => {
  const [result, setResult] = useState<PathResult>({ bestPath: [], bestDistance: 0 });
  const [cities, setCities] = useState<{ id: number; x: number; y: number }[]>([]); 

  useEffect(() => {
    const cities = JSON.parse(sessionStorage.getItem("cities") || "[]");
    const parameters = JSON.parse(sessionStorage.getItem("parameters") || "{}");

    if (cities.length > 0 && Object.keys(parameters).length > 0) {
      const colony = new AntColony(cities, parameters.numAnts);
      colony.alpha = parameters.alpha;
      colony.beta = parameters.beta;
      colony.evaporationRate = parameters.rho;

      const output = colony.run(parameters.iterations);
      setResult(output);
      setCities(cities); 
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl mb-2 font-bold">Trasa mrowek</h1>
      <p className="text-xl mb-2">Najkrotsza trasa: {result.bestDistance.toFixed()} km</p>
      <p className="text-xl text-center">Najlepsza trasa: {result.bestPath.map((city) => city.id).join(" → ")}</p>

     
      <CityMap cities={cities} bestPath={result.bestPath.map((city) => city.id)} />
    </div>
  );
};

export default ACOPage;