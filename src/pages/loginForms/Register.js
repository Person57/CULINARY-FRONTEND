import React, { useState, useRef } from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { LogAndRegSchema } from "./LoginValidation";
import { useRegisterUserMutation } from "../../redux/api/AuthApi";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import BasicButton from "../../components/BasicButton";
import "../createpost/PostForm/PostForm.css";
import defaultImage from "../../imges/default-image.png";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [preferences, setpreferences] = useState("");

  const [uploadedImage, setUploadedImage] = useState(null);

  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const history = useNavigate();

  const fileInputRef = useRef(null);

  const [registerApi, { isLoading }] = useRegisterUserMutation();

  const handleRegister = async () => {
    try {
      let finalData = new FormData();

      finalData.append("image", imageFile);

      finalData.append(
        "data",
        JSON.stringify({
          email: email,
          password: password,
          name: name,
          // Repeat_Password: confirmPassword,
          location: location,
          preferences: preferences,
        })
      );

      const response = await registerApi(finalData);

      console.log(response);
      if (response?.data) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success(response?.data?.message, { autoClose: 1000 });
        history("/");
      } else {
        console.log("else part");
        toast.error(response?.error?.data?.message, { autoClose: 1000 });
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
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    preferences: "",
    name: "",
    image: null,
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return; // Exit the function if no file is selected
    }
    setFormData({ ...formData, imageFile: file });
    setImageFile(file);
    setUploadedImage(URL.createObjectURL(file));
    // setErrorMsgState({ imgErrorMsg: false });
  };

  const onClickUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Container className="d-flex flex-column flex-wrap-wrap justify-content-center align-items-center">
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
            <h5>Register</h5>
            <p className="text-secondary">
              Welcome back! Please enter your details
            </p>
          </Col>
          <Col>
            <Formik
              initialValues={initialValues}
              validationSchema={LogAndRegSchema}
              onSubmit={handleRegister}
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
                <Form className="d-flex flex-column justify-content-start">
                  <Row className="d-flex flex-xl-row flex-xxl-row flex-lg-row flex-md-column flex-sm-column flex-column justify-content-between align-items-center">
                    <div className="text-center mb-4">
                      <label htmlFor="file">
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={uploadedImage ?? defaultImage}
                            alt="Uploaded"
                            width={80}
                            height={80}
                            style={{ borderRadius: "50%" }}
                          />
                          <FaPlus
                            style={{
                              position: "absolute",
                              right: 0,
                              bottom: 0,
                              cursor: "pointer",
                              transform: "translate(-50%, -10%)",
                            }}
                          />
                        </div>
                        <input
                          type="file"
                          name="image"
                          id="file"
                          className="d-none"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                      </label>
                      {touched.image && errors.image ? (
                        <p className="text-danger">{errors.image}</p>
                      ) : (
                        <p style={{ width: "100px", height: "10px" }}></p>
                      )}
                    </div>

                    <Col>
                      <Row className="d-flex  flex-row justify align-items-start">
                        <Col className="d-flex flex-row justify-end align-items-start">
                          <Form.Label
                            htmlFor="email"
                            className="d-flex flex-row justify-start"
                          >
                            Email<span className="text-danger">*</span>
                          </Form.Label>
                        </Col>
                      </Row>
                      <Row className="d-flex flex-row justify-between align-items-center">
                        <Col className="d-flex flex-row justify-content-end align-items-center">
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
                          />
                        </Col>
                      </Row>
                      {touched.email && errors.email ? (
                        <p className="text-danger">{errors.email}</p>
                      ) : (
                        <p style={{ width: "100px", height: "10px" }}></p>
                      )}

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
                        <p style={{ width: "100px", height: "10px" }}></p>
                      )}
                      <Row className="d-flex  flex-row justify align-items-center">
                        <Col className="d-flex flex-row justify-end align-items-center">
                          <Form.Label
                            htmlFor="RepeatPassword"
                            className="d-flex flex-row justify-start"
                          >
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
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
                              setConfirmPassword(e.target.value.trim());
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                          ></Form.Control>
                          <div
                            className="position-absolute m-2 pointer"
                            onClick={showConfirmPassword}
                          >
                            {confirmPassword ? (
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
                        <p className="text-danger m-1">
                          {errors.confirmPassword}
                        </p>
                      ) : (
                        <p style={{ width: "100px", height: "10px" }}></p>
                      )}
                    </Col>
                    <Col>
                      <Row className="d-flex  flex-row justify align-items-start">
                        <Col className="d-flex flex-row justify-end align-items-start">
                          <Form.Label
                            htmlFor="name"
                            className="d-flex flex-row justify-start"
                          >
                            Name<span className="text-danger">*</span>
                          </Form.Label>
                        </Col>
                      </Row>
                      <Row className="d-flex flex-row justify-between align-items-center">
                        <Col className="d-flex flex-row justify-content-end align-items-center">
                          <Form.Control
                            name="name"
                            type="text"
                            size="md"
                            id="name"
                            className={`form-control ${
                              touched.name && errors.name ? "is-invalid" : ""
                            }`}
                            onChange={(e) => {
                              setName(e.target.value.trim());
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                          />
                        </Col>
                      </Row>
                      {touched.name && errors.name ? (
                        <p className="text-danger">{errors.name}</p>
                      ) : (
                        <p style={{ width: "100px", height: "10px" }}></p>
                      )}
                      <Row className="d-flex  flex-row justify align-items-start">
                        <Col className="d-flex flex-row justify-end align-items-start">
                          <Form.Label
                            htmlFor="location"
                            className="d-flex flex-row justify-start"
                          >
                            Location<span className="text-danger">*</span>
                          </Form.Label>
                        </Col>
                      </Row>
                      <Row className="d-flex flex-row justify-between align-items-center">
                        <Col className="d-flex flex-row justify-content-end align-items-center">
                          <Form.Select
                            className={`form-control ${
                              touched.location && errors.location
                                ? "border-danger"
                                : ""
                            }`}
                            id="location"
                            name="location"
                            onChange={(e) => {
                              setLocation(e.target.value);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                          >
                            <option value="" disabled selected>
                              ----select Location----
                            </option>
                            <option value={"Chennai"}>Chennai</option>
                            <option value={"Hyderabad"}>Hyderabad</option>
                            <option value={"Bangalore"}>Bangalore</option>
                            <option value={"Kerala"}>Kerala</option>
                          </Form.Select>
                        </Col>
                      </Row>
                      {touched.location && errors.location ? (
                        <p className="text-danger m-1">{errors.location}</p>
                      ) : (
                        <p style={{ width: "100px", height: "10px" }}></p>
                      )}
                      <Row className="d-flex  flex-row justify align-items-start">
                        <Col className="d-flex flex-row justify-end align-items-start">
                          <Form.Label
                            htmlFor="preferences"
                            className="d-flex flex-row justify-start"
                          >
                            preferences<span className="text-danger">*</span>
                          </Form.Label>
                        </Col>
                      </Row>
                      <Row className="d-flex flex-row justify-between align-items-center">
                        <Col className="d-flex flex-row justify-content-end align-items-center">
                          <Form.Select
                            className={`form-control ${
                              touched.preferences && errors.preferences
                                ? "border-danger"
                                : ""
                            }`}
                            id="preferences"
                            name="preferences"
                            onChange={(e) => {
                              setpreferences(e.target.value);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                          >
                            <option value="" disabled selected>
                              ----select Preference----
                            </option>
                            <option value="yellow">Housewife</option>
                            <option value="red">Single</option>
                            <option value="green">Dietitian</option>
                            <option value="blue">Student</option>
                          </Form.Select>
                        </Col>
                      </Row>
                      {touched.preferences && errors.preferences ? (
                        <p className="text-danger m-1">{errors.preferences}</p>
                      ) : (
                        <p style={{ width: "100px", height: "10px" }}></p>
                      )}
                    </Col>
                  </Row>

                  <BasicButton
                    className="mt-3 "
                    variant={"warning"}
                    type="button"
                    disabled={isSubmitting}
                    onClick={
                      email === "" ||
                      password === "" ||
                      confirmPassword === "" ||
                      location === "" ||
                      name === "" ||
                      imageFile === "" ||
                      (touched.email && errors.email) ||
                      (touched.name && errors.name) ||
                      (touched.password && errors.password) ||
                      (touched.confirmPassword && errors.confirmPassword) ||
                      (touched.location && errors.location)
                        ? handleSubmit
                        : handleRegister
                    }
                    isLoading={isLoading}
                    label={"Register"}
                  />

                  <Row className="m-4">
                    <p className="text-center">
                      Already have an account?
                      <Link className="m-1 textDecoration-none" to={"/"}>
                        Login
                      </Link>
                    </p>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
