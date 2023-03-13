import React from "react";
import { Route, Routes, useLocation } from 'react-router';

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import Products from "views/pages/products";
import AdminLogIn from "views/admin/login";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
function App() {
  const location = useLocation();
  console.log(!location.pathname.includes("/user/"))
  return (
    <>
      {(!location.pathname.includes("/user/")&&!location.pathname.includes("/admin/")) && <IndexNavbar />}
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses/:productId" element={<Products />} />
            <Route path="/nucleo-icons" element={<NucleoIcons />}/>
            <Route path="/landing-page" element={<LandingPage />}/>
            <Route path="/profile-page" element={<ProfilePage />}/>
            <Route path="/user/register" element={<RegisterPage />}/>
            <Route path="/admin/login" element={<AdminLogIn />}/>
            <Route path="*" element={<Index />}/>
        </Routes>
    </>
  )
}

export default App;