import React, { useState, useCallback, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { login } from "../utils/api";
import SEO from "../components/SEO";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { motion } from "framer-motion";

const LoginSchema = Yup.object({
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string().min(6).max(20).required("Campo obligatorio"),
});

function Login() {
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
    async ({ email, password }) => {
      setLoading(true);
      try {
        const { status, data } = await login(email, password);
        if (status === 200) {
          dispatch(setUser(data));
          navigate("/");
        }
      } catch {
        setError("Credenciales incorrectas.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-grey">
      <SEO
        title="Inicio de sesión"
        description="Accede a tu cuenta para usar SemantiQ AI."
      />
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} xxl={4}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="text-center mb-4">
                <img
                  src="/logoPrimary.svg"
                  alt="Logo SemantiQ AI"
                  className="img-fluid"
                  style={{ maxWidth: 130 }}
                />
              </div>
              <Card className="p-4 border-0">
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
                            className="form-control border-purple text-white"
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

                      {error && (
                        <div className="text-danger text-center mb-3">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-100 bg-purple border-purple fw-bold p-2"
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Iniciar Sesión"
                        )}
                      </Button>

                      <div className="d-flex align-items-center my-3">
                        <hr className="flex-grow-1" />
                        <span className="mx-2 text-secondary">O</span>
                        <hr className="flex-grow-1" />
                      </div>

                      <Button
                        onClick={handleGoogle}
                        className="w-100 d-flex gap-2 justify-content-center mb-3 bg-gradient border-gradient"
                      >
                        <i className="bi bi-google" /> Continúa con Google
                      </Button>

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
