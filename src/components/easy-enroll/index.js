import React, { useState } from 'react';

import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';


import "./index.scss";
const EasyEnroll = () => {
  
  return (
    <>  
        <Container className="easy-enroll">
            <h4 className="heading">Enrolling is Easy as</h4>
            <div className="text-center">
                <img className="w-100 traffic-light" src={require('assets/img/Traffic-light-123-v2.gif')} />
            </div>
            <ol className="steps">
                <li>Choose your course</li>
                <li>Register</li>
                <li>Pay your fees</li>
            </ol>
            <br />
            <div className="text-center">
                <Button className="btn btn-enroll-today" color="primary">Enroll Today! <i className="bi bi-arrow-right"></i></Button>
            </div>
            <div className="p-4"></div>
            <div className="recent-events">
                <h5 className="section-heading">Recent Posts</h5>
                <a href="" >A-1 Launches New Rider Program</a>
                <a href="" >December 2020 Promo</a>
                <a href="" >Shell Philippines Partnership Continues</a>
            </div>
        </Container>
    </>
  );
};

export default EasyEnroll;
