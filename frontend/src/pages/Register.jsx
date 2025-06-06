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

// Esquema de validació
const RegisterSchema = Yup.object({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(255, "El nombre no puede superar los 255 caracteres")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Introduce un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(20, "La contraseña no puede superar los 20 caracteres")
    .required("La contraseña es obligatoria"),
  terms: Yup.bool().oneOf([true], "Debes aceptar los términos y condiciones"),
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogle = useCallback(() => {
    window.location.href = `${
      import.meta.env.VITE_LOCAL_API_URL
    }/auth/google/redirect`;
  }, []);

  const onSubmit = useCallback(
    async ({ name, email, password }) => {
      setLoading(true);
      setError("");
      try {
        const { status, data } = await register(name, email, password);
        if (status === 200) {
          dispatch(setUser(data));
          navigate("/");
        } else {
          setError("Error desconocido. Intenta de nuevo más tarde.");
        }
      } catch (err) {
        if (err?.response?.status === 409) {
          setError("El correo electrónico ya está registrado.");
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
      {/* <SEO title="Registro de usuario" description="Crea tu cuenta en SemantiQ AI." /> */}
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <motion.div
              initial="initial"
              animate="animate"
              variants={formVariants}
            >
              <div className="text-center mb-4">
                <img
                  src="/logoPrimary.svg"
                  alt="Logo SemantiQ AI"
                  className="img-fluid"
                  style={{ maxWidth: 130 }}
                />
              </div>

              <Card className="py-4 border-0">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    terms: false,
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={onSubmit}
                >
                  {({ isValid, values }) => (
                    <FormikForm className="py-3 px-4 rounded-4">
                      <h2 className="text-center fs-3 text-white fw-bold mb-4">
                        Crear cuenta
                      </h2>

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

                      {/* Checkbox de términos y condiciones */}
                      <div className="form-check mb-3">
                        <Field
                          type="checkbox"
                          name="terms"
                          className="form-check-input check-purple"
                          id="terms"
                        />
                        <label
                          htmlFor="terms"
                          className="form-check-label text-white"
                        >
                          Acepto los{" "}
                          <a
                            href="/terms"
                            className="text-decoration-underline text-purple "
                          >
                            términos y condiciones
                          </a>
                        </label>
                        <ErrorMessage
                          name="terms"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {error && (
                        <div className="text-danger text-center mb-3">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={loading || !values.terms || !isValid}
                        className="w-100 bg-purple border-purple fw-bold p-2 rounded-4"
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Crear cuenta"
                        )}
                      </Button>

                      <div className="d-flex align-items-center my-3">
                        <hr className="flex-grow-1" />
                        <span className="mx-2 text-secondary">O</span>
                        <hr className="flex-grow-1" />
                      </div>

                      <Button
                        onClick={handleGoogle}
                        className="w-100 d-flex gap-2 justify-content-center mb-3 bg-gradient border-gradient rounded-4"
                      >
                        <i className="bi bi-google" /> Regístrate con Google
                      </Button>

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
