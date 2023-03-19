import React, { useState } from 'react';
import { Collapse,
  Button,
  CardBody,
  Card,
  Row,
  Col } from 'reactstrap';

import "./index.scss"

const FaqAccordion = ({ id, question, answer, isOpen, toggleAccordion, openAccordionId }) => {
  const handleClick = () => {
    if (isOpen) {
      toggleAccordion(null);
    } else {
      toggleAccordion(id);
    }
  };
  return (
    <>
      <div className={`accordion ${isOpen ? 'active': ''}`}>
        <div className="header" onClick={handleClick} aria-expanded={isOpen} aria-controls={id}>
        {question}
        {!isOpen && <i className="bi bi-plus-square-fill" ></i>}
        </div>
        <Collapse className="content" isOpen={isOpen}>
          <p>{answer}</p>
        </Collapse>
      </div>
    </>
  );
};

export default FaqAccordion;