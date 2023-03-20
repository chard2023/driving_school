import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./index.scss"
import env from '../../../env';

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components

function AdminRegister() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confrimPassword, setconfrimPassword] = useState('');
  const [showPW, togglePW] = useState(false);
  const [showCP, toggleCP] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleToggleShowPassword = () => {
    togglePW(!showPW);
  };
  const handleToggleShowConfirmPassword = () => {
    toggleCP(!showCP);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (password.length < 6) {
      return;
    }
    if (password !== confrimPassword) {
      return;
    }
    let type = "admin"
    const formData = {firstname, lastname, email, password, type};
    console.log(formData);
    axios.post(`${env.API_BASE_URL}user/register`, formData)
    .then(res => {
      localStorage.setItem('loginData', JSON.stringify(res.data.user));
      const event = new Event('loginData');
      window.dispatchEvent(event);
      window.location.href = '/';
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
        <Container className="admin-register">
          <Row>
            <Col>
              <Card className="card-register mt-5">
                <h3 className="title mx-auto">Admin Register</h3>
                <Form className="register-form" onSubmit={handleSubmit}>
                  <Row>
                      <Col md={6}>
                          <label>First name</label>
                          <Input placeholder="First name" type="text" value={firstname} onChange={event => setFirstname(event.target.value)} required />
                      </Col>
                      <Col md={6}>
                          <label>Last name</label>
                          <Input placeholder="Last name" type="text" value={lastname} onChange={event => setLastname(event.target.value)} />
                      </Col>
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
                          {password.length < 6 && <div className="invalid-text">Password must be at least 6 characters long.</div>}
                      </Col>
                      <Col md={12}>
                          <label>Confirm Password</label>
                          <Input placeholder="Confirm Password" type={showCP ? 'text' : 'password'} value={confrimPassword} onChange={event => setconfrimPassword(event.target.value)} required />
                          <div className="toggle-eye" onClick={handleToggleShowConfirmPassword}>
                            <i className={showCP ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                          </div>
                          { password !== confrimPassword ?
                          <div className="invalid-text">Confirm Password must be equal to Password</div>
                          : null
                          }
                      </Col>
                  </Row>
                  <Button type="submit" block color="primary">
                    Register
                  </Button>
                </Form>
                <div className="forgot">
                  <Link to="/login" className="btn btn-link btn-primary">Log In</Link>
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

export default AdminRegister;
