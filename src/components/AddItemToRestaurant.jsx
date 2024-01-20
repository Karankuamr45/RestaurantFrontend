// AddItemToRestaurant.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ItemList from './ItemsList'; // Import the ItemList component

const AddItemToRestaurant = () => {
  const { restaurantId } = useParams();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`https://restaurantbackend-7nng.onrender.com/categoriesAndItems/${restaurantId}`);
        const normalizedCategories = response?.data?.categories.map(category => ({
          ...category,
          category: category.category.toLowerCase(), // Normalize to lowercase
        })) || [];
  
        setCategories(normalizedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [formData,categories]);

  const validateForm = () => {
    const newErrors = {};

    // Check if all fields are filled
    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }

    // Check if price is a positive number
    if (formData.price && (isNaN(formData.price) || formData.price < 0)) {
      newErrors.price = 'Price must be a positive number';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error message when the user starts typing in a field
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });

    // Clear error message when the user selects an image
    setErrors({
      ...errors,
      image: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data here if needed
    if (validateForm()) {
      const formDataObject = new FormData();
      formDataObject.append('name', formData.name);
      formDataObject.append('category', formData.category);
      formDataObject.append('description', formData.description);
      formDataObject.append('price', formData.price);
      formDataObject.append('image', formData.image);

      try {
        const response = await axios.post(`https://restaurantbackend-7nng.onrender.com/api/addItem/${restaurantId}`, formDataObject);

        if (response.status === 200) {
          console.log('Item added successfully:', response.data.message);
          setFormData({
            name: '',
            category: '',
            description: '',
            price: '',
            image: null,
          });
        } else {
          console.error('Error:', response.data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8 shadow-md p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-md">
        <h1 className="text-center text-4xl font-extrabold text-white py-2 m-4 ">Add Item</h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold mb-2">
            Item Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-black outline-none p-2 w-full rounded-md"
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="text-black outline-none p-2 w-full rounded-md"
          />
          {errors.category && <span className="text-red-500">{errors.category}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="text-black outline-none p-2 w-full rounded-md"
          ></textarea>
          {errors.description && <span className="text-red-500">{errors.description}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="text-black outline-none p-2 w-full rounded-md"
          />
          {errors.price && <span className="text-red-500">{errors.price}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-bold mb-2">
            Item Image
          </label>
          <input type="file" name="image" onChange={handleImageChange} className="mb-2" />
          {formData.image && (
            <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-32 h-32 object-cover mb-2" />
          )}
          {errors.image && <div className="text-red-500">{errors.image}</div>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Add Item
        </button>
      </form>

      <div className="p-4 w-full mx-auto mt-8 overflow-x-auto ">
      <h1 className="text-center text-4xl font-extrabold text-black py-2 m-4 ">Items</h1>
        {categories.map((category) => (
          <ItemList key={category.category} category={category.category} restaurantId={restaurantId} />
        ))}
      </div>
    </>
  );
};

export default AddItemToRestaurant;
