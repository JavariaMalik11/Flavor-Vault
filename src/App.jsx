import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './features/products/ProductList';
import AddProduct from './features/products/AddProduct';
import EditProduct from './features/products/EditProduct';
import LoginSignup from './features/auth/LoginSignup';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/auth" element={<LoginSignup />} />
    </Routes>
  );
};

export default App;
