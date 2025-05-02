import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import UserDropdown from "../components/UserDropdown";

import { logout } from "../utils/api";
import { logoutUser } from "../redux/slices/userSlice";

function Aside() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    logout();
    dispatch(logoutUser());
    setActive("/chat");
    navigate("/login");
  }

  const menuItems = [
    { path: "/chat", label: "Chat", icon: "bi bi-chat" },
    {
      path: "/documents",
      label: "Documentos",
      icon: "bi bi-file-earmark-text",
    },
    { path: "/history", label: "Historial", icon: "bi bi-clock-history" },
    { path: "/stats", label: "Estadísticas", icon: "bi bi-bar-chart-line" },
  ];

  return (
    <div className="col-12 col-xl-2 overflow-hidden z-3">
      <div className="logo sticky-top p-2 bg-grey d-flex justify-content-between align-items-center">
        <Link
          className="navbar-brand fs-2"
          to="/"
          onClick={() => setActive("/chat")}
          aria-label="Ir al inicio de SemantiQ AI"
        >
          Semanti
          <img
            src="/logoPrimary.svg"
            alt="Logo SemantiQ AI"
            className="logo-img mb-2"
          />
        </Link>
        <nav className="navbar navbar-dark d-xl-none d-flex">
          <div className="container-fluid p-0">
            <button
              className="navbar-toggler text-white border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={`toggler-line ${menuOpen ? "open top" : ""}`}
                aria-hidden="true"
              ></span>
              <span
                className={`toggler-line ${menuOpen ? "open bottom" : ""}`}
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </nav>
      </div>

      <nav
        className="collapse d-xl-block w-100 w-xxl-75"
        id="navbarToggleExternalContent"
      >
        <ul className="list-group list-group-flush">
          {currentUser ? (
            <>
              {menuItems.map((item) => (
                <li key={item.path} className="p-2 position-relative">
                  {active === item.path && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="active rounded-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <Link
                    to={item.path}
                    onClick={() => setActive(item.path)}
                    className="text-decoration-none text-white hover-underline-purple d-flex align-items-center"
                    aria-label={`Ir a ${item.label}`}
                  >
                    <i className={`${item.icon} px-1`} aria-hidden="true"></i>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="p-2">
                <UserDropdown
                  currentUser={currentUser}
                  setActive={setActive}
                  onLogout={handleLogout}
                />
              </li>
            </>
          ) : (
            <li className="p-2">
              <Link
                to="/login"
                onClick={() => setActive("/login")}
                className="text-decoration-none text-white hover-underline-purple d-flex align-items-center"
                aria-label="Ir a login"
              >
                <i
                  className="bi bi-box-arrow-in-right px-1"
                  aria-hidden="true"
                ></i>
                Iniciar sesión
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Aside;
