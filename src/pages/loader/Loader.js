import * as React from "react";

import { InfinitySpin } from "react-loader-spinner";
import { Container } from "react-bootstrap";

const Loader = () => (
  <Container className="vh-100 d-flex flex-column flex-wrap-wrap justify-content-center align-items-center">
    <InfinitySpin width="200" color="#007BFF"/>
  </Container>
);

export default Loader;
