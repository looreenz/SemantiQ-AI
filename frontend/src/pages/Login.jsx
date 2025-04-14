import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import { login } from "../utils/api";
import SEO from "../components/SEO";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { motion } from "framer-motion";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string()
    .min(6, "Contraseña demasiado corta")
    .max(20, "Contraseña demasiado larga")
    .required("Campo obligatorio"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_LOCAL_API_URL;

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      setLoading(true);
      try {
        const response = await login(
          formik.values.email,
          formik.values.password
        );

        console.log(response);

        // Si el status es 200, redirige
        if (response.status === 200) {
          dispatch(setUser(response.data)); // Guarda el usuario en el store
          navigate("/"); // Redirige a la página de inicio (home)
        }
      } catch (error) {
        setError("Credenciales incorrectas.");
        setLoading(false);
        console.error(error); // Muestra el error en la consola para depuración
      }
    },
  });

  function handleGoogle() {
    window.location.href = `${API_URL}/auth/google/redirect`;
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-grey">
      <SEO
        title="Inicio de sesión"
        description="Accede a tu cuenta para utilizar SemantiQ AI y consultar documentos con inteligencia artificial."
        endpoint="login"
      ></SEO>
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
                  style={{ maxWidth: "130px" }}
                />
              </div>
              <Card className="p-4 border-0">
                <Form
                  onSubmit={formik.handleSubmit}
                  className="py-3 px-4 rounded-4"
                  aria-labelledby="formTitle"
                >
                  <div
                    id="formTitle"
                    className="text-center fs-3 text-white fw-bold"
                    role="heading"
                    aria-level="1"
                  >
                    Inicio de Sesión
                  </div>

                  {/* Email Input */}
                  <Form.Group className="mb-3 mt-4">
                    <Form.Label htmlFor="email" className="visually-hidden">
                      Correo electrónico
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Correo electrónico"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="w-100 border-purple text-white"
                      aria-describedby="emailError"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div id="emailError" className="text-danger" role="alert">
                        {formik.errors.email}
                      </div>
                    )}
                  </Form.Group>

                  {/* Password Input */}
                  <Form.Group className="mb-3 mt-4">
                    <Form.Label htmlFor="password" className="visually-hidden">
                      Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Contraseña"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="w-100 border-purple text-white"
                      aria-describedby="passwordError"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div
                        id="passwordError"
                        className="text-danger"
                        role="alert"
                      >
                        {formik.errors.password}
                      </div>
                    )}
                  </Form.Group>

                  {/* General error */}
                  {error && (
                    <div className="text-danger text-center" role="alert">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Form.Group className="mb-3 mt-4">
                    <Button
                      disabled={loading}
                      type="submit"
                      className="w-100 bg-purple border-purple fw-bold p-2"
                      aria-live="polite"
                    >
                      {loading ? (
                        <Spinner role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        "Iniciar Sesión"
                      )}
                    </Button>

                    {/* Google login button */}
                    <div className="d-flex align-items-center my-3">
                      <hr className="flex-grow-1" />
                      <span className="mx-2 text-secondary">O</span>
                      <hr className="flex-grow-1" />
                    </div>
                    <Button
                      onClick={handleGoogle}
                      className="w-100 d-flex gap-2 align-items-center justify-content-center mb-3 bg-gradient border-gradient"
                      aria-label="Iniciar sesión con Google"
                    >
                      <i className="bi bi-google" aria-hidden="true"></i>
                      Inicia sesión con Google
                    </Button>
                  </Form.Group>

                  {/* Registration Link */}
                  <p className="pt-2 text-center">
                    <Link
                      to="/register"
                      className="text-decoration-none text-white hover-underline-purple"
                      aria-label="Ir a la página de registro"
                    >
                      No tengo una cuenta
                    </Link>
                  </p>
                </Form>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
