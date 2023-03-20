import React, { useState } from 'react';
import FaqAccordion from 'components/FAQAccordion';

import { Container } from 'reactstrap';

import ProfilePageHeader from 'components/Headers/ProfilePageHeader';

import "./index.scss";
const Faqs = () => {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const page = {
    title: "FAQs",
    short_desc: "Frequently Asked Questions. Here are some common questions about TALA Driving."
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
                question="1. How much does your courses cost?"
                answer="Our course fees are designed depending on your level of need: Beginner (20-30 Hours), Intermediate (10-15 Hours) or Refresher (8 Hours). Fees starts at P4,000 for the Training Center Course and P5,000 for Premium driving courses. Visit our Courses page for more info."
                isOpen={openAccordionId === 'faq1'}
                toggleAccordion={() => toggleAccordion('faq1')}
            />
            <FaqAccordion
                id="faq2"
                question="2. What is the difference between premium, executive and rush courses?"
                answer="For Premium, you start and end your training in your registered branch using the training vehicle of your choice. For the Executive Course, you can be picked-up and dropped-off to and from your location of choice. For the Rush Course, it is 5-8 hours of straight driving."
                isOpen={openAccordionId === 'faq2'}
                toggleAccordion={() => toggleAccordion('faq2')}
            />
            <FaqAccordion
                id="faq3"
                question="3. What is the minimum age to learn how to drive? And what are the requirements?"
                answer="Minimum age is 17 years old. You need a Student Permit to start behind-the-wheel training. The requirements are posted here."
                isOpen={openAccordionId === 'faq3'}
                toggleAccordion={() => toggleAccordion('faq3')}
            />
            </div>
        </Container>
    </>
  );
};

export default Faqs;
