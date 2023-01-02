import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Alert,
  Form,
  Input,
  Button,
  FormFeedback,
  Label,
  InputGroup,
  UncontrolledTooltip,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

//Import action
import { registerUser, apiError } from "../../redux/actions";

//i18n
import { useTranslation } from "react-i18next";

//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

/**
 * Register component
 * @param {*} props
 */
const Register = (props) => {
  const clearError = () => {
    props.apiError("");
  };

  /* intilize t variable for multi language implementation */
  const { t } = useTranslation();

  const countryNumbers = ["+44", "+90", "+22", "+23", "+232"];

  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState("+44");
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggle2 = () => setDropdownOpen2(!dropdownOpen2);

  useEffect(clearError);

  // validation
  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Enter proper email").required("Required"),
      phone: Yup.string()
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number can't be over 10 digits")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .required("Required"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      props.registerUser(values);
    },
  });

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="text-center mb-4">
                <Link to="/" className="auth-logo mb-5 d-block">
                  <img
                    src={logodark}
                    alt=""
                    height="30"
                    className="logo logo-dark"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="30"
                    className="logo logo-light"
                  />
                </Link>
                <h4>{t("Sign up")}</h4>
                <p className="text-muted mb-4">
                  {t("Get your Chatvia account now")}.
                </p>
              </div>

              <Card>
                <CardBody className="p-4">
                  {props.error && <Alert variant="danger">{props.error}</Alert>}
                  {props.user && (
                    <Alert variant="success">
                      Thank You for registering with us!
                    </Alert>
                  )}
                  <div className="p-3">
                    <Form onSubmit={formik.handleSubmit}>
                      {/* username */}
                      <div className="mb-3">
                        <Label className="form-label">{t("Username")}</Label>
                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                          <span
                            style={{ width: "60px" }}
                            className="input-group-text border-light text-muted d-grid justify-content-center"
                          >
                            <i className="ri-user-2-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Enter Username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            invalid={
                              formik.touched.username && formik.errors.username
                                ? true
                                : false
                            }
                          />
                          {formik.touched.username && formik.errors.username ? (
                            <FormFeedback type="invalid">
                              {formik.errors.username}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                      </div>
                      {/* phone */}
                      <div className="mb-3">
                        <Label className="form-label">{t("Phone")}</Label>
                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                          {/* <span className="input-group-text border-light text-muted">
                            <i className="ri-user-2-line"></i>
                          </span> */}
                          {/* <span style={{width:"60px"}} className="input-group-text border-light text-muted d-grid justify-content-center">*/}
                          <Dropdown
                            nav
                            isOpen={dropdownOpen2}
                            style={{ width: "60px" }}
                            className="btn-group dropdown profile-user-dropdown input-group-text p-0 d-grid justify-content-center"
                            toggle={toggle2}
                          >
                            <DropdownToggle nav className="wdntext1">
                              {selectedPhoneCountry}
                            </DropdownToggle>
                            <DropdownMenu>
                              {countryNumbers.map((i, index) => (
                                <DropdownItem
                                  key={index}
                                  onClick={() => setSelectedPhoneCountry(i)}
                                >
                                  <span className="align-middle">{i}</span>
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                          <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Enter Phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            invalid={
                              formik.touched.phone && formik.errors.phone
                                ? true
                                : false
                            }
                          />
                          {formik.touched.phone && formik.errors.phone ? (
                            <FormFeedback type="invalid">
                              {formik.errors.phone}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                      </div>
                      {/* email */}
                      <div className="mb-3">
                        <Label className="form-label">{t("Email")}</Label>
                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                          <span
                            style={{ width: "60px" }}
                            className="input-group-text border-light text-muted d-grid justify-content-center"
                          >
                            <i className="ri-mail-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Enter Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            invalid={
                              formik.touched.email && formik.errors.email
                                ? true
                                : false
                            }
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <FormFeedback type="invalid">
                              {formik.errors.email}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                      </div>
                      {/* password */}

                      <FormGroup className="mb-4">
                        <Label className="form-label">{t("Password")}</Label>
                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                          <span
                            style={{ width: "60px" }}
                            className="input-group-text border-light text-muted d-grid justify-content-center"
                          >
                            <i className="ri-lock-2-line"></i>
                          </span>
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Enter Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            invalid={
                              formik.touched.password && formik.errors.password
                                ? true
                                : false
                            }
                          />
                          {formik.touched.password && formik.errors.password ? (
                            <FormFeedback type="invalid">
                              {formik.errors.password}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                      </FormGroup>
                      {/* confirm password */}
                      <FormGroup className="mb-4">
                        <Label className="form-label">
                          {t("Password Confirm")}
                        </Label>
                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                          <span
                            style={{ width: "60px" }}
                            className="input-group-text border-light text-muted d-grid justify-content-center"
                          >
                            <i className="ri-lock-2-line"></i>
                          </span>
                          <Input
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            className="form-control form-control-lg bg-soft-light border-light"
                            placeholder="Enter Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmpassword}
                            invalid={
                              formik.touched.confirmpassword &&
                              formik.errors.confirmpassword
                                ? true
                                : false
                            }
                          />
                          {formik.touched.confirmpassword &&
                          formik.errors.confirmpassword ? (
                            <FormFeedback type="invalid">
                              {formik.errors.confirmpassword}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                      </FormGroup>

                      <div className="d-grid">
                        <Button
                          color="primary"
                          block
                          className=" waves-effect waves-light wdncolor wdnborder"
                          type="submit"
                        >
                          Sign up
                        </Button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-muted mb-0">
                          {t("By registering you agree to the")}
                          <Link to="#" className="wdntext1">
                            {t(" Terms of Use")}
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  {t("Already have an account")} ?
                  <Link to="/login" className="font-weight-medium wdntext1">
                    {" "}
                    {t("Signin")}
                  </Link>
                </p>
                <p>© {new Date().getFullYear()}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth;
  return { user, loading, error };
};

export default withRouter(
  connect(mapStateToProps, { registerUser, apiError })(Register)
);
