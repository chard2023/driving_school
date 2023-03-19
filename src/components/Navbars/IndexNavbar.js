import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../env";

// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

import AccountHeader from "./accountHeader";

// style
import "./index.scss"

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [logoSize, setLogoSize] = useState("");
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const [courses, setCourses] = useState([]);
  const getCourses = () => {
    axios.get(`${env.API_BASE_URL}course`)
    .then(res => {
      let course_list = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].sub_course_name == '') {
          course_list.push(res.data[i]);
        }
      }
      setCourses(course_list);
      console.log("course_list",course_list);
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    getCourses();
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 99 ||
        document.body.scrollTop > 99
      ) {
        setNavbarColor("");
        setLogoSize("small")
      } else if (
        document.documentElement.scrollTop < 100 ||
        document.body.scrollTop < 100
      ) {
        setNavbarColor("navbar-transparent");
        setLogoSize("")
      }
    };
    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, []);
  
  const new__nav = {
    display: "flex",
    flexDirection: "column",
    paddingTop: "0px"
  }
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg" style={new__nav}>
      <AccountHeader />
        <Container>
          <div className="main-nav navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              href="/"
              title="Coded by Creative Tim"
            >
              <img
              alt="..."
              className={classnames("brand-logo", logoSize)}
              src={logoSize === 'small' ? require("assets/img/logo.png") : require("assets/img/logo2.png")}
            />
              {/* Paper Kit React */}
            </NavbarBrand>
            <button
              aria-expanded={navbarCollapse}
              className={classnames("navbar-toggler navbar-toggler", {
                toggled: navbarCollapse
              })}
              onClick={toggleNavbarCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            navbar
            isOpen={navbarCollapse}
          >
            <Nav navbar>
              <NavItem>
                <NavLink href="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem className="dropdown">
                <NavLink href="/" className="dropbtn">
                  About Us <i className="nc-icon nc-minimal-down" />
                </NavLink>
                <div className="dropdown-content">
                  <a href="#">The A-1 Advantage</a>
                  <a href="#">Branches</a>
                  <a href="#">Training Centers</a>
                  <a href="#">Training Vehicles</a>
                  <a href="#">News & Events</a>
                </div>
              </NavItem>
              <NavItem className="dropdown">
                <NavLink href="/" className="dropbtn">
                  Courses <i className="nc-icon nc-minimal-down" />
                </NavLink>
                <div className="dropdown-content">
                {courses?.map((course, index) => (
                  <div key={index}>
                  {course?.sub_courses.length >= 1 ? 
                  <div className="dropdown">
                    <a href={`/courses/${course._id}`}>{course?.course_name} <i className="nc-icon nc-minimal-down" /></a>
                    <div className="dropdown-content nested">
                      {course?.sub_courses?.map((item, index) => (
                        <a key={index} href={`/courses/${item._id}`}>{item?.name}</a>
                      ))}
                    </div>
                  </div>
                  :<a href="#">Training Center Course (TCC)</a>}
                  </div>
                ))}
                  {/* <div className="dropdown">
                    <a href="#">Theoretical Driving Course (TDC) <i className="nc-icon nc-minimal-down" /></a>
                    <div className="dropdown-content nested">
                      <a href="#">Classroom</a>
                      <a href="#">Online</a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <a href="#">Practical Driving Course (PDC) <i className="nc-icon nc-minimal-down" /></a>
                    <div className="dropdown-content nested">
                      <a href="#">Premium</a>
                      <a href="#">Executive</a>
                      <a href="#">Rush</a>
                    </div>
                  </div>
                  <a href="#">Training Center Course (TCC)</a>
                  <a href="#">Motorcycle Riding Course (MRC)</a> */}
                </div>
              </NavItem>
              <NavItem className="dropdown">
                <NavLink href="/" className="dropbtn">
                  Special Programs <i className="nc-icon nc-minimal-down" />
                </NavLink>
                <div className="dropdown-content">
                  <a href="#">Fleet Driver’s Training & Assessment</a>
                  <a href="#">Driver’s Education 101</a>
                  <a href="#">Car Maintenance 101</a>
                </div>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  FAQs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  Contact Us
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  data-placement="bottom"
                  href="https://twitter.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  title="Follow us on Twitter"
                >
                  <i className="fa fa-twitter" />
                  <p className="d-lg-none">Twitter</p>
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink
                  data-placement="bottom"
                  href="https://www.facebook.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  title="Like us on Facebook"
                >
                  <i className="fa fa-facebook-square" />
                  <p className="d-lg-none">Facebook</p>
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink
                  data-placement="bottom"
                  href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                  target="_blank"
                  title="Follow us on Instagram"
                >
                  <i className="fa fa-instagram" />
                  <p className="d-lg-none">Instagram</p>
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink
                  data-placement="bottom"
                  href="https://www.github.com/CreativeTimOfficial/paper-kit-react?ref=creativetim"
                  target="_blank"
                  title="Star on GitHub"
                >
                  <i className="fa fa-github" />
                  <p className="d-lg-none">GitHub</p>
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink
                  href="https://demos.creative-tim.com/paper-kit-react/#/documentation?ref=pkr-index-navbar"
                  target="_blank"
                >
                  <i className="nc-icon nc-book-bookmark" /> Documentation
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <Button
                  className="btn-round"
                  color="danger"
                  href="https://www.creative-tim.com/product/paper-kit-pro-react?ref=pkr-index-navbar"
                  target="_blank"
                >
                  <i className="nc-icon nc-spaceship"></i> Upgrade to Pro
                </Button>
              </NavItem> */}
            </Nav>
          </Collapse>
        </Container>
    </Navbar>
  );
}

export default IndexNavbar;
