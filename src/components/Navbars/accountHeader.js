/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function AccountHeader() {
  const [userData, setUserData] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [cartData, setCartData] = useState([]);
  const updateUserData = () => {
    let userLogin = JSON.parse(localStorage.getItem('loginData'));
    setUserData(userLogin);
  }
  const toggleShowLogout = () => {
    setShowLogout(!showLogout);
  }
  const logout = () => {
    localStorage.removeItem('loginData');
    const event = new Event('loginData');
    window.dispatchEvent(event);
  }
  const initCartData = () => {
    const localCart = JSON.parse(localStorage.getItem('cartData'));
    console.log("cartData: ",localCart);
    if (localCart) {
      setCartData(localCart);
    } else {
      localStorage.setItem('cartData', JSON.stringify(cartData));
    }
  }
  useEffect(() => {
    updateUserData();
    initCartData();
    window.addEventListener('loginData', updateUserData);
    window.addEventListener('cartData', initCartData);
  }, []);

  return (
    <div className="account-header">
    <Container>
    <nav>
      <ul>
        {userData && 
        <li className="account">
          <a className="text-white" onClick={toggleShowLogout}>My Account</a>
          {showLogout && <Button className="logout" onClick={logout}>Logout</Button>}
        </li>
        }
        {!userData &&
        <li>
          <Link to="login">
            Log In/Register
          </Link>
        </li>
        }
        <li>
          <a href="/cart">{cartData?.length} Items</a>
        </li>
      </ul>
    </nav>
    </Container>
    </div>
  );
}

export default AccountHeader;
