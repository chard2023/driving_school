import React, { useState } from 'react';

import { Container, Row, Col, Card, CardBody, CardTitle, Button, CardSubtitle, CardText } from 'reactstrap';

import ProfilePageHeader from 'components/Headers/ProfilePageHeader';

import "./index.scss";
const SpecialPrograms = () => {
  const page = {
    title: "Special Programs",
    short_desc: "Check out our other programs, products and service offerings."
  }
  return (
    <>
        <ProfilePageHeader data={page} />
        <div className="p-5" />
        <Container className="special-programs">
            <div className="content">
                <Row>
                    <Col>
                        <img className="w-100" src={require('assets/img/Image00053.jpg')} />
                    </Col>
                    <Col>
                        <p>Be a complete TALA Driver with our special items and services available at any TALA <a href="">branches</a>:</p>
                    </Col>
                </Row>
            </div>
            <div className="p-5" />
            <Row>
                <Col md={3}>
                    <Card>
                        <img
                            alt="Sample"
                            src="https://picsum.photos/300/200"
                        />
                        <CardBody>
                            <CardTitle tag="h6">Fleet Driver’s Training & Assessment</CardTitle>
                            <CardText className="text-primary">
                            Some quick example text to build on the card title and make up the bulk of the card‘s content.
                            </CardText>
                            <a className="btn-inquire" href="/contact-us">For Inquiry <i className="bi bi-arrow-right"></i></a>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  );
};

export default SpecialPrograms;
