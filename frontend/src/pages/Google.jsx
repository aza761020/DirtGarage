import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
const Google = () => {
    const [lat, setLat] = useState("");  // State to store latitude
    const [lng, setLng] = useState("");  // State to store longitude
    const [address, setAddress] = useState("");  // State to store the returned address
  
    const GOOGLE_API_KEY = "AIzaSyBPKhp7PCCtKUfxR_FDZVqTk8xIK96lVPo"; // Replace with your actual Google API key
  
    const handleGeocode = async () => {
      if (lat && lng) {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        if (data.status === "OK") {
          setAddress(data.results[0].formatted_address);
        } else {
          setAddress("Unable to retrieve address.");
        }
      } else {
        alert("Please enter both latitude and longitude.");
      }
    };
  
    return (
      <div style={{ padding: "20px" }}>
        <h1>Reverse Geocoding</h1>
        <div>
          <label>Latitude: </label>
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Enter Latitude"
          />
        </div>
        <div>
          <label>Longitude: </label>
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="Enter Longitude"
          />
        </div>
        <button onClick={handleGeocode}>Get Address</button>
        {address && (
          <div style={{ marginTop: "20px" }}>
            <h2>Address:</h2>
            <p>{address}</p>
          </div>
        )}
      </div>
    );
}

export default Google
