"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseTSPFile } from "./utils/tspParser";

const HomePage = () => {
  const [cities, setCities] = useState<{ id: number; x: number; y: number }[]>([]);
  const [parameters, setParameters] = useState({
    alpha: 2,
    beta: 2,
    rho: 0.5,
    numAnts: 10,
    iterations: 100

  });
  const router = useRouter();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>)=>{
    if(event.target.files?.[0]) {
      const file = event.target.files[0];
      const parsedCities = await parseTSPFile(file);
      setCities(parsedCities);
    }
  }

  const handleParameterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setParameters((prevParameters) => ({
    ...prevParameters, [name]: parseFloat(value),
    }));
  };

  const handleStart = () => {
    sessionStorage.setItem("cities",JSON.stringify(cities));
    sessionStorage.setItem("parameters",JSON.stringify(parameters))
    router.push("/aco");
  };

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen  bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 blink">Algorytm Mrówkowy</h1>
      <div className="bg-gray-800 p-3 rounded-lg shadow-lg w-full max-w-md">
        <input 
          type = "file"
          accept=".tsp"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:hover:bg-violet-900   file:text-gray-300 file:bg-violet-700"
        
        />
        

        <div className="mb-4">
          <label className="block text-sm font-semibold mt-1 text-center  text-gray-300 mb-1">Alpha:</label>
          <input
            type="number"
            name="alpha"
            value={parameters.alpha}
            onChange={handleParameterChange}
            className="w-full p-2 rounded bg-gray-700 text-gray-300"
            >
          </input>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-center  text-gray-300 mb-1">Beta:</label>
          <input
            type="number"
            name="beta"
            value={parameters.beta}
            onChange={handleParameterChange}
            className="w-full p-2 rounded bg-gray-700 text-gray-300"
            >
          </input>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-center  text-gray-300 mb-1">Rho:</label>
          <input
            type="number"
            name="rho"
            value={parameters.rho}
            onChange={handleParameterChange}
            className="w-full p-2 rounded bg-gray-700 text-gray-300"
            >
          </input>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-center  text-gray-300 mb-1">Liczba mrówek:</label>
          <input
            type="number"
            name="numAnts"
            value={parameters.numAnts}
            onChange={handleParameterChange}
            className="w-full p-2 rounded bg-gray-700 text-gray-300"
            >
          </input>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-center  text-gray-300 mb-1">Ilość iteracji:</label>
          <input
            type="number"
            name="iterations"
            value={parameters.iterations}
            onChange={handleParameterChange}
            className="w-full p-2 rounded bg-gray-700 text-gray-300"
            >
          </input>
        </div>
        <button
         onClick={handleStart}
         className="w-full bg-violet-700 hover:bg-violet-900 hover:text-gray-300 font-bold py-3 my-1 px-4 rounded-lg">
          Start Optymalizacji
         </button>

      </div>
    </div>  

  )

}
export default HomePage;