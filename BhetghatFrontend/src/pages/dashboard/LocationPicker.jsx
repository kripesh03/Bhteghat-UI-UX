// components/LocationPicker.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://www.flaticon.com/free-icons/location',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
};

const LocationPicker = ({ value, onChange }) => {
  const [position, setPosition] = useState(value || null);
  const [locationName, setLocationName] = useState('');
  const [search, setSearch] = useState('');

  // Reverse geocoding to get location name from coordinates
  useEffect(() => {
    if (position) {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`)
        .then((res) => res.json())
        .then((data) => {
          setLocationName(data.display_name);
          onChange({ ...position, name: data.display_name });
        });
    }
  }, [position]);

  // Forward geocoding to get coordinates from location name
  const handleSearch = () => {
    if (search.trim() === '') return;
    fetch(`https://nominatim.openstreetmap.org/search?q=${search}&format=json&limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const loc = data[0];
          setPosition({ lat: parseFloat(loc.lat), lng: parseFloat(loc.lon) });
        }
      });
  };

  return (
    <div>
      <div className="flex mb-2 gap-2">
        <input
          type="text"
          placeholder="Search location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded-md w-full text-sm"
        />
        <button type="button" onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
          Search
        </button>
      </div>

      <div className="h-64 mb-2">
        <MapContainer center={[27.7, 85.3]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>

      {locationName && (
        <p className="text-xs text-gray-500 mt-1">
          Selected: <strong>{locationName}</strong>
        </p>
      )}
    </div>
  );
};

export default LocationPicker;
