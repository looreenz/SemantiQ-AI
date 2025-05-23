import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserDropdown from "../components/UserDropdown";
import MenuItem from "../components/MenuItem";

import { logout } from "../utils/api";
import { logoutUser } from "../redux/slices/userSlice";
import { MENU_ITEMS } from "../utils/consts";

function Aside() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to track current active path and mobile menu toggle
  const [active, setActive] = useState(location.pathname);
  const currentUser = useSelector((state) => state.user.user);

  const collapseRef = useRef(null);

  const closeMobileMenu = () => {
    if (!collapseRef.current) return;

    const collapseEl = collapseRef.current;
    const bsCollapse =
      window.bootstrap?.Collapse.getInstance(collapseEl) ||
      new window.bootstrap.Collapse(collapseEl, { toggle: false });

    if (bsCollapse && collapseEl.classList.contains("show")) {
      bsCollapse.hide();
    }
  };

  // Handle logout: call API, update state, redirect
  function handleLogout() {
    logout(); // API logout
    dispatch(logoutUser()); // Redux: clear user state
    setActive("/chat"); // Reset active item
    navigate("/login"); // Redirect to login
    closeMobileMenu(); // Close mobile menu if open
  }

  const handleMenuItemClick = (path) => {
    setActive(path);
    closeMobileMenu();
  };

  return (
    <div className="col-12 col-xl-2 overflow-hidden z-3">
      {/* Top logo and menu toggle (mobile) */}
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

        {/* Mobile menu toggle button */}
        <nav className="navbar navbar-dark d-xl-none d-flex">
          <div className="container-fluid p-0">
            <button
              className="navbar-toggler text-white border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Navigation menu */}
      <nav
        ref={collapseRef}
        className="collapse navbar-collapse d-xl-block w-100 w-xxl-75"
        id="navbarToggleExternalContent"
      >
        <ul className="list-group list-group-flush">
          {currentUser ? (
            <>
              {MENU_ITEMS.map((item) => (
                <MenuItem
                  key={item.path}
                  path={item.path}
                  icon={item.icon}
                  label={item.label}
                  active={active}
                  setActive={(p) => {
                    setActive(p);
                    closeMobileMenu();
                  }}
                  onClick={() => handleMenuItemClick(item.path)}
                />
              ))}
              <li className="p-2">
                <UserDropdown
                  currentUser={currentUser}
                  setActive={(p) => {
                    setActive(p);
                    closeMobileMenu();
                  }}
                  onLogout={handleLogout}
                />
              </li>
            </>
          ) : (
            <MenuItem
              path="/login"
              icon="bi bi-box-arrow-in-right"
              label="Iniciar sesión"
              active={active}
              setActive={(p) => {
                setActive(p);
                closeMobileMenu();
              }}
              onClick={() => handleMenuItemClick("/login")}
            />
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Aside;
