import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Muy corto")
    .max(20, "Maximo 20")
    .required("Requerido"),
  image: yup.string().required("Requerido"),
}); 

  const handleSubmit = (e) => {
  };

  const handleChange = (e) => {
  };

  const handleClose = () => {
  };


export default function MyProfile({ showProfile, setShowProfile }) {

  return (
    !showProfile ? null
    : <div>
        <h2>Perfil</h2>
        <hr />
        <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
        firstName: "",
        lastName: "",
        username: "",
        city: "",
        state: "",
        zip: "",
        terms: false,
        }}
    >
        {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        }) => (
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                as={Col}
                md="4"
                controlId="validationFormikUsername"
            >
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                    @
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.username}
                </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
                />

                <Form.Control.Feedback type="invalid">
                {errors.city}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04">
                <Form.Label>State</Form.Label>
                <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">
                {errors.state}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik05">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={!!errors.zip}
                />

                <Form.Control.Feedback type="invalid">
                {errors.zip}
                </Form.Control.Feedback>
            </Form.Group>
            </Row>
            
            <Button variant="secondary" onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="primary" type="submit">
            Crear destino
            </Button>
        </Form>
        )}
    </Formik>
  </div>
  );
}



/* 
<Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
        firstName: "Mark",
        lastName: "Otto",
        username: "",
        city: "",
        state: "",
        zip: "",
        terms: false,
        }}
    >
        {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        }) => (
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                as={Col}
                md="4"
                controlId="validationFormikUsername"
            >
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                    @
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.username}
                </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
                />

                <Form.Control.Feedback type="invalid">
                {errors.city}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04">
                <Form.Label>State</Form.Label>
                <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">
                {errors.state}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik05">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={!!errors.zip}
                />

                <Form.Control.Feedback type="invalid">
                {errors.zip}
                </Form.Control.Feedback>
            </Form.Group>
            </Row>
            
            <Button variant="secondary" onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="primary" type="submit">
            Crear destino
            </Button>
        </Form>
        )}
    </Formik>


*/