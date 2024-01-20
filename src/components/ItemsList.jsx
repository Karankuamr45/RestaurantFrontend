// ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'; // Import the desired icons

const ItemList = ({ category, restaurantId }) => {
  const [items, setItems] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://restaurantbackend-7nng.onrender.com/categoriesAndItems/${restaurantId}`);
      const normalizedCategories = response?.data?.categories.map(cat => ({
        ...cat,
        category: cat.category.toLowerCase(), // Normalize to lowercase
      })) || [];

      const selectedCategory = normalizedCategories.find(cat => cat.category.toLowerCase() === category.toLowerCase());
      setItems(selectedCategory?.items || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
   

    fetchItems();
  }, [category, restaurantId,items]);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  const handleDelete = async (itemId) => {
    try {
      // Make API call to delete item
      await axios.delete(`https://restaurantbackend-7nng.onrender.com/${restaurantId}/${itemId}`);

      // Fetch and update items
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div key={category} className="mb-8 mx-auto max-w-lg">
      <div
        className="bg-gray-800 p-4 rounded-md text-white flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <h3 className="text-2xl font-bold">
          {category}
        </h3>
        <BsChevronRight
          className={`transform ${isActive ? 'rotate-90' : 'rotate-0'} transition-transform duration-300 text-white`}
        />
      </div>
      {isActive && (
        <table className="w-full mx-auto mt-4 rounded-b-md overflow-hidden">
          <thead>
            <tr>
              <th className="bg-gray-800 p-2 text-white">S.No</th>
              <th className="bg-gray-800 p-2 text-white">Item Name</th>
              <th className="bg-gray-800 p-2 text-white">Description</th>
              <th className="bg-gray-800 p-2 text-white">Price</th>
              <th className="bg-gray-800 p-2 text-white">Image</th>
              <th className="bg-gray-800 p-2 text-white">Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id} className="bg-gray-300">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2">${item.price}</td>
                <td className="p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td>
                <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white p-2 rounded">
                Delete Item
              </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ItemList;
