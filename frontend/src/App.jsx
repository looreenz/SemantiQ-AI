
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./pages/Login";
import LoginSuccess from "./components/LoginSuccess";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Aside from "./components/Aside";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents";
import History from "./pages/History";
import Stats from "./pages/Stats";
import Error404 from "./pages/Error404";
import ProtectedRoute from "./components/ProtectedRoute";
import Consent from "./components/Consent";
import Terms from "./pages/Terms";

function App() {
  const location = useLocation();

  const protectedRoutes = [
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/chat", element: <Chat /> },
    { path: "/documents", element: <Documents /> },
    { path: "/history", element: <History /> },
    { path: "/stats", element: <Stats /> },
    { path: "/terms", element: <Terms /> },
  ];

  return (
    <Container fluid>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/login-success" ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      ) : (
        <div className="row">
          {/* Renderizar Aside si no estamos en "/" */}
          {location.pathname !== "/" && (
            <Aside
              role="complementary"
              aria-label="Barra lateral de navegación"
            />
          )}

          <div
            className={
              location.pathname === "/"
                ? "col-12"
                : "col-12 col-xl-10 vh-100 overflow-auto"
            }
            role="main"
          >
            <Routes>
              {protectedRoutes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={<ProtectedRoute>{element}</ProtectedRoute>}
                />
              ))}
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </div>
      )}
      <Consent></Consent>
    </Container>
  );
}

export default App;
