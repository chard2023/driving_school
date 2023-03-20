import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Input,
} from "reactstrap";

import ProfilePageHeader from "components/Headers/ProfilePageHeader";

import "./index.scss";
const AboutUs = () => {
  const page = {
    title: "TALA: The Country's Premiere Driving School",
    short_desc: "",
  };
  return (
    <>
      <ProfilePageHeader data={page} />
      <div className="p-5" />
      <Container className="contant-us">
        <h3 className="m-0">TALA Driving is All About Road Safety</h3>
        <div className="p-4" />
        <Row>
          <Col md={6}>
            <img className="w-100" src={require("assets/img/about.png")} />
          </Col>
          <Col md={6}>
            <p>
              Tala Driving School, OPC. started operating on January 31, 2020.
              Armed with only two training vehicles, a toyota vios and toyota
              wigo, and loads of determination to succeed, we opened our first
              school at Legaspi City, Albay. We are an LTO-ACCREDITED DRIVING
              SCHOOL that provides Quality and Affordable Driving Lessons.
              Today, with 5 branches nationwide and over 15 modern training
              vehicles to choose from, Tala Driving School continues to serve
              the needs of the growing number of student drivers. Our
              experienced and well-trained instructors carry government
              accreditation as professional driving instructors and lecturers.
              We will be Your Guide to Driving Excellence!
            </p>
            <p>
              Today, with 5 company-owned registration centers nationwide and
              over 20 modern training vehicles to choose from, TALA Driving
              continues to serve the needs of the growing number of student
              drivers. Our experienced and well-trained teachers carry
              government accreditation as professional driving instructors and
              lecturers.
            </p>
          </Col>
        </Row>
        <p>
          TALA Driving offers Practical Driving Course (PDC), Theoretical
          Driving Course (TDC), Motorcycle Riding Course (MRC), Driver’s
          Education 101 Program for Senior High and College students and Car
          Maintenance 101.
        </p>
        <p>
          We are also industry partners to a number of top local businesses.
          TALA Driving’s Corporate Program trains company professional drivers
          through Fleet Training and Assessment courses.
        </p>
        <p>
          As an active Road Safety advocate, we are involved in different Road
          Safety programs which aim to minimize hazards and risk on the road for
          drivers, passengers or pedestrians. Dubbed as IM SAFELY, these
          specialized programs are designed for beginners as well as experienced
          drivers and develop them to become safe and responsible road users
          through our variety of highly effective training programs.
        </p>
        <h4 className="mt-5">Accreditation</h4>
        <Row>
          <Col>
            <img className="w-10 mt-5" src={require("assets/img/LTO.png")} />
            <h4 className="mt-5">Land Transportation Office</h4>
          </Col>
          <Col>
            <img className="w-10 mt-5" src={require("assets/img/TESDA.png")} />
            <h4 className="mt-5">
              Technical Education & Skills Development Authority
            </h4>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AboutUs;
