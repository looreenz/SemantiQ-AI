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
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

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

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-grey">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} xxl={4}>
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
              >
                <div className="text-center fs-3 text-white fw-bold">
                  Inicio de Sesión
                </div>
                <Form.Group className="mb-3 mt-4">
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="w-100 border-purple text-white"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3 mt-4">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="w-100 border-purple text-white"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger">{formik.errors.password}</div>
                  )}
                </Form.Group>
                {error && (
                  <div className="text-danger text-center">{error}</div>
                )}
                <Form.Group className="mb-3 mt-4">
                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-100 bg-purple border-purple fw-bold p-2"
                  >
                    {loading ? (
                      <Spinner role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>
                </Form.Group>
                <p className="pt-2 text-center">
                  <Link
                    to="/register"
                    className="text-decoration-none text-white hover-underline-purple"
                  >
                    No tengo una cuenta
                  </Link>
                </p>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
