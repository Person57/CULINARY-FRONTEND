import React, { useState } from "react";
import {  Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { TbAlertSquareRounded } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { Formik } from "formik";
import { LogAndRegSchema } from "./LoginValidation";
import { useForgetUserMutation } from "../../redux/api/AuthApi";
import { toast } from "react-toastify";
import BasicButton from "../../components/BasicButton";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [forgetApi, { isLoading }] = useForgetUserMutation();

  const history = useNavigate();

  const handleForgot = async () => {
    try {
      const response = await forgetApi({
        Email: email,
      });
      console.log(response);
      if (response.error.originalStatus === 200) {
        setEmail("");

        history(`/otp/:${email}`);
        toast.success(response.error.data,{autoClose:1000});
        console.log("if part");
        console.log(response.error.data);
      } else {
        toast.success(response.error.data,{autoClose:1000});
        console.log("else part");
        console.log(response.error.data);
      }
    } catch (error) {
      toast("An error occurred while Forget.");
      console.log(error);
    }
  };

  const initialValues = {
    email: "",
  };

  return (
    <>
     
          <Container className="vh-100 d-flex flex-column flex-wrap-wrap justify-content-center align-items-center">
            <Row>
              <Col>
              <img
              src={
                "https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
              }
              width={80}
              className="rounded-circle mb-3"
              alt="..."
            ></img>
              </Col>
            </Row>
            <Row className="shadow p-3 mb-5 bg-body rounded d-flex flex-column justify-content-center align-items-center">
              <Col className="d-flex flex-column justify-content-center align-items-center">
                <TbAlertSquareRounded
                  className="text-secondary"
                  size={"50px"}
                />
                <h5>Forgot Password</h5>
                <p className="text-secondary text-wrap text-center">
                  Enter your email and we'll send you a code to <br></br> reset
                  your password
                </p>
              </Col>
              <Col>
                <Formik
                  initialValues={initialValues}
                  validationSchema={LogAndRegSchema}
                  onSubmit={handleForgot}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <Form className="d-flex flex-column justify-content-center">
                      <Form.Group>
                        <Form.Label htmlFor="email">Email*</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          size="md"
                          id="email"
                          className={`form-control ${
                            touched.email && errors.email ? "is-invalid" : ""
                          }`}
                          onChange={(e) => {
                            setEmail(e.target.value.trim());
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {touched.email && errors.email ? (
                          <p className="text-danger m-1">{errors.email}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <BasicButton
                        className="mt-3 "
                        variant={'warning'}
                        type="button"
                        disabled={isSubmitting}
                        onClick={
                          email === "" || (touched.email && errors.email)
                            ? handleSubmit
                            : handleForgot
                        }
                        isLoading={isLoading}
                        label={"Forgot Password"}
                      />
                      

                      <Link
                        style={{ textDecoration: "none" }}
                        className="text-center mt-3"
                        to={"/"}
                      >
                        <IoIosArrowBack />
                        Back to Login
                      </Link>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
      
    </>
  );
};

export default Forgot;