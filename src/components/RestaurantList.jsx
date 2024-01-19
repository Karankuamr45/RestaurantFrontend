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
  <h2 className="text-3xl text-center font-bold mb-4">All Restaurants</h2>
  {Array.isArray(restaurants) && restaurants.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Serial No.</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Rating</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Delete</th>
            <th className="py-2 px-4 border-b">Add Item</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, index) => (
            <tr key={restaurant._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{restaurant.name}</td>
              <td className="py-2 px-4 border-b">{restaurant.description}</td>
              <td className="py-2 px-4 border-b">{restaurant.rating}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="min-w-20 min-h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                />
              </td>

              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(restaurant._id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                >
                  Delete
                </button>
                </td>
                <td className="py-2 px-4 border-b min-w-36">
                <Link
                  to={`/add-item/${restaurant._id}`}
                  className="bg-gradient-to-r  from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                >
                  Add Item
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-gray-500">No restaurants available.</p>
  )}
</div>


    </>
  );
};

export default RestaurantList;
