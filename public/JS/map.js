// Initialize map once
const map = L.map('map').setView([20.6584, 85.5965], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add geocoder control (optional)
if (L.Control.Geocoder) {
  L.Control.geocoder().addTo(map);
}

// Add marker if listingData has coordinates
if (listingData && listingData.geometry && listingData.geometry.coordinates) {
  // GeoJSON coordinates are [longitude, latitude]. Leaflet expects [latitude, longitude].
  const lat = listingData.geometry.coordinates[1];
  const lon = listingData.geometry.coordinates[0];

  // Set map view to listingData coordinates
  map.setView([lat, lon], 13);

  // Add marker
  L.marker([lat, lon])
    .addTo(map)
    .bindPopup(listingData.location)
    .openPopup();

  var circle = L.circle([lat, lon], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(map);
}


