import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import BgImage from "../../assets/img/illustrations/signin.svg";
import * as Yup from "yup";
import { userLogin } from "./api/authentication";
import { Formik } from "formik";

export default ({ location, history, setUser }) => {
  const [currentUser, setCurrentUser] = useState([]);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const userinfo = await userLogin(values.email, values.password);
    setUser(userinfo);
    setCurrentUser(userinfo);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <main>
          <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
            <Container>
              <p className="text-center"></p>
              <Row
                className="justify-content-center form-bg-image"
                style={{ backgroundImage: `url(${BgImage})` }}
              >
                <Col
                  xs={12}
                  className="d-flex align-items-center justify-content-center"
                >
                  <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                      <h3 className="mb-0">Sign in</h3>
                    </div>
                    <Form className="mt-4">
                      <Form.Group id="email" className="mb-4">
                        <Form.Label>Your Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control
                            autoFocus
                            required
                            type="email"
                            placeholder="example@company.com"
                          />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Group id="password" className="mb-4">
                          <Form.Label>Your Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              type="password"
                              placeholder="Password"
                            />
                          </InputGroup>
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <Form.Check type="checkbox">
                            <FormCheck.Input
                              id="defaultCheck5"
                              className="me-2"
                            />
                            <FormCheck.Label
                              htmlFor="defaultCheck5"
                              className="mb-0"
                            >
                              Remember me
                            </FormCheck.Label>
                          </Form.Check>
                          <Card.Link className="small text-end">
                            Lost password?
                          </Card.Link>
                        </div>
                      </Form.Group>
                      <Button variant="primary" type="submit" className="w-100">
                        Sign in
                      </Button>
                    </Form>

                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <span className="fw-normal">
                        Not registered?
                        <Card.Link as={Link} to="signin" className="fw-bold">
                          {` Create account `}
                        </Card.Link>
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      )}
    </Formik>
  );
};
