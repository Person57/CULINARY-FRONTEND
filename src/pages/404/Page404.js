import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BasicButton from "../../components/BasicButton";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Page404 = () => {
  return (
    <div>
      <Container
        fluid
        className="vh-100  d-flex flex-column  justify-content-center align-items-center"
      >
        <Row className="shaded rounded d-flex flex-column  justify-content-center align-items-center text-center">
          <Col>
            <h1 className="text-bold fs-150">
              4<span className="mainColor">0</span>4
            </h1>
          </Col>
          <Col>
            <p className="text-bold fs-6 fw-bolder">
              THE PAGE YOU REQUESTED COULD NOT FOUND
            </p>
          </Col>
          <Col className="d-flex flex-column  justify-content-center align-items-center text-center">
            <Link className="textDecoration-none" to={"/home"}>
              <BasicButton
                label={"GO TO HOMEPAGE"}
                icon={<FaHome size={20} className="mx-2" />}
                variant={"warning"}
                className={
                  " d-flex align-items-center textDecoration-none border-none outline-none text-bold fs-6 fw-400"
                }
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Page404;
