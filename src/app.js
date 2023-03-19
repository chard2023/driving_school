import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router';
// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import UserLoginPage from "views/pages/login";
import UserRegisterPage from "views/pages/register";
import RegisterPage from "views/examples/RegisterPage.js";
import Products from "views/pages/products";
import AdminRegister from "views/admin/register";
import CartIndex from 'views/pages/cart';
import FaqsPage from 'views/pages/FQA';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from 'components/Footers/footer';
// Admin
import AdminIndex from "views/admin";

  function App() {
    const userDate = JSON.parse(localStorage.getItem('loginData'));
    const userRole = userDate ? userDate.type : 'user';
    const location = useLocation();
    useEffect(() => {
      console.log("User Role:", userRole);
    }, []);
  return (
    <>
      {(!location.pathname.includes("/register")&&!location.pathname.includes("/login")&&!location.pathname.includes("/admin")) && <IndexNavbar />}
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses/:productId" element={<Products />} />
            <Route path="/nucleo-icons" element={<NucleoIcons />}/>
            <Route path="/landing-page" element={<LandingPage />}/>
            <Route path="/profile-page" element={<ProfilePage />}/>
            <Route path="/cart" element={<CartIndex />}/>
            <Route path="/FQAs" element={<FaqsPage />}/>
            
            {!userDate && (
              <>
                <Route path="/register" element={<UserRegisterPage />}/>
                <Route path="/login" element={<UserLoginPage />}/>
                <Route path="/admin/register" element={<AdminRegister />}/>
              </>
            )}
            {userRole === 'admin' && (
              <>
                <Route path="/admin/*" element={<AdminIndex />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      {(!location.pathname.includes("/register")&&!location.pathname.includes("/login")&&!location.pathname.includes("/admin")) && <Footer />}
    </>
  )
}

export default App;