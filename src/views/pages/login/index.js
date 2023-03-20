import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./index.scss"
import env from '../../../env';

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components

function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPW, togglePW] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleToggleShowPassword = () => {
    togglePW(!showPW);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const formData = {email, password};
    console.log(formData);
    axios.post(`${env.API_BASE_URL}user/login`, formData)
    .then(res => {
        let loginData = res.data.user;
        loginData.token = res.data.token
        localStorage.setItem('loginData', JSON.stringify(loginData));
        const event = new Event('loginData');
        window.dispatchEvent(event);
        if(loginData.type == 'user') {
          window.location.href = '/';
        } else {
          window.location.href = '/admin/dashboard';
        }
    })
    .catch(error => {
      console.log(error);
    });
  };
  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <div className="filter" />
        <Container className="user-login">
          <Row>
            <Col>
              <Card className="card-register mt-5">
                <h3 className="title mx-auto">Keep In Touch</h3>
                <Form className="register-form" onSubmit={handleSubmit}>
                  <Row>
                      <Col md={12}>
                          <label>Email</label>
                          <Input placeholder="Email" type="email" value={email} onChange={event => setEmail(event.target.value)} required />
                      </Col>
                      <Col md={12}>
                          <label>Password</label>
                          <Input placeholder="Password" type={showPW ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} required />
                          <div className="toggle-eye" onClick={handleToggleShowPassword}>
                            <i className={showPW ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                          </div>
                      </Col>
                  </Row>
                  <Button type="submit" block color="primary">
                    Log In
                  </Button>
                </Form>
                <div className="forgot">
                <Link to="/register" className="btn btn-link btn-primary">Register</Link>
                </div>
              </Card>
            </Col>
            <Col/>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserLoginPage;
