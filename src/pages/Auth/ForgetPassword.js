import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

//Import formik validation
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
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

//Import actions and helpers
import { forgetPassword, apiError } from "../../redux/actions";

//i18n
import { useTranslation } from "react-i18next";

//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

import Cookies from "js-cookie";

/**
 * Forget Password component
 * @param {*} props
 */
const ForgetPassword = (props) => {
  useEffect(() => {
    if (Cookies.get("access_token")) {
      return <Redirect to="/" />;
    }
  }, []);

  const clearError = () => {
    props.apiError("");
  };

  const [selectedResetMethod, setSelectedResetMethod] = useState("email");
  const countryNumbers = ["+44", "+90", "+22", "+23", "+232"];
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState("+44");
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggle2 = () => setDropdownOpen2(!dropdownOpen2);

  /* intilize t variable for multi language implementation */
  const { t } = useTranslation();

  useEffect(clearError);

  // validation
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      props.forgetPassword(values.email, "email");
    },
  });

  const formikPhone = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number can't be over 10 digits")
        .required("Required"),
    }),
    onSubmit: (values) => {
      props.forgetPassword(values.phone, "phone");
    },
  });

  return (
    <React.Fragment>
      <div className="account-pages pt-sm-5">
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

                <h4>{t("Reset Password")}</h4>
                {/* <p className="text-muted mb-4">{t("Reset Password")}</p> */}
              </div>

              <Card>
                <CardBody className="p-4">
                  <div className="p-3">
                    {props.error && (
                      <Alert variant="danger">{props.error}</Alert>
                    )}

                    <Row className="justify-content-center my-4">
                      <Col className="pr-0">
                        <Button
                          color="primary"
                          className="waves-effect waves-light w-100 wdncolor wdnborder"
                          type="button"
                          onClick={() => {
                            setSelectedResetMethod("email");
                          }}
                        >
                          {t("Email")}
                        </Button>
                      </Col>
                      <Col className="pl-0">
                        <Button
                          color="primary"
                          className="waves-effect waves-light w-100 wdncolor wdnborder"
                          type="button"
                          onClick={() => {
                            setSelectedResetMethod("phone");
                          }}
                        >
                          {t("Phone")}
                        </Button>
                      </Col>
                    </Row>
                    {props.passwordResetStatus ? (
                      <Alert variant="success" className="text-center mb-4">
                        {props.passwordResetStatus}
                      </Alert>
                    ) : (
                      <Alert variant="success" className="text-center mb-4">
                        {t(
                          `Enter your ${
                            selectedResetMethod == "email"
                              ? "Email"
                              : "Phone Number"
                          }  and instructions will be sent to you`
                        )}
                        !
                      </Alert>
                    )}
                    {selectedResetMethod == "email" ? (
                      <Form onSubmit={formik.handleSubmit}>
                        <FormGroup className="mb-4">
                          <Label className="form-label">{t("Email")}</Label>
                          <InputGroup className="mb-3 bg-soft-light rounded-3">
                            <span className="input-group-text border-light text-muted">
                              <i className="ri-mail-line"></i>
                            </span>
                            <Input
                              type="text"
                              id="email"
                              name="email"
                              className="form-control form-control-lg border-light bg-soft-light"
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
                        </FormGroup>

                        <div className="d-grid">
                          <Button
                            color="primary"
                            block
                            className="waves-effect waves-light wdncolor wdnborder"
                            type="submit"
                          >
                            {t("Reset")}
                          </Button>
                        </div>
                      </Form>
                    ) : (
                      <div className="mb-3">
                        <Form onSubmit={formikPhone.handleSubmit}>
                          <FormGroup className="mb-4">
                            <Label className="form-label">{t("Phone")}</Label>
                            <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                              <Dropdown
                                nav
                                isOpen={dropdownOpen2}
                                style={{ width: "60px" }}
                                className="btn-group dropdown profile-user-dropdown input-group-text p-0 d-grid justify-content-center"
                                toggle={toggle2}
                              >
                                <DropdownToggle nav>
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
                                onChange={formikPhone.handleChange}
                                onBlur={formikPhone.handleBlur}
                                value={formikPhone.values.phone}
                                invalid={
                                  formikPhone.touched.phone &&
                                  formikPhone.errors.phone
                                    ? true
                                    : false
                                }
                              />
                              {formikPhone.touched.phone &&
                              formikPhone.errors.phone ? (
                                <FormFeedback type="invalid">
                                  {formikPhone.errors.phone}
                                </FormFeedback>
                              ) : null}
                            </InputGroup>
                          </FormGroup>
                          <div className="d-grid">
                            <Button
                              color="primary"
                              block
                              className="waves-effect waves-light wdncolor wdnborder"
                              type="submit"
                            >
                              {t("Reset")}
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  {t("Remember It")} ?
                  <Link to="login" className="font-weight-medium wdntext2 ms-1">
                    {t("login")}
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
  const { user, loading, error, passwordResetStatus } = state.Auth;
  return { user, loading, error, passwordResetStatus };
};

export default connect(mapStateToProps, { forgetPassword, apiError })(
  ForgetPassword
);
