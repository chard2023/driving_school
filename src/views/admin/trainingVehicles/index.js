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

function TrainingVehiclesIndex() {
    
    const [vehicles, setVehicles] = useState([])
    const [vehicle_course, setVehicleCourse] = useState('');
    const [training_vehicle, setTrainingVehicle] = useState('');
    const [numRates, setNumRates] = useState(1);
    const [hour_rates, setHourRates] = useState([{ hour: 0, rate: 0 }]);
    const [rates_row, setRatesRow] = useState(1);
    const handleAddRate = () => {
        setNumRates(numRates + 1);
        setHourRates([...hour_rates, { hour: 0, rate: 0 }]);
    };

    const handleTimeChange = (index, value) => {
        setHourRates((prevRates) =>
        prevRates.map((rate, i) => (i === index ? { ...rate, hour: parseInt(value) } : rate))
        );
    };

    const handleRateChange = (index, value) => {
        setHourRates((prevRates) =>
        prevRates.map((rate, i) => (i === index ? { ...rate, rate: parseFloat(value) } : rate))
        );
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        postVehicleCourse();
    };
    const postVehicleCourse = () => {
        const data = { vehicle_course, training_vehicle, hour_rates };
        console.log(data);
        axios.post(`${env.API_BASE_URL}vehicle_course`)
        .then(res => {
            console.log(res)
            getVehicles();
        })
        .catch(error => console.error(error));
    }
    const getVehicles = () => {
        axios.get(`${env.API_BASE_URL}vehicle_course`)
        .then(res => {
            setVehicles(res.data);
            for (let i = 0; i < res.data.length; i++) {
                setRatesRow(res.data[i].hour_rates.length);
            }
        })
        .catch(error => console.error(error));
    }
    const blankRates = (e,l) => {
        let tds = [];
        for (let i = 0; i < e; i++) {
            tds.push(<td key={l++}/>)
        }
        return tds;
    }
    useEffect(() => {
        getVehicles();
    }, []);
    return (
        <div className="vehicle-course-main mt-4">
            <h6 >Vehicle Course</h6>
            <Table bordered striped>
                <thead>
                    <tr>
                        <th >#</th>
                        <th >COURSE</th>
                        <th >TRAINING VEHICLE</th>
                        <th colSpan={rates_row} className="text-center">RATES</th>
                    </tr>
                </thead>
                <tbody>
                {vehicles?.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{item?.vehicle_course}</td>
                        <td>{item?.training_vehicle}</td>
                        {item?.hour_rates.map((rate, index) => (
                            <td key={index}>
                                {rate?.hour}hrs <hr className="m-0" />
                                PHP {rate?.rate}
                            </td>
                        ))}
                        {blankRates(rates_row - item?.hour_rates?.length, item?.hour_rates?.length)}
                    </tr> 
                ))}
                </tbody>
            </Table>
            <h6 className="mt-4">Add Vehicle Course</h6>
            <Card className="add-vehicle-course no-transform shadow-none">
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Vehicle Course</Label>
                            <Input placeholder="Ex. SEDAN (AT)" value={vehicle_course} onChange={event => setVehicleCourse(event.target.value)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Training Vehicle</Label>
                            <Input placeholder="Ex. Toyota Altis" value={training_vehicle} onChange={event => setTrainingVehicle(event.target.value)} required />
                        </FormGroup>
                        
                        <Label tag="h6">Rates</Label>
                        {hour_rates.map((rate, index) => (
                            <Row key={index}>
                            <Col>
                                <FormGroup>
                                <Input
                                    type="number"
                                    placeholder="How much time?"
                                    required
                                    min={5}
                                    max={30}
                                    value={rate.hour}
                                    onChange={(e) => handleTimeChange(index, e.target.value)}
                                />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                <Input
                                    type="number"
                                    placeholder="How much for this hour?"
                                    required
                                    value={rate.rate}
                                    onChange={(e) => handleRateChange(index, e.target.value)}
                                />
                                </FormGroup>
                            </Col>
                            </Row>
                        ))}
                        <Button type="button" className="btn-link" color="primary" onClick={handleAddRate}>
                            <i className="bi bi-plus-lg"></i>&nbsp;Add another hour rate
                        </Button>

                        <div className="action-btns mt-5">
                            <Button type="submit" color="primary">Create</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
  };

export default TrainingVehiclesIndex;
