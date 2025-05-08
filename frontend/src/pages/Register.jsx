import React, { useState, useCallback, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import SEO from "../components/SEO";

import { register } from "../utils/api";
import { setUser } from "../redux/slices/userSlice";
import { formVariants } from "../utils/animations";

// Form validation schema using Yup
const RegisterSchema = Yup.object({
  name: Yup.string().min(2).max(255).required("Campo obligatorio"),
  email: Yup.string().email().required("Campo obligatorio"),
  password: Yup.string().min(6).max(20).required("Campo obligatorio"),
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state for error messages and loading spinner
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect to Google OAuth flow
  const handleGoogle = useCallback(() => {
    window.location.href = `${
      import.meta.env.VITE_LOCAL_API_URL
    }/auth/google/redirect`;
  }, []);

  // Handle form submission: create account, store user, redirect
  const onSubmit = useCallback(
    async ({ name, email, password }) => {
      setLoading(true);
      try {
        const { status, data } = await register(name, email, password);
        if (status === 200) {
          dispatch(setUser(data)); // Store user in Redux
          navigate("/"); // Go to homepage
        }
      } catch (err) {
        setError(err.message); // Show error message
      } finally {
        setLoading(false);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-grey">
      {/* Page metadata */}
      {/* <SEO
        title="Registro de usuario"
        description="Crea tu cuenta en SemantiQ AI."
      /> */}

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} xxl={4}>
            {/* Animated entrance */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={formVariants}
            >
              {/* Logo */}
              <div className="text-center mb-4">
                <img
                  src="/logoPrimary.svg"
                  alt="Logo SemantiQ AI"
                  className="img-fluid"
                  style={{ maxWidth: 130 }}
                />
              </div>

              {/* Registration form card */}
              <Card className="p-4 border-0">
                <Formik
                  initialValues={{ name: "", email: "", password: "" }}
                  validationSchema={RegisterSchema}
                  onSubmit={onSubmit}
                >
                  {() => (
                    <FormikForm className="py-3 px-4 rounded-4">
                      <h2 className="text-center fs-3 text-white fw-bold mb-4">
                        Crear cuenta
                      </h2>

                      {/* Form fields: name, email, password */}
                      {[
                        { name: "name", type: "text", placeholder: "Nombre" },
                        {
                          name: "email",
                          type: "email",
                          placeholder: "Correo electrónico",
                        },
                        {
                          name: "password",
                          type: "password",
                          placeholder: "Contraseña",
                        },
                      ].map((field) => (
                        <div className="mb-3" key={field.name}>
                          <Field
                            {...field}
                            className="form-control border-purple text-white rounded-4"
                          />
                          <ErrorMessage
                            name={field.name}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      ))}

                      {/* Display error message if registration fails */}
                      {error && (
                        <div className="text-danger text-center mb-3">
                          {error}
                        </div>
                      )}

                      {/* Submit button */}
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-100 bg-purple border-purple fw-bold p-2 rounded-4"
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Crear cuenta"
                        )}
                      </Button>

                      {/* Divider */}
                      <div className="d-flex align-items-center my-3">
                        <hr className="flex-grow-1" />
                        <span className="mx-2 text-secondary">O</span>
                        <hr className="flex-grow-1" />
                      </div>

                      {/* Google registration */}
                      <Button
                        onClick={handleGoogle}
                        className="w-100 d-flex gap-2 justify-content-center mb-3 bg-gradient border-gradient rounded-4"
                      >
                        <i className="bi bi-google" /> Regístrate con Google
                      </Button>

                      {/* Link to login page */}
                      <p className="text-center">
                        <Link
                          to="/login"
                          className="text-decoration-none text-white hover-underline-purple"
                          aria-label="Ir a la página de inicio de sesión"
                        >
                          Ya tengo una cuenta
                        </Link>
                      </p>
                    </FormikForm>
                  )}
                </Formik>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default memo(Register);
