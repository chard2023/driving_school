import React, { useEffect, createRef, useState } from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components
import "./IndexHeader.scss"

function ProfilePageHeader(props) {
  const [title, setTitle] = useState("");
  const [short_desc, setShortDesc] = useState("");
  let pageHeader = createRef();

  useEffect(() => {
    setTitle(props.data.title);
    setShortDesc(props.data.short_desc);
    console.log("props: ",props);
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        // pageHeader.current.style.transform =
          // "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/fabio-mangione.jpg") + ")"
        }}
        className="page-header page-header-xs profile-header-section"
        data-parallax={true}
        ref={pageHeader}
      > 
      <Container>
        <div className="content">
          <h3>{title}</h3>
          <p>{short_desc}</p>
        </div>
      </Container>
        <div className="filter" />
      </div>
    </>
  );
}

export default ProfilePageHeader;
