import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from "../../../env";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import Toaster from 'components/Toaster';
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
    TabPane,
    Table,
  } from "reactstrap";
function CheckoutIndex() {
    const [cartData, setCartData] = useState(null);
    const [subTotal, setSubTotal] = useState(null);
    const [coupon, setCupon] = useState('');
    const [total, setTotal] = useState(null);
    const [showToaster, setShowToaster] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastStatus, setToastStatus] = useState('');
    const [promoData, setPromoData]= useState(null);



  const handleCloseToaster = () => {
    setShowToaster(false);
    setToastMessage('');
    setToastStatus('');
  };
  const page = {
    title: "Checkout",
    short_desc: ""
  }
  
 
  useEffect(() => {
    
  }, []);

  return (
    <>
    {showToaster && (
        <Toaster message={toastMessage} type={toastStatus} onClose={handleCloseToaster} />
      )}
    <ProfilePageHeader data={page} />
        <div className="p-5" />
    <Container className="CheckoutIndex">
        <Form>
            <Row>
                <Col>
                    <h3>Registration Details</h3>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>First Name <span className="required">*</span></Label>
                                <Input type="text" name="fname" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Middle name <span className="required">*</span></Label>
                                <Input type="text" name="mname" />
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    <FormGroup>
                        <Label>Last name <span className="required">*</span></Label>
                        <Input type="text" name="lname" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Mobile Number <span className="required">*</span></Label>
                        <Input type="number" name="phone" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email address <span className="required">*</span></Label>
                        <Input type="email" name="email" />
                    </FormGroup>
                </Col>
                <Col>
                    <h3>Checkout Details</h3>

                </Col>
            </Row>
        </Form>
    </Container>
    </>
  );
}

export default CheckoutIndex;
