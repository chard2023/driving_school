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
    Table
  } from "reactstrap";
function CartIndex() {
    const [cartData, setCartData] = useState(null);
    const [subTotal, setSubTotal] = useState(null);
    const [coupon, setCupon] = useState('');
    const [total, setTotal] = useState(null);
    const [showToaster, setShowToaster] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastStatus, setToastStatus] = useState('');
    const [promoData, setPromoData]= useState(null);

  const removeItem = (event) => {
    const _id = event.currentTarget.dataset.courseId;
    console.log(_id);
    if (window.confirm('Are you sure you want to remove the item?')) {
        const cart = JSON.parse(localStorage.getItem('cartData'));
        const updatedCart = cart.filter((item) => item.course._id !== _id);
        localStorage.setItem('cartData', JSON.stringify(updatedCart));
        setCartData(updatedCart);
        const event = new Event('cartData');
        window.dispatchEvent(event);
    }
  };
  const applyCoupon = () => {
    axios.get(`${env.API_BASE_URL}promo_code/code/${coupon}`)
        .then(res => {
            setPromoData(res.data);
        })
        .catch(error => {
            setToastMessage(error.response.data.error);
            setToastStatus('danger')
            setShowToaster(true);
        });
  };

  const handleCouponInputChange = (event) => {
    setCupon(event.target.value);
  };

  const handleCloseToaster = () => {
    setShowToaster(false);
    setToastMessage('');
    setToastStatus('');
  };
  const page = {
    title: "TALA Course Cart",
    short_desc: ""
  }
  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem('cartData')) || [];
    if (storedCartData) {
        setCartData(storedCartData);
        let sub_total = 0;
        storedCartData.forEach(elmt => {
            sub_total += elmt.total;
        });
        setSubTotal(sub_total);
    }
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
  }, [promoData]);

  return (
    <>
    {showToaster && (
        <Toaster message={toastMessage} type={toastStatus} onClose={handleCloseToaster} />
      )}
    <ProfilePageHeader data={page} />

    <Container className="CartIndex pt-5 mt-4">
        <Table striped className="mb-0">
            <thead>
                <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {cartData?.map((item,index) => (
                    <tr key={index}>
                        <td className="course-img-col">
                            <Button className="btn-remove" data-course-id={item.course._id} onClick={removeItem}><i className="bi bi-x"></i></Button>
                            <img className="course-img" src={item.course.img} />
                            
                        </td>
                        <td>
                            <a className="course-name" href={`courses${item.course._id}`}>{item.course.course_name}</a>
                            <h6 className="branch-name">Branch: <span>{item.branch.name}</span></h6>
                        </td>
                        <td>PHP {item.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td>{1}</td>
                        <td>{(item.total*1).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                ))}
                    <tr>
                        <td colSpan="5">
                            <FormGroup className="coupon-voucher mb-0">
                                {promoData&&<span>Coupon Applied!</span>}
                                <Input placeholder="Coupon Code" value={coupon} onChange={handleCouponInputChange} />
                                <Button color="primary" outline onClick={applyCoupon} disabled={!coupon}>Apply Coupon</Button>
                            </FormGroup>
                        </td>
                    </tr>
            </tbody>
        </Table>
        <Row>
            <Col></Col>
            <Col>
                <div className="proceed-checkout">
                    <h5>Cart total</h5>
                    <Table>
                        <tbody>
                            <tr>
                                <td><h6 className="mb-0">Subtotal</h6></td>
                                <td>PHP {subTotal?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                            </tr>
                            {promoData && <tr className="coupon-applied">
                                <td><h6 className="mb-0">Coupon: {promoData?.name}</h6></td>
                                {promoData?.discount_type === "amount" ? 
                                <td>PHP {promoData.value?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} OFF</td>
                                : <td>{promoData.value}% OFF</td>
                            }
                                
                            </tr>}
                            <tr>
                                <td><h6 className="mb-0">Total</h6></td>
                                <td><h6 className="mb-0">PHP {total?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h6></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button color="primary" outline className="w-100">Proceed to checkout</Button>
                </div>
            </Col>
        </Row>
    </Container>
    </>
  );
}

export default CartIndex;
