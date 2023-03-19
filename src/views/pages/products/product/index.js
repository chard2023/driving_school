import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from "../../../../env";

// 
import "./index.scss";
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    TabContent,
    TabPane
  } from "reactstrap";
function ProductDetails(props) {
  const [course, setCourse] = useState(null)
  const [price, setPrice] = useState(0);
  const loginData = JSON.parse(localStorage.getItem('loginData'));
  const [total, setTotal] = useState(null);
  const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cartData'))|| []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {};
    payload.total = course.starting_price;
    if (loginData) {
      payload.customer = loginData;
    }
    if (event.target.branch) {
      let value = event.target.branch.value;
      if (value !== 'default') {
        payload.branch = JSON.parse(value);
      } else {
        window.confirm('Please select a Branch.');
        return
      }
    }
    if (event.target.vehicle_course) {
      let value = event.target.vehicle_course.value;
      if (value !== 'default') {
        payload.vehicle_course = value;
      } else {
        window.confirm('Please select a Vehicle Course.');
        return
      }
    }
    if (event.target.hour_rate) {
      let value = event.target.hour_rate.value;
      if (value !== 'default') {
        payload.hour_rate = JSON.parse(value);
      } else {
        window.confirm('Please select an Hour.');
        return
      }
    }
    if (event.target.training_vehicle) {
      let value = event.target.training_vehicle.value;
      if (value !== 'default') {
        payload.training_vehicle = JSON.parse(value);
      } else {
        window.confirm('Please select a Training Vehicle.');
        return
      }
    }
    if (event.target.training_center) {
      let value = event.target.training_center.value;
      if (value !== 'default') {
        payload.training_center = JSON.parse(value);
      } else {
        window.confirm('Please select a Training Center.');
        return
      }
    }
    payload.course = course;
    console.log("payload: ",payload);
    const exist = cartData.find((item) => item.course._id === course._id);
    if (exist) {
      let res = (window.confirm('This course was already added to your the cart. Move to your cart?'));
      if (res) {
        window.location.href = '/cart';
      }
    } else {
      setCartData(prevState => [...prevState, payload]);
      window.location.href = '/cart';
    }
  };
  const [hourRates, setHourRates] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const vehicleCourseChange = (event) => {
    event.preventDefault();
    if(event.target.value === 'default') {
      setHourRates([]);
      setVehicles([]);
      return;
    }
    axios.get(`${env.API_BASE_URL}vehicle_course/${event.target.value}`)
    .then(res => {
      console.log("vehicle_course:", res.data);
      setHourRates(res.data.hour_rates);
      setVehicles(res.data.training_vehicles);
    })
  }
  const hourRateChange = (event) => {
    event.preventDefault();
    if(event.target.value !== 'default') {
      let value = JSON.parse(event.target.value)
      setTotal(value.rate);
    } else {
      setTotal(null);
      return;
    }
  }
  const initCourse = () => {
    axios.get(`${env.API_BASE_URL}course/${props.productId}`)
    .then(res => {
      setCourse(res.data);
      setPrice(res.data.starting_price);
      if (res.data.vehicle_courses.length == 0) {
        setTotal(res.data.starting_price);
      }
    })
    .catch(error => console.error(error));
  }
  useEffect(() => {
    if (cartData) {
      localStorage.setItem('cartData', JSON.stringify(cartData));
      const event = new Event('cartData');
      window.dispatchEvent(event);
    }
    initCourse();
  }, [cartData]);

  return (
    <>
    <Container className='productDetails pt-5'>
      <Row>
        <Col>
        <img src={course?.img} width="100%" />
        </Col>
        <Col>
          <h1 className='heading'>{course?.course_name}</h1>
          <p className='mt-2'>{course?.short_desc}</p>
          <h3 className='starting-price'>
            {course?.vehicle_courses?.length != 0 && <span>Starts at </span>}
            PHP {price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
          <Form onSubmit={handleSubmit}>
            {course?.branches.length >=1 ? (
              <Row className="mt-4">
                <Col md={4} className="inputLabel">Branches</Col>
                <Col>
                  <FormGroup>
                    <Input
                      bsSize="sm"
                      name="branch"
                      type="select"
                      placeholder="Select branch"
                      required>
                        <option value="default">Choose an option</option>
                        {course?.branches.map((branch, index) => <option key={index} value={JSON.stringify(branch)}>{branch.name}</option>)}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2}></Col>
              </Row>
            ):null}
            {course?.vehicle_courses.length >=1 ? (
            <Row>
              <Col md={4} className="inputLabel">Vehicle Course</Col>
              <Col>
                <FormGroup>
                  <Input
                    bsSize="sm"
                    name="vehicle_course"
                    onChange={vehicleCourseChange}
                    type="select">
                        <option value="default">Choose an option</option>
                        {course?.vehicle_courses.map((item, index) => <option key={index} value={item._id}>{item.name}</option>)}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={2}></Col>
            </Row>
            ):null}
            {course?.vehicle_courses?.length >=1 ? (
            <Row>
              <Col md={4} className="inputLabel">Hours</Col>
              <Col>
                <FormGroup>
                  <Input
                    bsSize="sm"
                    name="hour_rate"
                    onChange={hourRateChange}
                    type="select">
                      <option value="default">Choose an option</option>
                      {hourRates.map((item, index) => <option key={index} value={JSON.stringify(item)}>{item.hour} Hours</option>)}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={2}></Col>
            </Row>
            ):null}
            {course?.vehicle_courses?.length >=1 ? (
            <Row>
              <Col md={4} className="inputLabel">Training Vehicle</Col>
              <Col>
                <FormGroup>
                  <Input
                    bsSize="sm"
                    name="training_vehicle"
                    type="select">
                      <option value="default">Choose an option</option>
                      {vehicles.map((item, index) => <option key={index} value={JSON.stringify(item)}>{item.name}</option>)}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={2}></Col>
            </Row>
            ):null}
            {course?.training_center?.length >=1 ? (
            <Row>
              <Col md={4} className="inputLabel">Training Center</Col>
              <Col>
                <FormGroup>
                  <Input
                    bsSize="sm"
                    name="training_center"
                    type="select">
                      <option value="default">Choose an option</option>
                      {course?.training_center.map((item, index) => <option key={index} value={JSON.stringify(item)}>{item.name}</option>)}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={2}></Col>
            </Row>
            ):null}
            
            {(total && course?.vehicle_courses?.length >= 1) &&
            <h5 className="total">PHP {total?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h5>
            }
            
            <hr />
            {/* <Row>
              <Col md={4} className="inputLabel">Enrollment Code <span>*</span></Col>
              <Col>
                <FormGroup>
                  <Input
                    bsSize="sm"
                    type="select">
                    <option>
                      1
                    </option>
                    <option>
                      2
                    </option>
                    <option>
                      3
                    </option>
                    <option>
                      4
                    </option>
                    <option>
                      5
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={2}></Col>
            </Row> */}
            {/* <p>* Click <a href="" target="_blank">here</a> for enroll code instructions.</p> */}
            <div className="enroll-action">
              {/* <Input className="qty" value="1" disabled /> */}
              <Button type="submit">Enroll Now!</Button>
            </div>
          </Form>
        </Col>
      </Row>
      <div className="long-desc-section">
        <div className="header-section">
          <ul>
            <li>
              <h6>Description</h6>
            </li>
            {/* <li>
              <h6>Description</h6>
            </li> */}
          </ul>
        </div>
        {course?.long_desc != '' &&
        <div className="long-desc" dangerouslySetInnerHTML={{__html: course?.long_desc}}></div>
      }
      </div>
    </Container>
    </>
  );
}

export default ProductDetails;
