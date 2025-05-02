import { useState, useEffect } from "react";
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
              {MENU_ITEMS.map((item) => (
                <MenuItem
                  key={item.path}
                  path={item.path}
                  icon={item.icon}
                  label={item.label}
                  active={active}
                  setActive={setActive}
                />
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
            <MenuItem
              path="/login"
              icon="bi bi-box-arrow-in-right"
              label="Iniciar sesión"
              active={active}
              setActive={setActive}
            />
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Aside;
