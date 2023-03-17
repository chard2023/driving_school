import React, { useState, useEffect } from 'react';
import { Alert, Container } from "reactstrap";

import "./index.scss";

const Toaster = ({ message, type, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="global_toaster">
        {/* primary, success, danger, warning, info */}
        <Alert color={type} isOpen={show}>
          <Container>
            <span className="message">{message}</span>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={onClose}
            >
              <i className="nc-icon nc-simple-remove" />
            </button>
          </Container>
        </Alert>
        {/* <div className={`toaster ${showToaster ? 'show' : ''} ${toasterType}`}>
        {toasterMessage}
        </div> */}
    </div>
  );
}

export default Toaster;
