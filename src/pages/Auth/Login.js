import React, { useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//i18n
import { useTranslation } from 'react-i18next';

//redux store
import { loginUser, apiError } from '../../redux/actions';

//Import Images
import logodark from '../../assets/images/logo-dark.png';
import logolight from '../../assets/images/logo-light.png';

import Cookies from 'js-cookie';

/**
 * Login component
 * @param {*} props
 */
const Login = (props) => {
	/* intilize t variable for multi language implementation */
	const { t } = useTranslation();

	const clearError = () => {
		props.apiError('');
	};

	// validation
	const formik = useFormik({
		initialValues: {
			email: 'oguztest1',
			password: '123456',
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Please Enter Your Username'),
			password: Yup.string().required('Please Enter Your Password'),
		}),
		onSubmit: (values) => {
			// props.loginUser(values.email, values.password, props.history);

			var myHeaders = new Headers(); // Creating Header
			myHeaders.append('Content-Type', 'application/json');
			// cors
			myHeaders.append('Access-Control-Allow-Origin', '*');
			myHeaders.append('Access-Control-Allow-Methods', '*');
			myHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
			myHeaders.append('Access-Control-Allow-Credentials', 'true');

			var raw = JSON.stringify({
				username: values.email,
				password: values.password,
				device_id: '1',
			});
			var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow',
			};

			fetch(`https://api.devapp.one/auth/login`, requestOptions)
				.then((response) => {
					return response.text();
				})
				.then((result) => {
					let obj = JSON.parse(result);
					console.log(obj);
					Cookies.set('access_token', obj.access_token);
				})
				.catch((error) => {
					console.log('error', error);
				});
		},
	});

	if (Cookies.get('access_token')) {
		return <Redirect to="/" />;
	}

	return (
		<React.Fragment>
			<div className="account-pages pt-sm-5">
				<Container>
					<Row className="justify-content-center">
						<Col md={8} lg={6} xl={5}>
							<div className="text-center mb-4">
								<Link to="/" className="auth-logo mb-5 d-block">
									<img src={logodark} alt="" height="30" className="logo logo-dark" />
									<img src={logolight} alt="" height="30" className="logo logo-light" />
								</Link>

								<h4>{t('Sign in')}</h4>
								<p className="text-muted mb-4">{t('Sign in to continue')}.</p>
							</div>

							<Card>
								<CardBody className="p-4">
									{props.error && <Alert color="danger">{props.error}</Alert>}
									<div className="p-3">
										<Form onSubmit={formik.handleSubmit}>
											<div className="mb-3">
												<Label className="form-label">{t('Username')}</Label>
												<InputGroup className="mb-3 bg-soft-light rounded-3">
													<span className="input-group-text text-muted" id="basic-addon3">
														<i className="ri-user-2-line"></i>
													</span>
													<Input type="text" id="email" name="email" className="form-control form-control-lg border-light bg-soft-light" placeholder="Enter email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} invalid={formik.touched.email && formik.errors.email ? true : false} />
													{formik.touched.email && formik.errors.email ? <FormFeedback type="invalid">{formik.errors.email}</FormFeedback> : null}
												</InputGroup>
											</div>

											<FormGroup className="mb-4">
												<Label className="form-label">{t('Password')}</Label>
												<InputGroup className="mb-3 bg-soft-light rounded-3">
													<span className="input-group-text text-muted">
														<i className="ri-lock-2-line"></i>
													</span>
													<Input type="password" id="password" name="password" className="form-control form-control-lg border-light bg-soft-light" placeholder="Enter Password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} invalid={formik.touched.password && formik.errors.password ? true : false} />
													{formik.touched.password && formik.errors.password ? <FormFeedback type="invalid">{formik.errors.password}</FormFeedback> : null}
												</InputGroup>
											</FormGroup>

											<div className="form-check mb-4">
												<div className="float-end">
													<Link to="forget-password" className="text-muted font-size-13">
														{t('Forgot password')}?
													</Link>
												</div>
											</div>
											<div className="border-top my-2"></div>
											{props.loading && (
												<div className="d-flex justify-content-center align-items-center my-3">
													<div className="spinner-border" role="status">
														<span className="sr-only"></span>
													</div>
												</div>
											)}
											<div className="d-grid">
												<Button color="primary" block className={`waves-effect waves-light wdncolor wdnborder ${props.loading && 'disabled'}`} type="submit">
													{t('Sign in')}
												</Button>
											</div>
										</Form>
									</div>
								</CardBody>
							</Card>

							<div className="mt-5 text-center">
								<p>
									{t("Don't have an account")} ?{' '}
									<Link to="register" className="font-weight-medium wdntext1">
										{' '}
										{t('Signup now')}{' '}
									</Link>{' '}
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

export default withRouter(connect(mapStateToProps, { loginUser, apiError })(Login));
