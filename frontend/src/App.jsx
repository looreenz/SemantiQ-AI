import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents";
import History from "./pages/History";
import Stats from "./pages/Stats";
import Terms from "./pages/Terms";
import Error404 from "./pages/Error404";

import Aside from "./components/Aside";
import Consent from "./components/Consent";
import LoginSuccess from "./components/LoginSuccess";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation(); // Track current route

  // Routes that require authentication
  const protectedRoutes = [
    { path: "/", element: <Home /> },
    { path: "/chat", element: <Chat /> },
    { path: "/documents", element: <Documents /> },
    { path: "/history", element: <History /> },
    { path: "/stats", element: <Stats /> },
    { path: "/terms", element: <Terms /> },
  ];

  return (
    <Container fluid>
      {/* Show minimal layout for auth-related pages */}
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
          {/* Show sidebar only if not on root path ("/") */}
          {location.pathname !== "/" && (
            <Aside
              role="complementary"
              aria-label="Barra lateral de navegación"
            />
          )}

          {/* Main content area */}
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

      {/* Cookie consent component */}
      <Consent />
    </Container>
  );
}

export default App;
