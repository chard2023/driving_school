import React, { useState } from 'react';
import FaqAccordion from 'components/FAQAccordion';

import { Container } from 'reactstrap';

import ProfilePageHeader from 'components/Headers/ProfilePageHeader';

import "./index.scss";
const Faqs = () => {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const page = {
    title: "FAQs",
    short_desc: "Frequently Asked Questions. Here are some common questions about A-1 Driving."
  }
  const toggleAccordion = (id) => {
    if (openAccordionId === id) {
      setOpenAccordionId(null);
    } else {
      setOpenAccordionId(id);
    }
  };
  return (
    <>
        <ProfilePageHeader data={page} />
        <Container>
          <div className="p-5"></div>
            <div className="accordions">
            <FaqAccordion
                id="faq1"
                question="What is React?"
                answer="React is a JavaScript library for building user interfaces."
                isOpen={openAccordionId === 'faq1'}
                toggleAccordion={() => toggleAccordion('faq1')}
            />
            <FaqAccordion
                id="faq2"
                question="What is Reactstrap?"
                answer="Reactstrap is a library of UI components for React applications that are built on top of Bootstrap."
                isOpen={openAccordionId === 'faq2'}
                toggleAccordion={() => toggleAccordion('faq2')}
            />
            <FaqAccordion
                id="faq3"
                question="How do I install Reactstrap?"
                answer="You can install Reactstrap using npm or yarn. See the Reactstrap documentation for more details."
                isOpen={openAccordionId === 'faq3'}
                toggleAccordion={() => toggleAccordion('faq3')}
            />
            </div>
        </Container>
    </>
  );
};

export default Faqs;
