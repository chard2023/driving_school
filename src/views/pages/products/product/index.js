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
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    axios.get(`${env.API_BASE_URL}course/${props.productId}`)
    .then(res => setCourse(res.data))
    .catch(error => console.error(error));
  }, []);

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
          <h3 className='starting-price'><span>Starts at </span>PHP {course?.starting_price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
          <Form>
            {course?.branches.length >=1 ? (
              <Row className="mt-4">
              <Col md={4} className="inputLabel">Branches</Col>
              <Col>
                <FormGroup>
                  <Input
                    bsSize="sm"
                    type="select"
                    placeholder="Select branch"
                    >
                      {course?.branches.map((branch,index) => {
                        <option key={index} value={branch._id}>{branch.name}</option>
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={2}></Col>
            </Row>
            ):null}
            
            <Row>
              <Col md={4} className="inputLabel">Course</Col>
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
            </Row>
            <Row>
              <Col md={4} className="inputLabel">Hours</Col>
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
            </Row>
            <Row>
              <Col md={4} className="inputLabel">Training Vehicle</Col>
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
            </Row>
            <hr />
            <Row>
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
            </Row>
            <p>* Click <a href="" target="_blank">here</a> for enroll code instructions.</p>
            <div className="enroll-action">
              <Input className="qty" value="1" disabled />
              <Button>Enroll Now!</Button>
            </div>
          </Form>
        </Col>
      </Row>
        <Nav tabs>
          <NavItem onClick={() => setActiveTab("1")}>
            <NavLink active={activeTab === "1"}>JUST WORK</NavLink>
          </NavItem>
          <NavItem onClick={() => setActiveTab("2")}>
            <NavLink active={activeTab === "2"}>More Tabs</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <h4>
            Tab 1 Contents
          </h4>
        </TabPane>
        <TabPane tabId="2">
          <h4>
            Tab 2 Contents
          </h4>
        </TabPane>
      </TabContent>
    </Container>
    </>
  );
}

export default ProductDetails;
