import React, { useState } from 'react';

const ParametersForm = () => {
  const [parameters, setParameters] = useState({
    ants: 25,
    evaporation: 0.8,
    alpha: 1.0,
    beta: 5.0,
    iterations: 200,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParameters((prev) => ({
      ...prev,
      [name]: name === 'ants' || name === 'iterations' ? parseInt(value) : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Parameters submitted:', parameters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold text-white">Parametry Algorytmu</h2>

      {/* Liczba mrówek */}
      <div>
        <label htmlFor="ants" className="block text-sm font-medium text-gray-300">
          Liczba mrówek
        </label>
        <input
          type="number"
          id="ants"
          name="ants"
          value={parameters.ants}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
        />
      </div>

      {/* Współczynnik parowania feromonów */}
      <div>
        <label htmlFor="evaporation" className="block text-sm font-medium text-gray-300">
          Wsp. parowania feromonów
        </label>
        <input
          type="number"
          step="0.1"
          id="evaporation"
          name="evaporation"
          value={parameters.evaporation}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
        />
      </div>

      {/* Alpha */}
      <div>
        <label htmlFor="alpha" className="block text-sm font-medium text-gray-300">
          Alpha
        </label>
        <input
          type="number"
          step="0.1"
          id="alpha"
          name="alpha"
          value={parameters.alpha}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
        />
      </div>

      {/* Beta */}
      <div>
        <label htmlFor="beta" className="block text-sm font-medium text-gray-300">
          Beta
        </label>
        <input
          type="number"
          step="0.1"
          id="beta"
          name="beta"
          value={parameters.beta}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
        />
      </div>

      {/* Iteracje */}
      <div>
        <label htmlFor="iterations" className="block text-sm font-medium text-gray-300">
          Iteracje
        </label>
        <input
          type="number"
          id="iterations"
          name="iterations"
          value={parameters.iterations}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
        />
      </div>

      {/* Przyciski */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
        >
          Uruchom
        </button>
      </div>
    </form>
  );
};

export default ParametersForm;
