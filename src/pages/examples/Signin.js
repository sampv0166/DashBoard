import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

import { Col, Row, Card, Button, Container } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import BgImage from "../../assets/img/illustrations/signin.svg";
import * as Yup from "yup";
import { userLogin } from "./api/authentication";
import { Formik, Form } from "formik";
import TextField from "../components/TextField";
//import useUserInfo from "./useToken";

const getUser = () => {
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  return userInfoFromStorage;
};

export default ({ location, history, setUser }) => {
  const [currentUser, setCurrentUser] = useState([]);

  const redirect = location.search ? location.search.split("=")[1] : "/";



  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const userinfo = await userLogin(values.email, values.password);

    setUser(userinfo);

    setCurrentUser(getUser);

    if (currentUser && currentUser.success) {
      history.push(redirect)
    }
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
          {console.log(formik.values)}
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
                      <TextField label="Email" name="email" type="email" />
                      <TextField
                        label="password"
                        name="password"
                        type="password"
                      />

                      <Button variant="primary" type="submit" className="w-100">
                        Sign in
                      </Button>
                    </Form>

                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <span className="fw-normal">
                        Not registered?
                        <Card.Link as={Link} to="register" className="fw-bold">
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
