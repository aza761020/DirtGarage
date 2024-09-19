import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Location = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude);
          console.log(longitude);
          
          

          // Make a request to the OpenWeatherMap API
         const API_KEY = "a389e43927289adc51f9957740218329"; // Replace with your OpenWeatherMap API key
        //  const gApi_key = "AIzaSyBPKhp7PCCtKUfxR_FDZVqTk8xIK96lVPo" 
         const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
         // const googleapi =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${gApi_key}`;

          try {
            const response = await axios.get(apiUrl);
            const result = response.data;

            if (result.length > 0) {
              // Extract and set the location name (e.g., city, country, etc.)
              const obj1= result[0];
              console.log(result);
              

              const location= `${obj1.name},${obj1.state},${obj1.country}${obj1.local_names.en}`;
              setLocation(location);
            } else {
              setError("No results found for this location.");
            }
          } catch (err) {
            setError("Failed to fetch location.");
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h2>Your Location</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : location ? (
        <p>Location: {location}</p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default Location;
