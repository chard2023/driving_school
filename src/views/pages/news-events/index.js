import React, { useState } from 'react';

import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import ProfilePageHeader from 'components/Headers/ProfilePageHeader';
import EasyEnroll from 'components/easy-enroll';
import "./index.scss";
const NewsEvents = () => {
  const page = {
    title: "News & Events",
    short_desc: "Check out what’s happening in and around the world of A-1 Driving."
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
                    <img
                      alt="Sample"
                      src="https://picsum.photos/300/200"
                    />
                    <CardBody>
                      <CardTitle className="mt-0 mb-2" tag="h5">
                        A-1 Launches New Rider Program
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="p"
                      >
                        by A-1 Driving | Dec 16, 2020 | News
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