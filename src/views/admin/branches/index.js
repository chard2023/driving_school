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

function BranchIndex() {
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

    const [branches, setBranches] = useState(null)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleUpload = async() => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(`${env.API_BASE_URL}upload`, formData);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = { img, name, phone, address, city, state, zip };
        try {
            if (file) {
              const uploadRes = await handleUpload();
              setFileUrl(uploadRes.fileUrl);
              if (uploadRes) {
                formData.img = uploadRes.fileUrl;
                postBranch(formData);
              }
            } else {
              postBranch(formData);
            }
          } catch (error) {
            console.log(error);
        }
    };
    const postBranch = (formData) => {
        axios.post(`${env.API_BASE_URL}branch`, formData)
        .then(() => {
            getBranches();
        })
        .catch(error => console.error(error));
    }
    const getBranches = () => {
        axios.get(`${env.API_BASE_URL}branch`)
        .then(res => {
            setBranches(res.data);
        })
        .catch(error => console.error(error));
    }
    useEffect(() => {
        
    }, []);
    return (
      <div className="branch-main mt-5">
        <div className="branch-section">
          <h6>Branch Outlets</h6>
          <Row>
          {branches?.map((branch) => (
            <Col key={branch?._id} md={3}>
              <Card className="branch">
              <img alt="Branch Picture" src={branch?.img} />
                <CardBody>
                  <CardTitle tag="h6" className="mt-0">
                  {branch?.name}
                  </CardTitle>
                  <CardSubtitle
                    className="mb-0 text-muted"
                    tag="h6"
                  >
                    {branch.address} 
                  </CardSubtitle>
                    <Button className="edit-pen btn-link" color="primary">
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                </CardBody>
              </Card>
            </Col>
            ))}
            { branches?.length == 0 ? 
            <Col md={3}>
              <Card className="no-transform branch shadow-none">
                <CardBody>
                    No branch found.
                </CardBody>
              </Card>
            </Col>
            : null}
          </Row>
          <h6 className="mt-4">Create Branch</h6>
          <Card className="create-branch shadow-none">
                <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="branchPhoto">Branch Picture</Label>
                        <Input id="branchPhoto" type="file" onChange={handleFileChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Branch Name</Label>
                        <Input placeholder="Branch Name" value={name} onChange={event => setName(event.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone</Label>
                        <Input placeholder="09xxxxxxxx" value={phone} onChange={event => setPhone(event.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Branch Address</Label>
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
      </div>
    );
  };

export default BranchIndex;
