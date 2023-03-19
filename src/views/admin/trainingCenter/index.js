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
    FormText
} from "reactstrap";

// core components

// index sections

function TrainingCenterIndex() {
    // image
    const [file, setFile] = useState(null);
    const [img, setFileUrl] = useState(null);

    // Form fields
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const [centers, setCenters] = useState(null)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post(`${env.API_BASE_URL}upload`)
        .then((res) => {
            setFileUrl(res.data.fileUrl);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpload();
    };

    const postCenter = () => {
        const data = { img, name, phone, address, city, state, zip };
        console.log(data);
        axios.post(`${env.API_BASE_URL}training_center`)
        .then(res => {
            console.log(res)
            getCenters();
        })
        .catch(error => console.error(error));
    }
    const getCenters = () => {
        axios.get(`${env.API_BASE_URL}training_center`)
        .then(res => setCenters(res.data))
        .catch(error => console.error(error));
    }
    useEffect(() => {
        if (img) {
            postCenter();
        }
        getCenters();
    }, [img]);
    return (
        <div className="center-main mt-5">
            <h6>Training Centers</h6>
            <Row>
            {centers?.map((center) => (
            <Col key={center?._id} md={3}>
                <Card className="center">
                    <img alt="Center Picture" src={center?.img} />
                <CardBody>
                    <CardTitle tag="h6" className="mt-0">
                    {center?.name}
                    </CardTitle>
                    <CardSubtitle
                    className="mb-0 text-muted"
                    tag="h6"
                    >
                    {center.address} 
                    </CardSubtitle>
                    <Button className="edit-pen btn-link" color="primary">
                        <i className="bi bi-pencil-fill"></i>
                    </Button>
                </CardBody>
                </Card>
            </Col>
            ))}
            { centers?.length == 0 ? 
            <Col md={3}>
                <Card className="no-transform center shadow-none">
                <CardBody>
                    No training center found.
                </CardBody>
                </Card>
            </Col>
            : null}
            </Row>
            <h6 className="mt-4">Add center</h6>
            <Card className="add-center shadow-none">
                <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="centerPhoto">Center Picture</Label>
                        <Input id="centerPhoto" type="file" onChange={handleFileChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Center Name</Label>
                        <Input placeholder="Center Name" value={name} onChange={event => setName(event.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone</Label>
                        <Input placeholder="09xxxxxxxx" value={phone} onChange={event => setPhone(event.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Center Address</Label>
                        <Input placeholder="1234 Main St" value={address} onChange={event => setAddress(event.target.value)} required />
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label> City </Label>
                                <Input value={city} onChange={event => setCity(event.target.value)} required />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label>State</Label>
                                <Input value={state} onChange={event => setState(event.target.value)} required />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label>Zip</Label>
                                <Input value={zip} onChange={event => setZip(event.target.value)} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="action-btns">
                        <Button type="submit" color="primary">Create</Button>
                    </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
  };

export default TrainingCenterIndex;
