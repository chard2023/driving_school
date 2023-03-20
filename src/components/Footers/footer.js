/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./footer.scss";
import env from "../../env";

// reactstrap components
import { Row, Col, Container } from "reactstrap";

function Footer() {
  const longText = "started operating on January 31, 2020. Armed with only two training vehicles, a toyota vios and toyota wigo, and loads of determination to succeed, we opened our first registration office at Legaspy City, Albay. We are an LTO-ACCREDITED DRIVING SCHOOL that provides Quality and Affordable Driving Lessons. Today, with 5 branches nationwide and over 15 modern training vehicles to choose from, Tala Driving School continues to serve the needs of the growing number of student drivers. Our experienced and well-trained instructors that carry government accreditation as professional driving instructors and lecturers. We will be Your Guide to Driving Excellence!"
  const [courses, setCourses] = useState([]);
  const getCourses = () => {
    axios.get(`${env.API_BASE_URL}course`)
    .then(res => {
      setCourses(res.data);
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    getCourses();
  }, []);
  return (

    <footer className="footer-section">
      <Container className="footer-image">
       <Row>
          <Col md={3}>
            <h3 className="row-title">ABOUT TALA DRIVING </h3>
            <p>
              <strong>TALA DRIVING SCHOOL,OCP</strong><br/>
              {longText.slice(0, 100)}...
            </p>
            <a href="/about-us" >Read more</a>
          </Col>
          <Col md={3}>
          <h3 className="row-title">QUICK CONTACT</h3>
          <p>ADDRESS: Golden Clarion Lily St. Caloocan City, 1423</p> 
          <p>CUSTOMER CARE HOTLINE:&nbsp; &nbsp; +63.991.336.1161</p>
          <p>WEBSITE ENROLLMENT HOTLINE: +63.991.336.1161</p>
          <p>ONLINE TDC / ONLINE DEP HOTLINE: +63.991.336.1161</p>
          <p>EMAIL:  sales.abler@gmail.com</p>
          <p>FOLLOW US:
            <a href="https://www.facebook.com/Taladriving/?ref=page_internal" target="_blank" rel=""></a>
          </p>
          </Col>
          <Col md={3}>
            <h3 className="row-title">TOP COURSES</h3>
            {courses?.map((item, index) => { 
                if(item?.sub_courses.length === 0) {
                    return (
                        <a key={index} href={`/courses/${item?._id}`}>
                            <div className="course mb-3">
                                <img src={item?.img} />
                                <p className="text-primary">{item?.course_name.slice(0, 50)}...</p>
                            </div>
                        </a>
                    );
                }
            })}
          </Col>
          <Col md={3} className="text-center">
            <img src="" alt=""/>
            <h4>Driving is a Life Skill!</h4>
            <h4>Become a Safe TALA Driver!</h4>
            <br/>
            <a  href="/courses" className="mr-1 btn btn-outline-neutral">Enroll Now !</a>
          </Col>
        </Row>
        
      </Container>
      <div className="copy-right">
        <Container>
          <p>Copyright © TALA Driving School, All Rights Reserved.</p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;