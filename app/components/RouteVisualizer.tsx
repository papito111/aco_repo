import React, { useEffect, useRef, useState } from "react";

type City = {
  id: number;
  x: number;
  y: number;
};

type PathResult = {
  bestPath: City[];
  bestDistance: number;
};

interface RouteVisualizerProps {
  cities: City[];
  history: PathResult[];
}

const RouteVisualizer: React.FC<RouteVisualizerProps> = ({ cities, history }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentIteration, setCurrentIteration] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (path: City[]) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rysuj miasta
      for (const city of cities) {
        ctx.beginPath();
        ctx.arc(city.x / 2, city.y / 2, 5, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
      }

      // Rysuj trasę
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;

      for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];
        ctx.beginPath();
        ctx.moveTo(from.x / 2, from.y / 2);
        ctx.lineTo(to.x / 2, to.y / 2);
        ctx.stroke();
      }

      // Zamknij trasę (ostatni do pierwszego)
      const first = path[0];
      const last = path[path.length - 1];
      ctx.beginPath();
      ctx.moveTo(last.x / 2, last.y / 2);
      ctx.lineTo(first.x / 2, first.y / 2);
      ctx.stroke();
    };

    draw(history[currentIteration]?.bestPath || []);
  }, [currentIteration, cities, history]);

  // Obsługa animacji
  useEffect(() => {
    if (history.length > 0) {
      const interval = setInterval(() => {
        setCurrentIteration((prev) =>
          prev < history.length - 1 ? prev + 1 : prev
        );
      }, 500); // Aktualizacja co 500ms
      return () => clearInterval(interval);
    }
  }, [history]);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={800}></canvas>
      <p>Iteracja: {currentIteration + 1} / {history.length}</p>
    </div>
  );
};

export default RouteVisualizer;
