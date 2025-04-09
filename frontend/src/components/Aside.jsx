import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { logout } from "../utils/api";
import { Modal, Button, CloseButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";

function Aside() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
          {menuItems.map((item) => (
            <li key={item.path} className="p-2 position-relative">
              {active === item.path && (
                <motion.div
                  layoutId="activeIndicator"
                  className="active rounded-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
            <div className="dropdown">
              <Link
                className="text-decoration-none text-white hover-underline-purple d-flex align-items-center"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentUser?.avatar ? (
                  <img
                  src={currentUser.avatar}
                  alt="Avatar"
                  className="rounded-circle me-1"
                  style={{ width: "24px", height: "24px", objectFit: "cover" }}
                />
                ) : (
                  <i className="bi bi-person px-1" aria-hidden="true"></i>
                )}
                {currentUser?.name.split(" ")[0] || "Usuario"}
              </Link>
              <ul
                className="dropdown-menu p-2 bg-message rounded-4 mt-2"
                aria-labelledby="dropdownMenuLink"
              >
                <li className="p-2">
                  <Link
                    onClick={() => setActive("")}
                    className="dropdown-item bg-message p-0 text-decoration-none text-white hover-underline-purple d-flex align-items-center"
                    to="/terms"
                  >
                    <i
                      className="bi bi-question-circle px-1"
                      aria-hidden="true"
                    ></i>
                    Términos y condiciones
                  </Link>
                </li>
                <li className="p-2">
                  <Link
                    className="dropdown-item bg-message p-0 text-decoration-none text-white hover-underline-purple d-flex align-items-center"
                    href="#"
                    onClick={() => setShowModal(true)}
                  >
                    <i
                      className="bi bi-box-arrow-right px-1"
                      aria-hidden="true"
                    ></i>
                    Cerrar sesión
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        aria-labelledby="modalLogoutLabel"
      >
        <Modal.Header className="bg-grey border-purple">
          <Modal.Title id="modalLogoutLabel">Cerrar Sesión</Modal.Title>
          <button
            onClick={() => setShowModal(!showModal)}
            className="btn btn-close close-btn-purple"
            aria-label="Cerrar ventana modal"
          ></button>
        </Modal.Header>
        <Modal.Body className="bg-grey">
          <p>¿Estás seguro de que deseas cerrar sesión?</p>
        </Modal.Body>
        <Modal.Footer className="bg-grey border-purple">
          <Button
            variant="outline-secondary"
            className="text-purple border-purple"
            onClick={() => setShowModal(!showModal)}
            aria-label="Cancelar cierre de sesión"
          >
            Cerrar
          </Button>
          <Button
            variant="success"
            onClick={handleLogout}
            aria-label="Confirmar cierre de sesión"
          >
            Cerrar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Aside;
