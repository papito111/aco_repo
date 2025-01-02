"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseTSPFile } from "../utils/tspParser";

const HomePage = () => {
  const [cities, setCities] = useState([]);
  const [parameters, setParameters] = useState({
    alpha: 1,
    beta: 2,
    rho: 0.5,
    numAnts: 10,
    iterations: 100,
  });

  const router = useRouter();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const parsedCities = await parseTSPFile(file);
      setCities(parsedCities);
    }
  };

  const handleStart = () => {
    sessionStorage.setItem("cities", JSON.stringify(cities));
    sessionStorage.setItem("parameters", JSON.stringify(parameters));
    router.push("/aco");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Ant Colony Optimization</h1>
      <input type="file" accept=".tsp" onChange={handleFileUpload} />
      <div className="flex flex-col gap-2 mt-4">
        <label>
          Alpha:
          <input
            type="number"
            value={parameters.alpha}
            onChange={(e) =>
              setParameters({ ...parameters, alpha: parseFloat(e.target.value) })
            }
          />
        </label>
        <label>
          Beta:
          <input
            type="number"
            value={parameters.beta}
            onChange={(e) =>
              setParameters({ ...parameters, beta: parseFloat(e.target.value) })
            }
          />
        </label>
        <label>
          Rho:
          <input
            type="number"
            value={parameters.rho}
            onChange={(e) =>
              setParameters({ ...parameters, rho: parseFloat(e.target.value) })
            }
          />
        </label>
        <label>
          Number of Ants:
          <input
            type="number"
            value={parameters.numAnts}
            onChange={(e) =>
              setParameters({ ...parameters, numAnts: parseInt(e.target.value, 10) })
            }
          />
        </label>
        <label>
          Iterations:
          <input
            type="number"
            value={parameters.iterations}
            onChange={(e) =>
              setParameters({ ...parameters, iterations: parseInt(e.target.value, 10) })
            }
          />
        </label>
      </div>
      <button onClick={handleStart} className="mt-4 bg-blue-500 text-white px-4 py-2">
        Start ACO
      </button>
    </div>
  );
};

export default HomePage;
