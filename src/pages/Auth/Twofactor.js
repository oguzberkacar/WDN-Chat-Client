import React, { useEffect } from "react";
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
} from "reactstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

//i18n
import { useTranslation } from "react-i18next";

//redux store
import { loginUser, apiError, loginUserTwofactor } from "../../redux/actions";

//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

import Cookies from "js-cookie";
import { LOGIN_USER_SUCCESS } from "../../redux/auth/constants";

/**
 * Twofactor component
 * @param {*} props
 */
const Twofactor = (props) => {
  // useEffect(() => {
  //   Cookies.get("access_token") &&
  //     props.history.push("/dashboard");
  // }, []);

  /* intilize t variable for multi language implementation */
  const { t } = useTranslation();

  const clearError = () => {
    props.apiError("");
  };

  // useEffect(clearError);

  // validation
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Please Enter Your Validation Code"),
    }),
    onSubmit: (values) => {
      props.loginUserTwofactor(props.user, values.code, props.history);
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
              </div>

              <Card>
                <CardBody className="p-4">
                  {props.error && <Alert color="danger">{props.error}</Alert>}
                  <div className="p-3">
                    <Form onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <Label className="form-label">
                          {t("Validation Code")}
                        </Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                          <span
                            className="input-group-text text-muted"
                            id="basic-addon3"
                          >
                            <i className="ri-user-2-line"></i>
                          </span>
                          <Input
                            type="text"
                            id="code"
                            name="code"
                            className="form-control form-control-lg border-light bg-soft-light"
                            placeholder="Enter code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.code}
                            invalid={
                              formik.touched.code && formik.errors.code
                                ? true
                                : false
                            }
                          />
                          {formik.touched.code && formik.errors.code ? (
                            <FormFeedback type="invalid">
                              {formik.errors.code}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>
                      </div>

                      <div className="d-grid">
                        <Button
                          color="primary"
                          block
                          className=" waves-effect waves-light wdncolor wdnborder"
                          type="submit"
                        >
                          {t("Sign in")}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  {t("Don't have an account")} ?{" "}
                  <Link
                    to="register"
                    className="font-weight-medium wdntext1"
                  >
                    {" "}
                    {t("Signup now")}{" "}
                  </Link>{" "}
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
  connect(mapStateToProps, {loginUserTwofactor, apiError })(Twofactor)
);
