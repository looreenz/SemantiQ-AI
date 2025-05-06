import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

// Dropdown menu for the authenticated user
const UserDropdown = ({ currentUser, setActive = () => {}, onLogout }) => {
  const [showModal, setShowModal] = useState(false); // Modal state

  return (
    <>
      {/* User avatar and name (toggle dropdown) */}
      <div className="dropdown">
        <Link
          className="text-decoration-none text-white hover-underline-purple d-flex align-items-center"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {/* Avatar or fallback icon */}
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt="Avatar"
              className="rounded-circle me-1"
              style={{ width: "24px", height: "24px", objectFit: "cover" }}
            />
          ) : (
            <i className="bi bi-person px-1" aria-hidden="true"></i>
          )}
          {/* Show first name only */}
          {currentUser.name?.split(" ")[0]}
        </Link>

        {/* Dropdown menu options */}
        <ul
          className="dropdown-menu p-2 bg-message rounded-4 mt-2"
          aria-labelledby="dropdownMenuLink"
        >
          {/* Link to terms page */}
          <li className="p-2">
            <Link
              onClick={() => setActive("")}
              to="/terms"
              className="dropdown-item bg-message p-0 text-decoration-none text-white hover-underline-purple d-flex align-items-center"
            >
              <i className="bi bi-question-circle px-1" aria-hidden="true"></i>
              Términos y condiciones
            </Link>
          </li>

          {/* External GitHub link */}
          <li className="p-2">
            <Link
              to="https://github.com/looreenz/SemantiQ-AI"
              target="_blank"
              className="dropdown-item bg-message p-0 text-decoration-none text-white hover-underline-purple d-flex gap-2 align-items-center justfy-content-between"
            >
              <span>
                <i className="bi bi-github px-1" aria-hidden="true"></i>
                GitHub
              </span>
              <i className="bi bi-box-arrow-up-right px-1"></i>
            </Link>
          </li>

          {/* Trigger logout confirmation modal */}
          <li className="p-2">
            <Link
              onClick={() => setShowModal(true)}
              className="dropdown-item bg-message p-0 text-decoration-none text-white hover-underline-purple d-flex align-items-center"
            >
              <i className="bi bi-box-arrow-right px-1" aria-hidden="true"></i>
              Cerrar sesión
            </Link>
          </li>

          {/* Trigger delete account confirmation modal */}
          {/* <li className="p-2">
            <Link
              onClick={() => setShowModal(true)}
              className="dropdown-item bg-message p-0 text-decoration-none text-danger hover-underline-purple d-flex align-items-center"
            >
              <i className="bi bi-trash px-1 text-danger" aria-hidden="true"></i>
              Eliminar cuenta
            </Link>
          </li> */}
        </ul>
      </div>

      {/* Logout confirmation modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        aria-labelledby="modalLogoutLabel"
        className="pe-0"
      >
        <Modal.Header className="bg-grey border-purple">
          <Modal.Title id="modalLogoutLabel">Cerrar Sesión</Modal.Title>
          <button
            onClick={() => setShowModal(false)}
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
            className="text-purple border-purple rounded-4"
            onClick={() => setShowModal(false)}
            aria-label="Cancelar cierre de sesión"
          >
            Cerrar
          </Button>
          <Button
            className="rounded-4"
            variant="success"
            onClick={() => {
              onLogout?.(); // Call the logout function passed as prop
              setShowModal(false); // Close modal
            }}
            aria-label="Confirmar cierre de sesión"
          >
            Cerrar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDropdown;
