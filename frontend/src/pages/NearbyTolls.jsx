import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const NearbyTolls = () => {
  const [tolls, setTolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedToll, setSelectedToll] = useState(null);

  useEffect(() => {
    const fetchTolls = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tolls");
        setTolls(response.data);
      } catch (error) {
        console.error("Error fetching tolls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTolls();

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Nearby Tolls</h2>
      {loading ? (
        <p>Loading tolls...</p>
      ) : (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || { lat: 28.6139, lng: 77.209 }}
            zoom={userLocation ? 10 : 5}
          >
            {tolls.map((toll) => (
              <Marker
                key={toll._id}
                position={{
                  lat: toll.location.latitude,
                  lng: toll.location.longitude,
                }}
                onClick={() => setSelectedToll(toll)}
              />
            ))}

            {/* User Location Marker */}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            )}

            {/* Show Toll Info */}
            {selectedToll && (
              <InfoWindow
                position={{
                  lat: selectedToll.location.latitude,
                  lng: selectedToll.location.longitude,
                }}
                onCloseClick={() => setSelectedToll(null)}
              >
                <div>
                  <h3 className="font-bold">{selectedToll.name}</h3>
                  <p>Price: ₹{selectedToll.price}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default NearbyTolls;
