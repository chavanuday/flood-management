const express = require('express');
const app = express();
const port = 3001;

let cities = [
  { id: 1, name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { id: 2, name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { id: 3, name: 'Nagpur', lat: 21.1458, lng: 79.0882 },
  { id: 4, name: 'Nashik', lat: 19.9975, lng: 73.7898 },
  { id: 5, name: 'Aurangabad', lat: 19.8762, lng: 75.3433 },
];

// Function to generate random flood data with changing water level
const getFloodData = (cityId) => {
  const waterLevel = Math.floor(Math.random() * 100); // Random water level between 0 and 100
  let floodStatus = 'Safe';

  if (waterLevel > 70) floodStatus = 'Flood';
  else if (waterLevel > 30) floodStatus = 'Warning';

  return { waterLevel, floodStatus };
};

// Endpoint to get flood data for a city
app.get('/api/city/:id/flood-data', (req, res) => {
  const cityId = parseInt(req.params.id);
  const city = cities.find(c => c.id === cityId);

  if (city) {
    const floodData = getFloodData(cityId);
    res.json({
      ...city,
      waterLevel: floodData.waterLevel,
      floodStatus: floodData.floodStatus
    });
  } else {
    res.status(404).send('City not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
