import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { TfiLock } from "react-icons/tfi";
import { Formik } from "formik";
import { LogAndRegSchema } from "./LoginValidation";
import { useResetPasswordMutation } from "../../redux/api/AuthApi";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BasicButton from "../../components/BasicButton";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [resetApi, { isLoading }] = useResetPasswordMutation();
  const history = useNavigate();
  const { email } = useParams();
  const Email = email.startsWith(":") ? email.slice(1) : email;
  const handleReset = async () => {
    console.log(Email);
    console.log(password);
    try {
      const response = await resetApi({
        Email: Email,
        data: {
          Password: password,
          Repeat_Password: repeatPassword,
        },
      });
      console.log(response);
      if (response.error.originalStatus === 200) {
        setPassword("");
        setRepeatPassword("");
        toast.success(response.error.data, { autoClose: 1000 });
        console.log("if part");
        console.log(response.error.data);
        history("/login");
      } else {
        console.log("else part");
        toast.success(response.error.data, { autoClose: 1000 });
        console.log(response.error.data);
      }
    } catch (error) {
      toast("An error occurred while registering.");
    }
  };
  const showPassword = () => {
    let eye = document.getElementById("password");
    if (eye.type === "password") {
      eye.type = "text";
      setPasswordIcon(true);
    } else {
      eye.type = "password";
      setPasswordIcon(false);
    }
  };
  const showConfirmPassword = () => {
    let eye = document.getElementById("RepeatPassword");
    if (eye.type === "password") {
      eye.type = "text";
      setConfirmPasswordIcon(true);
    } else {
      eye.type = "password";
      setConfirmPasswordIcon(false);
    }
  };
  const initialValues = {
    password: "",
    confirmPassword: "",
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
            <TfiLock className="text-secondary" size={"50px"} />
            <h5>Reset Password</h5>
            <p className="text-secondary text-wrap text-center">
              We have send a Four digit code on your Email
            </p>
          </Col>
          <Col>
            <Formik
              initialValues={initialValues}
              validationSchema={LogAndRegSchema}
              onSubmit={handleReset}
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
                  <Row className="d-flex flex-row justify align-items-center">
                    <Col className="d-flex flex-row justify-end align-items-center">
                      <Form.Label
                        htmlFor="password*"
                        className="d-flex flex-row justify-start"
                      >
                        password <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-row justify-between align-items-center">
                    <Col className="d-flex flex-row justify-content-end align-items-center">
                      <Form.Control
                        name="password"
                        type="password"
                        size="md"
                        id="password"
                        className={`position-relative form-control ${
                          touched.password && errors.password
                            ? "border-danger"
                            : ""
                        }`}
                        onChange={(e) => {
                          setPassword(e.target.value.trim());
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      ></Form.Control>
                      <div
                        className="position-absolute m-2 pointer"
                        onClick={showPassword}
                      >
                        {password ? (
                          <>
                            {!passwordIcon ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </Col>
                  </Row>
                  {touched.password && errors.password ? (
                    <p className="text-danger m-1">{errors.password}</p>
                  ) : (
                    ""
                  )}
                  <Row className="d-flex flex-row justify align-items-center">
                    <Col className="d-flex flex-row justify-end align-items-center">
                      <Form.Label
                        htmlFor="RepeatPassword"
                        className="d-flex flex-row justify-start"
                      >
                        Confirm Password <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row className="d-flex flex-row justify-between align-items-center">
                    <Col className="d-flex flex-row justify-content-end align-items-center">
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        size="md"
                        id="RepeatPassword"
                        className={`position-relative form-control ${
                          touched.confirmPassword && errors.confirmPassword
                            ? "border-danger"
                            : ""
                        }`}
                        onChange={(e) => {
                          setRepeatPassword(e.target.value.trim());
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      ></Form.Control>
                      <div
                        className="position-absolute m-2 pointer"
                        onClick={showConfirmPassword}
                      >
                        {repeatPassword ? (
                          <>
                            {!confirmPasswordIcon ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </Col>
                  </Row>

                  {touched.confirmPassword && errors.confirmPassword ? (
                    <p className="text-danger m-1">{errors.confirmPassword}</p>
                  ) : (
                    ""
                  )}
                  <BasicButton
                    className="mt-3 "
                    variant={"warning"}
                    type="button"
                    disabled={isSubmitting}
                    onClick={
                      password === "" ||
                      repeatPassword === "" ||
                      (touched.password && errors.password) ||
                      (touched.confirmPassword && errors.confirmPassword)
                        ? handleSubmit
                        : handleReset
                    }
                    isLoading={isLoading}
                    label={" Verify"}
                  />
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Reset;
