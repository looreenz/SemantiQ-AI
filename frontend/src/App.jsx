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
  const location = useLocation();

  // Define routes in a separate object for clarity
  const protectedRoutes = [
    { path: "/", element: <Home /> },
    { path: "/chat", element: <Chat /> },
    { path: "/documents", element: <Documents /> },
    { path: "/history", element: <History /> },
    { path: "/stats", element: <Stats /> },
    { path: "/terms", element: <Terms /> },
  ];

  const renderAuthRoutes = () => (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );

  const renderMainContent = () => (
    <div className="row">
      {location.pathname !== "/" && (
        <Aside role="complementary" aria-label="Barra lateral de navegación" />
      )}
      <div
        className={`col-12 ${
          location.pathname === "/" ? "" : "col-xl-10 vh-100 overflow-auto"
        }`}
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
  );

  return (
    <Container fluid>
      {["/login", "/register", "/login-success"].includes(location.pathname)
        ? renderAuthRoutes()
        : renderMainContent()}
      <Consent />
    </Container>
  );
}

export default App;
