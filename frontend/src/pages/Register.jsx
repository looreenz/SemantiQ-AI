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
import { register } from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { motion } from "framer-motion";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nombre demasiado corto")
    .max(255, "Nombre demasiado largo")
    .required("Campo obligatorio"),
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string()
    .min(6, "Contraseña demasiado corta")
    .max(20, "Contraseña demasiado larga")
    .required("Campo obligatorio"),
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      setLoading(true);
      try {
        const response = await register(
          formik.values.name,
          formik.values.email,
          formik.values.password
        );

        // Si el status es 200, redirige
        if (response.status === 200) {
          dispatch(setUser(response.data));
          navigate("/"); // Redirige a la página de inicio (home)
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
  });

  function handleGoogle() {
    window.location.href = "http://api.semantiqai.daw.iesevalorpego.es/auth/google/redirect";
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-grey">
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
                    Crear cuenta
                  </div>

                  {/* Name Input */}
                  <Form.Group className="mb-3 mt-4">
                    <Form.Label htmlFor="name" className="visually-hidden">
                      Nombre
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className="w-100 border-purple text-white"
                      aria-describedby="nameError"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div id="nameError" className="text-danger" role="alert">
                        {formik.errors.name}
                      </div>
                    )}
                  </Form.Group>

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

                  {/* General Error Message */}
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
                        "Crear cuenta"
                      )}
                    </Button>

                    {/* Divider and Google Login Button */}
                    <div className="d-flex align-items-center my-3">
                      <hr className="flex-grow-1" />
                      <span className="mx-2 text-secondary">O</span>
                      <hr className="flex-grow-1" />
                    </div>
                    <Button
                      onClick={handleGoogle}
                      className="w-100 d-flex gap-2 align-items-center justify-content-center mb-3 bg-gradient border-gradient"
                      aria-label="Regístrate con Google"
                    >
                      <i className="bi bi-google" aria-hidden="true"></i>
                      Regístrate con Google
                    </Button>
                  </Form.Group>

                  {/* Login Link */}
                  <p className="pt-2 text-center">
                    <Link
                      to="/login"
                      className="text-decoration-none text-white hover-underline-purple"
                      aria-label="Ir a la página de inicio de sesión"
                    >
                      Ya tengo una cuenta
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

export default Register;
