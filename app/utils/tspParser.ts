// src/utils/tspParser.ts
export interface City {
    id: number;
    x: number;
    y: number;
  }

export const parseTSPFile = (fileContent: string): City[] => {
  const lines = fileContent.split('\n');
  const cities: City[] = [];

  let isNodeSection = false;

  for (let line of lines) {
    line = line.trim();

    if (line === 'NODE_COORD_SECTION') {
      isNodeSection = true;
      continue;
    }

    if (line === 'EOF') {
      break;
    }

    if (isNodeSection && line) {
      const [id, x, y] = line.split(' ').map(val => parseFloat(val));
      cities.push({ id, x, y });
    }
  }

  return cities;
};
