import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';import './App.css'
import AddRestaurant from './components/AddRestaurant'
import RestaurantList from './components/RestaurantList'
import AddItemToRestaurant from './components/AddItemToRestaurant';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/add-item/:restaurantId" element={<AddItemToRestaurant />} />
      </Routes>
    </Router>
  )
}

export default App
