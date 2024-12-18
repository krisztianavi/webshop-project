import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import { CartProvider } from './context/CartCon';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <CartProvider> 
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
