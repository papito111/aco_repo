type City = {
    id: number
    x: number;
    y: number;
  };
  
  type PathResult = {
    bestPath: City[];
    bestDistance: number;
  };
  
  class AntColony {
    private cities: City[];
    private numAnts: number;
    private pheromones: number[][];
    private distances: number[][];
    evaporationRate: number;
    alpha: number; // Wpływ feromonów
    beta: number;  // Wpływ odległości
  
    constructor(cities: City[], numAnts: number) {
      this.cities = cities;
      this.numAnts = numAnts;
      this.alpha = 1;
      this.beta = 2;
      this.evaporationRate = 0.5;
  
      this.pheromones = this.initializePheromones();
      this.distances = this.calculateDistances();
    }
  
    private initializePheromones(): number[][] {
      const pheromones = Array(this.cities.length)
        .fill(0)
        .map(() => Array(this.cities.length).fill(1));
      return pheromones;
    }
  
    private calculateDistances(): number[][] {
      const distances: number[][] = [];
      for (let i = 0; i < this.cities.length; i++) {
        distances[i] = [];
        for (let j = 0; j < this.cities.length; j++) {
          if (i === j) {
            distances[i][j] = 0;
          } else {
            const dx = this.cities[i].x - this.cities[j].x;
            const dy = this.cities[i].y - this.cities[j].y;
            distances[i][j] = Math.sqrt(dx * dx + dy * dy);
          }
        }
      }
      return distances;
    }
  
    private calculateProbability(from: number, to: number): number {
      const pheromone = Math.pow(this.pheromones[from][to], this.alpha);
      const visibility = Math.pow(1 / this.distances[from][to], this.beta);
      return pheromone * visibility;
    }
  
    private selectNextCity(currentCity: number, visited: Set<number>): number {
      const probabilities = [];
      let sum = 0;
  
      for (let i = 0; i < this.cities.length; i++) {
        if (!visited.has(i)) {
          const prob = this.calculateProbability(currentCity, i);
          probabilities.push({ city: i, prob });
          sum += prob;
        }
      }
  
      const random = Math.random() * sum;
      let cumulative = 0;
  
      for (const { city, prob } of probabilities) {
        cumulative += prob;
        if (random <= cumulative) {
          return city;
        }
      }
  
      return probabilities[0].city; // W razie problemów wybierz pierwszy
    }
  
    private simulateAnt(): { path: number[]; distance: number } {
      const visited = new Set<number>();
      const path: number[] = [];
      let totalDistance = 0;
  
      let currentCity = Math.floor(Math.random() * this.cities.length);
      visited.add(currentCity);
      path.push(currentCity);
  
      while (visited.size < this.cities.length) {
        const nextCity = this.selectNextCity(currentCity, visited);
        totalDistance += this.distances[currentCity][nextCity];
        visited.add(nextCity);
        path.push(nextCity);
        currentCity = nextCity;
      }
  
      // Powrót do miasta startowego
      totalDistance += this.distances[currentCity][path[0]];
      path.push(path[0]);
  
      return { path, distance: totalDistance };
    }
  
    private updatePheromones(antsPaths: { path: number[]; distance: number }[]) {
      // Wyparowanie feromonów
      for (let i = 0; i < this.pheromones.length; i++) {
        for (let j = 0; j < this.pheromones[i].length; j++) {
          this.pheromones[i][j] *= 1 - this.evaporationRate;
        }
      }

      for (const { path, distance } of antsPaths) {
        const pheromoneDeposit = 1 / distance;
        for (let i = 0; i < path.length - 1; i++) {
          const from = path[i];
          const to = path[i + 1];
          this.pheromones[from][to] += pheromoneDeposit;
          this.pheromones[to][from] += pheromoneDeposit; // Symetryczna macierz
        }
      }
    }
  
    run(iterations: number): PathResult {
      let bestPath: City[] = [];
      let bestDistance = Infinity;
  
      for (let iter = 0; iter < iterations; iter++) {
        const antsPaths = [];
        for (let ant = 0; ant < this.numAnts; ant++) {
          const { path, distance } = this.simulateAnt();
          antsPaths.push({ path, distance });
  
          if (distance < bestDistance) {
            bestDistance = distance;
            bestPath = path.map((index) => this.cities[index]);
          }
        }
  
        this.updatePheromones(antsPaths);
      }
  
      return { bestPath, bestDistance };
    }
  }
  
  export default AntColony;
  