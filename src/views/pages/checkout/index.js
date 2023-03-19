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
    ListGroup,
    ListGroupItem,
    CardHeader
  } from "reactstrap";
function CheckoutIndex() {
    const [cartData, setCartData] = useState(null);
    const [subTotal, setSubTotal] = useState(null);
    const [total, setTotal] = useState(null);
    const [showToaster, setShowToaster] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastStatus, setToastStatus] = useState('');
    const [promoData, setPromoData] = useState(JSON.parse(localStorage.getItem("promoCode"))||null);
    const [agree, setAgree] = useState(false);
    const [loginData, SetCustomer] = useState(JSON.parse(localStorage.getItem("loginData"))||null);

  const handleCloseToaster = () => {
    setShowToaster(false);
    setToastMessage('');
    setToastStatus('');
  };
  const page = {
    title: "Checkout",
    short_desc: ""
  }
  
  const initSubTotal = () => {
    const storedCartData = JSON.parse(localStorage.getItem('cartData')) || [];
    if (storedCartData) {
        setCartData(storedCartData);
        let sub_total = 0;
        storedCartData.forEach(elmt => {
            sub_total += elmt.total;
        });
        setSubTotal(sub_total);
    }
  }
    const initTotal = () => {
        if (promoData) {
            if(promoData.discount_type === 'percent') {
                const result = subTotal * (1 - promoData.value / 100);
                setTotal(result);
            } else {
                const result = subTotal - promoData.value;
                setTotal(result);
            }
        } else {
            setTotal(subTotal);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let fname = event.target.fname.value;
        let mname = event.target.mname.value;
        let lname = event.target.lname.value;
        let phone = parseInt(event.target.phone.value);
        let email = event.target.email.value;
        let paymentMethod = event.target.paymentMethod.value;
        let terms = JSON.parse(event.target.agree.value);
        let courses = cartData;
        let customer = loginData;
        let payment = {
            method: paymentMethod,
            total: total,
            subTotal: subTotal,
            promoData: promoData,
        }
        const formData = {fname, mname, lname, phone, email, payment, terms, courses, customer}
        console.log(formData);
        axios.post(`${env.API_BASE_URL}order`, formData)
        .then(res => {
            console.log(res.data)
        }).catch(err => console.error(err));
    }
    const handleAgree = () => {
        setAgree(!agree);
    }
  useEffect(() => {
    initSubTotal();
    window.addEventListener('cartData', initSubTotal);
    if (promoData) {
        initTotal();
    }
    if (subTotal) {
        initTotal();
    }
  }, [promoData, subTotal]);

  return (
    <>
    {showToaster && (
        <Toaster message={toastMessage} type={toastStatus} onClose={handleCloseToaster} />
      )}
    <ProfilePageHeader data={page} />
        <div className="p-5" />
    <Container className="CheckoutIndex">
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <h3 className="heading">Registration Details</h3>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label tag="h6">First Name <span className="required">*</span></Label>
                                <Input type="text" name="fname" />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label tag="h6">Middle name <span className="required">*</span></Label>
                                <Input type="text" name="mname" />
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    <FormGroup>
                        <Label tag="h6">Last name <span className="required">*</span></Label>
                        <Input type="text" name="lname" />
                    </FormGroup>
                    <FormGroup>
                        <Label tag="h6">Mobile Number <span className="required">*</span></Label>
                        <Input type="number" name="phone" />
                    </FormGroup>
                    <FormGroup>
                        <Label tag="h6">Email address <span className="required">*</span></Label>
                        <Input type="email" name="email" />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <h3 className="heading">Checkout Details</h3>
                    <Card className="no-transform shadow-none border checkout-details">
                        <CardHeader>
                            <h6>Product</h6>
                            <h6>Subtotal</h6>
                        </CardHeader>
                        <ListGroup flush>
                            {cartData?.map((item, index) => (
                                <ListGroupItem key={index}>
                                    <p className="course-name">
                                    {item?.course?.course_name} <strong>x 1</strong> <br/>
                                    <strong>Branch for Classroom Learning:</strong> {item?.branch?.name}
                                    </p>
                                    <p>{item?.total?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                                </ListGroupItem>
                            ))}
                            {promoData && 
                                <ListGroupItem className="discount">
                                    <h6>With discount coupon</h6>
                                    {
                                        promoData?.discount_type === "amount" ? 
                                        <h6>{promoData.name} PHP {promoData.value?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} OFF</h6>
                                        : <h6>{promoData.name} {promoData.value}% OFF</h6>
                                    }
                                </ListGroupItem>
                            }
                            <ListGroupItem>
                            <h6>Subtotal</h6>
                            <h6>{subTotal?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h6>
                            </ListGroupItem>
                            <ListGroupItem>
                            <h6>Total</h6>
                            <h6>{total?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h6>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>

                    <Card className="no-transform shadow-none payment-method border">
                        <CardHeader>
                            <h4>Payment Method</h4>
                            <div className="form-check-radio">
                                <Label check>
                                    <Input
                                        defaultValue="deposit"
                                        name="paymentMethod"
                                        type="radio"
                                    />
                                    Bank Deposit (not available at the moment)
                                    <span className="form-check-sign" />
                                </Label>
                            </div>
                            <div className="form-check-radio">
                                <Label check>
                                    <Input
                                        defaultValue="cash"
                                        name="paymentMethod"
                                        type="radio"
                                    />
                                    Cash or Check via Branch in-Person Payment
                                    <span className="form-check-sign" />
                                </Label>
                            </div>
                            <div className="form-check-radio">
                                <Label check>
                                    <Input
                                        defaultValue="transfer"
                                        name="paymentMethod"
                                        type="radio"
                                    />
                                    PayPal or Credit Card (not available at the moment)
                                    <span className="form-check-sign" />
                                </Label>
                            </div>
                        </CardHeader>
                        <ListGroup flush>
                            <ListGroupItem>
                                <p className="note">
                                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="/">privacy policy</a>.</p>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" name="agree" color="primary" defaultValue={agree} onChange={handleAgree} />
                                    I have read and agree to the website terms and conditions.
                                    <span className="form-check-sign" />
                                    </Label>
                                </FormGroup>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                    <Button type="submit" color="primary" size="lg" outline>Please order</Button>
                </Col>
            </Row>
        </Form>
    </Container>
    </>
  );
}

export default CheckoutIndex;
