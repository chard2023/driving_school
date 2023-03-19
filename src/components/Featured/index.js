/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// reactstrap components
import { Row, Col, Card, CardTitle, CardText, CardSubtitle, CardBody, Button  } from "reactstrap";

// core components
import "./index.scss";
import env from "../../env"

function FeaturedIndex() {
    const [courses, setCourses] = useState(null)
    const initCourses = () => {
        axios.get(`${env.API_BASE_URL}course`)
        .then(res => {
            console.log(res.data);
            setCourses(res.data);
        }).catch(err=> console.error(err))
    }

    useEffect(() => {
        initCourses();
    }, []);
  return (
    <div className="featured-section">
        <Row>
            {courses?.map((item, index) => (
                item?.sub_courses?.length === 0 ? (
                <Col key={index} md={3}>
                    <Link to={`courses/${item?._id}`} className="card-link">
                        <Card>
                            <img alt="Course image" src={item?.img} />
                            <CardBody>
                                <CardTitle tag="h5">{item?.course_name}</CardTitle>
                                
                                <CardText>{item?.short_desc.slice(0, 100)}...</CardText>
                                <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                                >
                                Starts at Php {item?.starting_price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </CardSubtitle>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                ) : null
            ))}
        </Row>
    </div>
  );
}

export default FeaturedIndex;