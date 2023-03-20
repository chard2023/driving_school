import React, { useState } from 'react';

import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import ProfilePageHeader from 'components/Headers/ProfilePageHeader';
import EasyEnroll from 'components/easy-enroll';
import "./index.scss";
const NewsEvents = () => {
  const page = {
    title: "News & Events",
    short_desc: "Check out what’s happening in and around the world of TALA Driving."
  }
  return (
    <>
        <ProfilePageHeader data={page} />
        <div className="p-5" />
        <Container className="news-events">
          <Row>
            <Col>
            <Row>
                <Col md={6}>
                  <Card>
                    <img className="event-img"
                      alt="Sample"
                      src={require('assets/img/footer-background.png')}
                    />
                    <CardBody>
                      <CardTitle className="mt-0 mb-2" tag="h5">
                        TALA Launches New Rider Program
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="p"
                      >
                        by TALA Driving | Dec 16, 2020 | News
                      </CardSubtitle>
                      <CardText className="pb-0">
                        Some quick example text to build on the card title and make up the bulk of the card‘s content.
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card>
                    <img className="event-img"
                      alt="Sample"
                      src={require('assets/img/footer-background.png')}
                    />
                    <CardBody>
                      <CardTitle className="mt-0 mb-2" tag="h5">
                      December 2020 Promo
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="p"
                      >
                        by TALA Driving | Dec 16, 2020 | News
                      </CardSubtitle>
                      <CardText className="pb-0">
                        Some quick example text to build on the card title and make up the bulk of the card‘s content.
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
            </Row>
            </Col>
            <Col md={3}>
            <EasyEnroll />
            </Col>
          </Row>
        </Container>
    </>
  );
};

export default NewsEvents;
