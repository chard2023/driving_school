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
    const [training_vehicles, setTrainingVehicle] = useState([{ name: '' }]);
    const [numRates, setNumRates] = useState(1);
    const [hour_rates, setHourRates] = useState([{ hour: 0, rate: 0 }]);
    const [rates_row, setRatesRow] = useState(1);

    const handleAddTrainingVehicle = () => {
        setNumRates(numRates + 1);
        setTrainingVehicle([...training_vehicles, { name: '' }]);
    };
    const handleTrainingVehicleChange = (index, event) => {
        setTrainingVehicle((prevVehicles) =>
            prevVehicles.map((vehicle, i) => (i === index ? { ...vehicle, name: event } : vehicle))
        );
    };
    const handleRemoveTrainingVehicle = (index) => {
        setTrainingVehicle((prevVehicles) =>
          prevVehicles.filter((vehicle, i) => i !== index)
        );
    };

    const handleRemoveRates = (index) => {
        setHourRates((prevRates) =>
          prevRates.filter((rate, i) => i !== index)
        );
    };
    const handleAddRate = () => {
        // setNumRates(numRates + 1);
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
        const formData = { vehicle_course, training_vehicles, hour_rates };
        console.log(formData);
        if (vehicle_course === '') {
            return;
        }
        axios.post(`${env.API_BASE_URL}vehicle_course`, formData)
        .then(res => {
            console.log(res)
            getVehicles();
            resetFormData();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => console.error(error));
    }
    const resetFormData = () => {
        setVehicleCourse('');
        setTrainingVehicle([{ name: '' }]);
        setHourRates([{ hour: 0, rate: 0 }]);
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
                        <td>{item?.training_vehicles.map((item, index, arr) => `${item?.name}${index === arr.length - 1 ? '' : ', '}`)}</td>
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
                            <Label tag="h6">Vehicle Course</Label>
                            <Input placeholder="Ex. SEDAN (AT)" value={vehicle_course} onChange={event => setVehicleCourse(event.target.value)} required />
                        </FormGroup>
                        <Label tag="h6">Training Vehicle</Label>
                        
                        {training_vehicles.map((item, index) => {
                            const isLastItem = index === training_vehicles.length - 1;
                            const mb = isLastItem ? 'mb-0' : '';
                            return (
                                <FormGroup key={index} className={`trainin-vehicle-fg ${mb}`}>
                                    <Input placeholder="Ex. Toyota Altis" value={item.name} onChange={event => handleTrainingVehicleChange(index, event.target.value)} required />
                                    <Button type="button" className="btn-delete" onClick={() => handleRemoveTrainingVehicle(index)}><i className="bi bi-dash"></i></Button>
                                </FormGroup>
                            );
                        })}
                        <Button type="button" className="btn-link pl-0 pt-0" color="primary" onClick={handleAddTrainingVehicle}>
                            <i className="bi bi-plus-lg"></i>&nbsp;Add another training vehicle
                        </Button>
                        <Label tag="h6">Hour and Rates</Label>
                        {hour_rates.map((rate, index) => {
                            const isLastItem = index === hour_rates.length - 1;
                            const mb = isLastItem ? 'mb-0' : '';
                            return (
                            <Row className="hour-rates" key={index}>
                                <Col>
                                    <FormGroup className={`hour-rates-fg ${mb}`}>
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
                                    <FormGroup className={`hour-rates-fg ${mb}`}>
                                        <Input
                                            type="number"
                                            placeholder="How much for this hour?"
                                            required
                                            value={rate.rate}
                                            onChange={(e) => handleRateChange(index, e.target.value)}
                                        />
                                        <Button type="button" className="btn-delete" onClick={() => handleRemoveRates(index)}><i className="bi bi-dash"></i></Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                            );
                        })}
                        <Button type="button" className="btn-link pl-0 pt-0" color="primary" onClick={handleAddRate}>
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
