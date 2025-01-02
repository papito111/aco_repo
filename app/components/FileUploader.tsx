// src/components/FileUploader.tsx
import React, { useState } from 'react';
import { parseTSPFile } from '../utils/tspParser';
import { City } from '../utils/tspParser';

interface FileUploaderProps {
  fileName: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ fileName }) => {
  const [cities, setCities] = useState<City[] | null>(null);

  // Ładowanie pliku
  const loadFile = async () => {
    try {
      const response = await fetch(`/tspFiles/${fileName}`);
      const text = await response.text();
      const parsedCities = parseTSPFile(text);
      setCities(parsedCities);
    } catch (error) {
      console.error('Error loading file:', error);
    }
  };

  return (
    <div>
      <button onClick={loadFile}>Załaduj {fileName}</button>
      {cities && (
        <div>
          <h3>Cities:</h3>
          <ul>
            {cities.map(city => (
              <li key={city.id}>
                City {city.id}: ({city.x}, {city.y})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
