import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { LogAndRegSchema } from "./LoginValidation";
import { Formik } from "formik";
import { useOtpVerifyMutation } from "../../redux/api/AuthApi";
import { toast } from "react-toastify";
import { useForgetUserMutation } from "../../redux/api/AuthApi";
import BasicButton from "../../components/BasicButton";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(59);
  const [otpApi] = useOtpVerifyMutation();
  const [resendOtpApi, { isLoading }] = useForgetUserMutation();
  const { email } = useParams();
  const navigate = useNavigate();
  const handleOtpChange = async () => {
    try {
      const response = await otpApi({
        otp: otp,
      });
      console.log(response);
      if (response.error.originalStatus === 200) {
        setOtp("");

        navigate(`/reset/${email}`);
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
  const handleResendOtp = async () => {
    setCounter(59);
    await resendOtpApi({
      Email: email,
    });
  };
  const initialValues = {
    otp: "",
  };
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

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
            <RiLockPasswordLine className="text-secondary" size={"50px"} />
            <h5>Enter Otp</h5>
            <p className="text-secondary text-wrap text-center">
              We have send a Four digit code on your Email
            </p>
          </Col>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <Formik
              initialValues={initialValues}
              validationSchema={LogAndRegSchema}
              onSubmit={handleOtpChange}
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
                <Form>
                  <Col className="d-flex flex-column justify-content-center align-items-center">
                    <OtpInput
                      value={otp}
                      onChange={(value) => {
                        setOtp(value);
                        handleChange("otp")(value);
                      }}
                      numInputs={4}
                      renderSeparator={<span>&nbsp;&nbsp;</span>}
                      renderInput={(props) => (
                        <Form.Control
                          {...props}
                          onBlur={handleBlur("otp")}
                          name="otp"
                          className={`form-control ${
                            touched.otp && errors.otp ? "border-danger" : ""
                          } `}
                        />
                      )}
                    />
                    {touched.otp && errors.otp ? (
                      <p className="text-danger m-1">{errors.otp}</p>
                    ) : (
                      ""
                    )}
                    <BasicButton
                      className="mt-3 "
                      variant={'warning'}
                      type="button"
                      disabled={isSubmitting}
                      onClick={
                        otp === "" || (touched.otp && errors.otp)
                          ? handleSubmit
                          : handleOtpChange
                      }
                      isLoading={isLoading}
                      label={" Verify"}
                    />
                  </Col>
                </Form>
              )}
            </Formik>
            <Col>
              <p className="text-secondary text-wrap text-center">
                Resend OTP in{" "}
                <span className="text-success text-bold fw-6 fs-5">
                  00:{counter > 9 ? "" + counter : "0" + counter}
                </span>
              </p>
            </Col>
            <Col>
              <p
                className="pointer text-bold fw-4 fs-6 textDecoration-underline text-primary"
                onClick={handleResendOtp}
              >
                Resend OTP
              </p>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Otp;