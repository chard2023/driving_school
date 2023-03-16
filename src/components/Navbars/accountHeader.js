/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function AccountHeader() {
  const [userData, setUserData] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
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
  useEffect(() => {
    updateUserData();
    window.addEventListener('loginData', updateUserData);
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
          <a href="">0 Items</a>
        </li>
      </ul>
    </nav>
    </Container>
    </div>
  );
}

export default AccountHeader;
