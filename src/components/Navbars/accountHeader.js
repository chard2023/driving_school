/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function AccountHeader() {
  return (
    <div className="account-header">
    <Container>
    <nav>
      <ul>
        <li>
          <a href="">My Account</a>
        </li>
        <li>
          <a href="">Checkout</a>
        </li>
        <li>
          <a href="">A-1 Cart</a>
        </li>
        <li>
          <a href="">Log In/Register</a>
        </li>
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
