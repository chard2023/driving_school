import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./index.scss"
import env from "../../../env";

// reactstrap components
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Table,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
} from "reactstrap";

// core components

// index sections

function PromoIndex() {
    const [promos, setPromos] = useState(null);
    const removeItem = (event) => {
        const _id = event.currentTarget.dataset.promoId;
        console.log(_id);
        if (window.confirm('Are you sure you want to delete this Promo?')) {
            axios.delete(`${env.API_BASE_URL}promo_code/${_id}`)
              .then(res => {
                console.log(res);
                initPromos();
              })
              .catch(error => {
                console.log(error);
              });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = {};
        if (event.target.name.value != '') {
            formData.name = event.target.name.value;
        } else {
            window.confirm('Title is required.');
            return;
        }
        if (event.target.value.value != '') {
            formData.value = event.target.value.value;
        } else {
            window.confirm('Value is required.');
            return;
        }
        if (event.target.discount_type.value != '') {
            formData.discount_type = event.target.discount_type.value;
        } else {
            window.confirm('Discount Type is required.');
            return;
        }
        if (event.target.expiration.value != '') {
            let expiration = event.target.expiration.value;
            formData.expiration = new Date(expiration + 'T00:00:00.000Z').toISOString();
        } else {
            window.confirm('Expiration date is required.');
            return;
        }
        axios.post(`${env.API_BASE_URL}promo_code`, formData)
        .then(res => {
            console.log(res.data);
            initPromos();
        })
        .catch(error => console.error(error));
    }
    const initPromos = () => {
        axios.get(`${env.API_BASE_URL}promo_code`)
        .then(res => {
            setPromos(res.data);
            console.log(res.data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => console.error(error));
    }
  
    useEffect(() => {
        initPromos();
    }, []);
    return (
        <div className="promos-main mt-5">
            <Table bordered striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Event Name</th>
                        <th>Promo Code</th>
                        <th>Discount</th>
                        <th>Status</th>
                        <th>Expiration</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {promos?.map((item,index)=> (
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{item?.name}</td>
                            <td>{item?.promo_code}</td>
                            <td>{item?.discount_type}</td>
                            <td>{item?.status}</td>
                            <td>{new Date(item?.expiration).toLocaleDateString()}</td>
                            <td className="text-center">
                                <Button className="btn-remove" data-promo-id={item?._id} onClick={removeItem}><i className="bi bi-x"></i></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="create-promo mt-5">
                <h6>Create Promo</h6>
                <Card className="no-transform">
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Title</Label>
                                        <Input type="text" name="name" placeholder="Event or Name of the promocode" />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Promo code Value</Label>
                                        <Input type="number" name="value" placeholder="Insert promocode value" />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Discount Type</Label>
                                        <Input type="select" name="discount_type" placeholder="Select dicount type"
                                        required>
                                            <option value="percent">Percent</option>
                                            <option value="amount">Amount</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Event or Name of the promocode</Label>
                                        <Input type="date" name="expiration" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button type="submit" color="primary">Create</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
  };

export default PromoIndex;
