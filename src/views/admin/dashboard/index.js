import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./index.scss"
import env from "../../../env";

// reactstrap components
import {
    Row,
    Col,
    Card,
    CardHeader,
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
    ListGroup,
ListGroupItem
} from "reactstrap";

function DashboardIndex() {
  const [orders, setOrders] = useState(null);
  const initOrders = () => {
    axios.get(`${env.API_BASE_URL}order`)
    .then(res => {
      setOrders(res.data);
    }).catch(err => console.error(err));
  }
  useEffect(() => {
    initOrders();
  }, []);
    return (
      <div className="dashboard-main">
        <h6>Orders</h6>
        <Row>
          {orders?.map((item, index) => (
            <Col md={4} key={index}>
              <Card
                  className="no-transform"
                  color="dark"
                  outline
                >
                  <CardHeader class="d-flex justify-content-between align-items-end">
                    {item?.fname} {item?.lname}
                    <small>{new Date(item?.created_at).toLocaleDateString()}</small>
                  </CardHeader>
                  <ListGroup flush>
                    <ListGroupItem>
                      <h6>Courses</h6>
                      {item?.courses?.map((item, index) => (
                        <div key={index}>
                          - {item?.course?.course_name}
                        </div>
                      ))}
                    </ListGroupItem>
                    
                    
                  </ListGroup>
                    <CardBody>
                    <CardTitle tag="h5">
                      PHP {item?.payment?.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </CardTitle>
                  </CardBody>
                </Card>
            </Col>
          ))}
        </Row>
        
      </div>
    );
  };

export default DashboardIndex;
