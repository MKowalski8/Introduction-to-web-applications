import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HelloWorld from './ex1/HelloWorld';
import ProductList from './ex2_4/ProductList';
import Home from './ex3/Home';
import Layout from './ex3/Layout';
import Logowanie from './ex5/Logowanie';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="HelloWorld" element={<HelloWorld />} />
          <Route path="ProductList" element={<ProductList />} />
          <Route path="Logowanie" element={<Logowanie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

