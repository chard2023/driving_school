/*eslint-disable*/
import React from "react";
import "./footer.scss"
// reactstrap components
import { Row, Col, Container } from "reactstrap";

function Footer() {
  return (
    <footer className="footer-section">
      <Container className="footer-image">
       <Row>
          <Col md={3}>
            <h3 className="row-title">ABOUT TALA DRIVING </h3>
            <p>
              <strong>TALA DRIVING SCHOOL,OCP</strong><br/>
              started operating on January 31, 2020. Armed with only two training vehicles, a toyota vios and toyota wigo, and loads of determination to succeed, we opened our first registration office at Legaspy City, Albay.
              We are an LTO-ACCREDITED DRIVING SCHOOL that provides Quality and Affordable Driving Lessons. 
              Today, with 5 branches nationwide and over 15 modern training vehicles to choose from, Tala Driving School continues to serve the needs of the growing number of student drivers. Our experienced and well-trained instructors that carry government accreditation as professional driving instructors and lecturers. We will be Your Guide to Driving Excellence!
            </p>
            
          </Col>
          <Col md={3}>
          <h3 className="row-title">QUICK CONTACT</h3>
          <p>ADDRESS: Golden Clarion Lily St. Caloocan City, 1423</p> 
          <br/>
          <p>CUSTOMER CARE HOTLINE:&nbsp; &nbsp; +63.991.336.1161</p>
          <br/>
          <p>WEBSITE ENROLLMENT HOTLINE: +63.991.336.1161</p>
          <br/>
          <p>ONLINE TDC / ONLINE DEP HOTLINE: +63.991.336.1161</p>
          <br/>
          <p>EMAIL:  sales.abler@gmail.com</p>
          <br/>
          <p>FOLLOW US:
            <a href="https://www.facebook.com/Taladriving/?ref=page_internal" target="_blank" rel=""></a>
          </p>
          </Col>
          <Col md={3}>
            <h3 className="row-title">TOP COURSES</h3>
            <p>
            <a href="#">
              <img />
              PREMIUM
              <br />
              Get to drive using any of
              <br />
              our training vehicles
            </a>
            </p>
            <p>
            <a href="#">
              <img />
              EXECUTIVE
              <br />
              Free Pick-up and drop-off
              <br />
              for our students
            </a>
            </p>
            <p>
              <a href="#">
                <img/>
                RUSH
                <br></br>
                Pressed for time? Drive 5-8
                <br></br>
                hours straight
              </a>
            </p>
            <p>
              <a href="#">
                <img />
                CAR MAINTENANCE 101
                <br></br>
                Basic and practical skills to
                <br></br>
                maintain your car
              </a>
            </p>
          </Col>
          <Col md={3}>
            <img src="" alt=""/>
          <h3 >Driving is a Life Skill!</h3>
          <h3 >Become a Safe TALA Driver!</h3>
          <br/>
          <button  type="button" class="mr-1 btn btn-outline-neutral">Enroll Now !</button>
          </Col>
        </Row>
      </Container>
        
    </footer>
  );
}

export default Footer;