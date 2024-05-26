import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [cityName, setCityName] = useState("Delhi,India");
  const [inputValue, setInputValue] = useState("");
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {  // Check if the input is not just whitespace
      setCityName(`${inputValue.trim()},India`); // Update cityName with the input value followed by ",India"
    }
    setInputValue("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=57c734ae9f7049508a5165520242505&q=${cityName}&aqi=no`);
        console.log(response.data); 
        setTemp(response.data.current.temp_c); 
        setWind(response.data.current.wind_kph);
        setHumidity(response.data.current.humidity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [cityName]);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-xl">Weather App</div>
            <div className="flex">
              <input
                type="text"
                className="w-48 p-2 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Enter location"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-lg bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{cityName}</h2>
            <p className="text-6xl font-bold">{temp}°C</p>
            <p className="text-xl">Weather Description</p>
            <div className="flex justify-center mt-4">
              <div className="p-4 bg-blue-200 rounded-lg m-2">
                <p className="text-lg font-bold mb-2">Temperature</p>
                <p className="text-2xl font-bold">{temp}°C</p>
              </div>
              <div className="p-4 bg-blue-200 rounded-lg m-2">
                <p className="text-lg font-bold mb-2">Wind Speed</p>
                <p className="text-2xl font-bold">{wind} kph</p>
              </div>
              <div className="p-4 bg-blue-200 rounded-lg m-2">
                <p className="text-lg font-bold mb-2">Humidity</p>
                <p className="text-2xl font-bold">{humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
