import React from "react";
import { Link } from "react-router-dom";

const UserDropdown = ({ currentUser, setActive = () => {}, setShowModal }) => {
  return (
    <div className="dropdown">
      <Link
        className="text-decoration-none text-white hover-underline-purple d-flex align-items-center"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
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
        {currentUser.name?.split(" ")[0]}
      </Link>

      <ul
        className="dropdown-menu p-2 bg-message rounded-4 mt-2"
        aria-labelledby="dropdownMenuLink"
      >
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
        <li className="p-2">
          <Link
            to="https://github.com/looreenz/SemantiQ-AI"
            target="_blank"
            className="dropdown-item bg-message p-0 text-decoration-none text-white hover-underline-purple d-flex w-100 align-items-center justfy-content-between"
          >
            <span>
              <i className="bi bi-github px-1" aria-hidden="true"></i>
              GitHub
            </span>
            <i className="bi bi-box-arrow-up-right px-1"></i>
          </Link>
        </li>
        <li className="p-2">
          <Link
            onClick={() => setShowModal(true)}
            className="dropdown-item bg-message p-0 text-decoration-none text-white hover-underline-purple d-flex align-items-center"
          >
            <i className="bi bi-box-arrow-right px-1" aria-hidden="true"></i>
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
