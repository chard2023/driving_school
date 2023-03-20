import React, { useState } from 'react';

import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';

import ProfilePageHeader from 'components/Headers/ProfilePageHeader';

import "./index.scss";
const CotantUs = () => {
  const page = {
    title: "Contact Us",
    short_desc: "We keep an open ear because listening is part of driving."
  }
  return (
    <>
        <ProfilePageHeader data={page} />
        <div className="p-5" />
        <Container className="contant-us">
            <Row>
                <Col md={4}>
                    <h4 className="address-heading">TALA Driving Head Office</h4>
                    <p><strong>Address: </strong>#2 Sta. Lucia St., Plainview, Mandaluyong City, Metro Manila</p>
                    <p><strong>Phone/Fax: </strong>63.2.532.2272 / 63.2.532.7934</p>
                    <p><strong>Business Hours: </strong>Monday – Saturday; 8:00am – 6:00pm</p>
                    <p><strong>Email: </strong><a href="mailto:someone@example.com">someone@example.com</a></p>
                    <p><strong>Website: </strong><a href={window.location.origin}>{window.location.origin}</a></p>
                    <p>To see the branch nearest you, please visit the <a href="/branches">branches</a> page.</p>
                </Col>
                <Col md={8}>
                    <h3 className="form-heading">Get In Touch</h3>
                    <Form>
                        <FormGroup>
                            <Input placeholder="Name" />
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Input placeholder="Email Address" />
                                </Col>
                                <Col>
                                    <Input placeholder="Mobile Number" />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Input type="select" name="discount_type" placeholder="Select dicount type"
                                required>
                                <option value="percent">Percent</option>
                                <option value="amount">Amount</option>
                        </Input>
                        </FormGroup>
                        <FormGroup>
                            <textarea className="form-control" placeholder="Message"/>
                        </FormGroup>
                        <Button type="submit" color="primary" outline>Send now</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
  );
};

export default CotantUs;
