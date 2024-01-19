import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddRestaurant from './AddRestaurant';
import { Link } from 'react-router-dom';
import SerialNumber from './SerialNumber';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://restaurantbackend-7nng.onrender.com/api/getRestaurants');
        setRestaurants(response?.data?.restaurants)
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRestaurants();
  }, [restaurants]); // Empty dependency array to ensure the effect runs only once


  const handleDelete = async (restaurantId) => {
    try {
      const response = await axios.delete(`https://restaurantbackend-7nng.onrender.com/api/deleteRestaurant/${restaurantId}`);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div>
        <AddRestaurant/>
    </div>
    <div className="max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4">All Restaurants</h2>
      {Array.isArray(restaurants) && restaurants.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
            <th className="py-2 px-4 border-b">Serial No.</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Rating</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant,index) => (
              <tr key={restaurant._id} className="hover:bg-gray-100">
                <SerialNumber index={index} />
                <td className="py-2 px-4 border-b">{restaurant.name}</td>
                <td className="py-2 px-4 border-b">{restaurant.description}</td>
                <td className="py-2 px-4 border-b">{restaurant.rating}</td>
                <td className="py-2 px-4 border-b">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="max-w-full h-auto rounded-lg"
                    style={{ maxWidth: '100px' }} 
                  />                </td>

<td className="py-2 px-4 border-b flex space-x-2">
  <button
    onClick={() => handleDelete(restaurant._id)}
    className="bg-red-500 text-white px-2 py-1 rounded flex-grow"
  >
    Delete
  </button>

  <Link
    to={`/add-item/${restaurant._id}`}
    className="bg-blue-500 text-white px-2 py-1 rounded flex-grow"
  >
    Add Item
  </Link>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No restaurants available.</p>
      )}
    </div>
    </>
  );
};

export default RestaurantList;
