import React, { useState, useCallback, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import SEO from "../components/SEO";

import { login } from "../utils/api";
import { formVariants } from "../utils/animations";
import { setUser } from "../redux/slices/userSlice";

// Yup validation schema for login form
const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Introduce un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(20, "La contraseña no puede superar los 20 caracteres")
    .required("La contraseña es obligatoria"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect to Google OAuth login (handled server-side)
  const handleGoogle = useCallback(() => {
    window.location.href = `${
      import.meta.env.VITE_LOCAL_API_URL
    }/auth/google/redirect`;
  }, []);

  // Handle email/password form submission
  const onSubmit = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      setError("");
      try {
        const { status, data } = await login(email, password);
        if (status === 200) {
          dispatch(setUser(data)); // Store user in Redux
          navigate("/"); // Go to home
        } else {
          setError("Error desconocido. Intenta de nuevo más tarde.");
        }
      } catch (err) {
        if (err?.response?.status === 401) {
          setError("Correo o contraseña incorrectos.");
        } else if (err?.response?.status === 429) {
          setError(
            "Demasiados intentos. Espera un momento e inténtalo de nuevo."
          );
        } else if (err?.response?.status === 500) {
          setError("Error del servidor. Intenta más tarde.");
        } else if (err?.message === "Network Error") {
          setError(
            "No se pudo conectar con el servidor. Revisa tu conexión a internet."
          );
        } else {
          setError("Ocurrió un error inesperado. Intenta de nuevo.");
        }
      } finally {
        setLoading(false);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-grey">
      {/* SEO metadata */}
      {/* <SEO
        title="Inicio de sesión"
        description="Accede a tu cuenta para usar SemantiQ AI."
      /> */}

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            {/* Animated card container */}
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

              {/* Login form card */}
              <Card className="py-4 border-0 w-100 mx-auto">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={onSubmit}
                >
                  {() => (
                    <FormikForm className="py-3 px-4 rounded-4">
                      <h2 className="text-center fs-3 text-white fw-bold mb-4">
                        Inicio de Sesión
                      </h2>

                      {/* Email and password fields */}
                      {[
                        {
                          name: "email",
                          type: "email",
                          placeholder: "Correo electrónico",
                          errorId: "emailError",
                        },
                        {
                          name: "password",
                          type: "password",
                          placeholder: "Contraseña",
                          errorId: "passwordError",
                        },
                      ].map(({ name, type, placeholder, errorId }) => (
                        <div className="mb-3" key={name}>
                          <Field
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            className="form-control border-purple text-white rounded-4"
                            aria-describedby={errorId}
                          />
                          <ErrorMessage
                            name={name}
                            component="div"
                            className="text-danger"
                            id={errorId}
                          />
                        </div>
                      ))}

                      {/* Display error if login fails */}
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
                          "Iniciar Sesión"
                        )}
                      </Button>

                      {/* Divider */}
                      <div className="d-flex align-items-center my-3">
                        <hr className="flex-grow-1" />
                        <span className="mx-2 text-secondary">O</span>
                        <hr className="flex-grow-1" />
                      </div>

                      {/* Google login button */}
                      <Button
                        onClick={handleGoogle}
                        className="w-100 d-flex gap-2 justify-content-center mb-3 bg-gradient border-gradient rounded-4"
                      >
                        <i className="bi bi-google" /> Continúa con Google
                      </Button>

                      {/* Link to registration */}
                      <p className="text-center">
                        <Link
                          to="/register"
                          className="text-decoration-none text-white hover-underline-purple"
                        >
                          No tengo una cuenta
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

export default memo(Login);
