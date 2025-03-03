import { useState, useEffect } from "react";
import axios from "axios";

const Tolls = () => {
  const [tolls, setTolls] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTolls = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tolls");
        setTolls(response.data);
      } catch (error) {
        console.error("Error fetching tolls:", error);
      }
    };
    fetchTolls();
  }, []);

  // Filter tolls based on search input
  const filteredTolls = tolls.filter((toll) =>
    toll.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Nearby Tolls</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search toll by name..."
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Toll List */}
      {filteredTolls.length > 0 ? (
        <ul className="space-y-4">
          {filteredTolls.map((toll) => (
            <li key={toll._id} className="p-4 border rounded shadow">
              <h2 className="text-lg font-semibold">{toll.name}</h2>
              <p>Price: ₹{toll.price}</p>
              <p>Location: {toll.location.latitude}, {toll.location.longitude}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No tolls found.</p>
      )}
    </div>
  );
};

export default Tolls;
