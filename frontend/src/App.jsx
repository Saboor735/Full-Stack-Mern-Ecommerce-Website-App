import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Collections from "./pages/Collections"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import Placeorder from "./pages/Placeorder"
import Product from "./pages/Product"
import Navbar from "./components/Navbar"
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

import Verify from './pages/Verify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      window.location.href = 'http://localhost:3001'; // Update this URL if your admin panel runs on a different port
      return null;
    }
  }, []);

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>  
    <Navbar/>     
    <SearchBar/>
    <ToastContainer/>
    <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/collections' element={<Collections/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/orders' element={<Orders/>}/>
<Route path='/place-order' element={<Placeorder/>}/>
<Route path='/product/:productId' element={<Product/>}/>
<Route path='/verify' element={<Verify/>} />
<Route path='/admin' element={null} />
    </Routes>
    <Footer/>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
  )
}

export default App