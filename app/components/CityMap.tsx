"use client";

import React from "react";

type City = {
  id: number;
  x: number;
  y: number;
};

type CityMapProps = {
  cities: City[];
  bestPath: number[];
};

const CityMap: React.FC<CityMapProps> = ({ cities, bestPath }) => {
  if (cities.length === 0) return <p>No cities available.</p>;

  const minX = Math.min(...cities.map(city => city.x));
  const maxX = Math.max(...cities.map(city => city.x));
  const minY = Math.min(...cities.map(city => city.y));
  const maxY = Math.max(...cities.map(city => city.y));

  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const scaleX = (x: number) => ((x - minX) / rangeX) * 100;
  const scaleY = (y: number) => (1 - (y - minY) / rangeY) * 100;

  const adjustForRadius = (x1: number, y1: number, x2: number, y2: number, radius: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius * 2) return { x1, y1, x2, y2 }; 
    const ratio = (dist - radius) / dist;
    return {
      x1: x1 + dx * (radius / dist),
      y1: y1 + dy * (radius / dist),
      x2: x1 + dx * ratio,
      y2: y1 + dy * ratio,
    };
  };

  return (
    <div className="relative w-11/12 h-[770px] border-4 border-gray-700 bg-gray-900 my-10 rounded-lg shadow-lg" style={{ backgroundImage: "linear-gradient(90deg, #444 1px, transparent 1px), linear-gradient(180deg, #444 1px, transparent 1px)", backgroundSize: "20px 20px" }}>  
  
      {cities.map(city => (
        <div
          key={city.id}
          className="absolute rounded-full z-10 opacity-80 bg-blue-500 bg-opacity-80 text-white font-extralight text-xs flex items-center justify-center"
          style={{
            left: `${scaleX(city.x)}%`,
            top: `${scaleY(city.y)}%`,
            width: "20px",
            height: "20px",
            transform: "translate(-50%, -50%)",
          }}
        >
          {city.id}
        </div>
      ))}

      {bestPath.length > 1 && (
        <svg className="absolute w-full h-full">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="violet" />
            </marker>
          </defs>
          {bestPath.map((cityIndex, idx) => {
            const currentCity = cities.find(c => c.id === cityIndex);
            const nextCity = cities.find(c => c.id === bestPath[(idx + 1) % bestPath.length]);

            if (!currentCity || !nextCity) return null;

            const { x1, y1, x2, y2 } = adjustForRadius(
              scaleX(currentCity.x),
              scaleY(currentCity.y),
              scaleX(nextCity.x),
              scaleY(nextCity.y),
              3
            );

            return (
              <line
                key={`${currentCity.id}-${nextCity.id}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="violet"
                strokeWidth={1.4}
                markerEnd="url(#arrowhead)"
              />
            );
          })}
        </svg>
      )}
    </div>
  );
};

export default CityMap;