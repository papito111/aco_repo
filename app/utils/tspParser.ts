export const parseTSPFile = async (file: File) => {
  const text = await file.text();
  const lines = text.split("\n");

  const cities = [];
  let parsingCities = false;

  for (const line of lines) {
    if (line.trim() === "NODE_COORD_SECTION") {
      parsingCities = true;
      continue;
    }
    if (line.trim() === "EOF") {
      break;
    }
    if (parsingCities) {
      const parts = line.trim().split(/\s+/);
      if (parts.length === 3) {
        const [id, x, y] = parts;
        cities.push({ id: parseInt(id, 10), x: parseFloat(x), y: parseFloat(y) });
      }
    }
  }

  return cities;
};
