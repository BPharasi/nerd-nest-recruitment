import { useState } from "react";

interface LocationFilterProps {
  onApply: (filters: { country: string; city: string; province: string; rangeFrom: number; rangeTo: number }) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({ onApply }) => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [rangeFrom, setRangeFrom] = useState(0);
  const [rangeTo, setRangeTo] = useState(100);
  const [rangeSlider, setRangeSlider] = useState(50); // Initial slider value

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          // Mock setting city/province (replace with reverse geocoding API call)
          setCity("Bloemfontein");
          setProvince("Free State");
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeSlider(parseInt(e.target.value));
    // Sync from/to with slider (example logic; adjust as needed)
    setRangeFrom(0);
    setRangeTo(parseInt(e.target.value));
  };

  const handleApply = () => {
    onApply({ country, city, province, rangeFrom, rangeTo });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Location</h2>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 mb-2"
      >
        <option>Country</option>
        <option>South Africa</option>
        <option>Other</option>
      </select>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-2"
      />
      <input
        type="text"
        placeholder="Province"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-2"
      />
      <button
        onClick={handleLocateMe}
        className="w-full bg-purple-600 text-white p-3 rounded-md flex items-center justify-center mb-2 hover:bg-purple-700"
      >
        Locate me <span className="ml-2">⦿</span>
      </button>
      <label className="block text-sm font-medium text-gray-700 mb-2">In a range (km)</label>
      <div className="flex space-x-4 mb-2">
        <input
          type="number"
          value={rangeFrom}
          onChange={(e) => setRangeFrom(parseInt(e.target.value) || 0)}
          placeholder="from 0 km"
          className="flex-1 p-3 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          value={rangeTo}
          onChange={(e) => setRangeTo(parseInt(e.target.value) || 0)}
          placeholder="to 0 km"
          className="flex-1 p-3 border border-gray-300 rounded-md"
        />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={rangeSlider}
        onChange={handleRangeChange}
        className="w-full mb-4"
      />
      <button
        onClick={handleApply}
        className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 flex items-center justify-center"
      >
        Apply filter changes →
      </button>
    </div>
  );
};

export default LocationFilter;