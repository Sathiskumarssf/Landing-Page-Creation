import React, { useState, useEffect } from 'react';

const Menu = () => {
  const [dishes, setDishes] = useState([]); // State to store dishes
  const [error, setError] = useState(null); // State to store errors
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    // Fetch data from the API
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json(); // Parse JSON response
        setDishes(data); // Update dishes state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchMenu();
  }, []);

  return (
    <div>
      <h2 className="text-4xl font-bold text-white mb-8">Our Menu</h2>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
          {dishes.map((dish, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200"
            >
              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="w-full h-64 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-2xl text-gray-800 font-bold lg:text-3xl">{dish.name}</h3>
              <p className="text-gray-700 text-lg lg:text-2xl">{dish.description}</p>
              <p className="  font-bold mt-2 text-orange-600">${dish.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;