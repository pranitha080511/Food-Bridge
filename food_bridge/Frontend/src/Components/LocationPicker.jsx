import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

// Map container size
const containerStyle = {
  width: "100%",
  height: "300px",
};

// Default map center (Chennai)
const defaultCenter = {
  lat: 13.0827,
  lng: 80.2707,
};

const LocationPicker = ({ onSelect }) => {
  const [marker, setMarker] = useState(defaultCenter);

  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // When user clicks on map
  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarker({ lat, lng });

    // Reverse Geocoding (get address)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );

    const data = await response.json();
    const address =
      data.results?.[0]?.formatted_address || "Selected Location";

    // Send data back to DonationForm
    onSelect({ address, lat, lng });
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="text-gray-400 text-center py-4">
        Loading map...
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-zinc-700">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={marker}
        zoom={14}
        onClick={handleMapClick}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <Marker position={marker} />
      </GoogleMap>
    </div>
  );
};

export default LocationPicker;
