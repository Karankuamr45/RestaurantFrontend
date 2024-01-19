// AddItemToRestaurant.jsx
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddItemToRestaurant = () => {
  const { restaurantId } = useParams();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
   // Inside the fetchCategories useEffect in AddItemToRestaurant.jsx
const fetchCategories = async () => {
    try {
      const response = await axios.get(`https://restaurantbackend-7nng.onrender.com/categoriesAndItems/${restaurantId}`);
      setCategories(response?.data?.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  

    fetchCategories();
  }, [restaurantId]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, category, description, price, image } = formData;

    // Validate form data here if needed

    const formDataObject = new FormData();
    formDataObject.append('name', name);
    formDataObject.append('category', category);
    formDataObject.append('description', description);
    formDataObject.append('price', price);
    formDataObject.append('image', image);

    try {
      // Send the form data to your backend API using Axios
      const response = await axios.post(`https://restaurantbackend-7nng.onrender.com/api/addItem/${restaurantId}`, formDataObject);

      if (response.status === 200) {
        // Handle a successful response, e.g., show a success message
        console.log('Item added successfully:', response.data.message);
        // Reset the form
        setFormData({
          name: '',
          category: '',
          description: '',
          price: '',
          image: null,
        });
      } else {
        // Handle error responses
        console.error('Error:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle fetch error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8">
       <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Item Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border-2 border-gray-400 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border-2 border-gray-400 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border-2 border-gray-400 p-2 w-full"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border-2 border-gray-400 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
          Item Image
        </label>
        <input type="file" name="image" onChange={handleImageChange} className="mb-2" />
        {formData.image && (
          <img src={URL.createObjectURL(formData.image)} alt="Preview" className="max-w-full h-auto mb-2" />
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Item
      </button>


         {/* Display categories and items in tables */}
      <div className="max-w-4xl mx-auto mt-8">
        {categories.map((category) => (
          <div key={category.category} className="mb-8">
            <h3 className="text-2xl font-bold mb-4">{category.category}</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Item Name</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Image</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.description}</td>
                    <td className="py-2 px-4 border-b">${item.price}</td>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full h-auto rounded-lg"
                        style={{ maxWidth: '100px' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>



    </form>
  );
};

export default AddItemToRestaurant;
