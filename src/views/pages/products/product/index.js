import React, { useEffect, useState } from 'react';
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
  const [product, setProduct] = useState(null)
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    fetch(`${env.API_BASE_URL}product/${props.productId}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
    <Container className='productDetails pt-5'>
      <Row>
        <Col>
        <img src={product?.image} width="100%" />
        </Col>
        <Col>
          <h1 className='heading'>{product?.name}</h1>
          <p className='mt-2'>{product?.description}</p>
          <h3 className='starting-price'><span>Starts at </span>PHP {product?.starting_price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
          <Form>
            <Row className="mt-4">
              <Col md={4} className="inputLabel">Region</Col>
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
