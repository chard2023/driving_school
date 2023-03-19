import React, { useState } from 'react';

import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';

import ProfilePageHeader from 'components/Headers/ProfilePageHeader';

import "./index.scss";
const AboutUs = () => {
  const page = {
    title: "TALA: The Country's Premiere Driving School",
    short_desc: ""
  }
  return (
    <>
        <ProfilePageHeader data={page} />
        <div className="p-5" />
        <Container className="contant-us">
            <h3 className="m-0">TALA Driving is All About Road Safety</h3>
            <div className="p-4" />
            <Row>
                <Col md={6}>
                    <img className="w-100" src={require('assets/img/TALA-Driving-is-all-about-safety.jpg')} />
                </Col>
                <Col md={6}>
                    <p>TALA Driving Company, Inc. started operating on March 31, 1977 as TALA Driving Academy. Armed with only two training vehicles, a 1977 Volkswagen and an owner-type Jeep, and loads of determination to succeed, we opened our first registration office at the Guadalupe Commercial Center.</p>
                    <p>Today, with more than 60 company-owned registration centers nationwide and over 170 modern training vehicles to choose from, TALA Driving continues to serve the needs of the growing number of student drivers. Our experienced and well-trained teachers carry government accreditation as professional driving instructors and lecturers.</p>
                    <p>On April 1997, we inaugurated the country’s first driving training center located at Naga Road, Pulang Lupa, Las Piñas City. The primary aim is to provide the student drivers a complete training ground away from the traffic</p>
                </Col>
            </Row>
            <p>in the metropolis. On October 18, 2005 we marked our 28th year in the industry by inaugurating TALA Driving’s new and company-owned five-story TALA Driving Company office building. We then opened our second training center at Novaliches, Quezon City on July 2008.</p>
            <p>TALA Driving offers Practical Driving Course (PDC), Theoretical Driving Course (TDC), Motorcycle Riding Course (MRC), Driver’s Education 101 Program for Senior High and College students and Car Maintenance 101.</p>
            <p>We are also industry partners to a number of top local businesses. TALA Driving’s Corporate Program trains company professional drivers through Fleet Training and Assessment courses.</p>
            <p>As an active Road Safety advocate, we are involved in different Road Safety programs which aim to minimize hazards and risk on the road for drivers, passengers or pedestrians. Dubbed as IM SAFELY, these specialized programs are designed for beginners as well as experienced drivers and develop them to become safe and responsible road users through our variety of highly effective training programs.</p>
        </Container>
    </>
  );
};

export default AboutUs;
