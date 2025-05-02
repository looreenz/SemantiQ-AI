import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import SEO from "../components/SEO";
import UserDropdown from "../components/UserDropdown";
import HomeCard from "../components/HomeCard";

import { logoutUser } from "../redux/slices/userSlice";
import { logout } from "../utils/api";
import { HOME_CARDS } from "../utils/consts";

function Home() {
  // Get user from Redux state
  const currentUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle logout: clear session and redirect to login
  function handleLogout() {
    logout(); // API logout call
    dispatch(logoutUser()); // Redux: remove user state
    navigate("/login"); // Redirect
  }

  return (
    <>
      {/* SEO metadata */}
      <SEO
        title="Inicio"
        description="SemantiQ AI es una plataforma inteligente para analizar y consultar documentos mediante inteligencia artificial."
      />

      <Container fluid className="d-flex flex-column vh-100 overflow-hidden">
        {/* Top navigation bar */}
        <div className="py-3 d-flex justify-content-end align-items-center px-3">
          <UserDropdown currentUser={currentUser} onLogout={handleLogout} />
        </div>

        {/* Main content block */}
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center overflow-hidden px-3">
          {/* Welcome message and logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="text-center mb-4"
          >
            <img
              className="img-fluid w-25 mx-auto p-4"
              src="/logoPrimary.svg"
              alt="Logo SemantiQ AI"
              aria-label="Logo de SemantiQ AI"
            />
            <h1 className="text-center" role="heading" aria-level="1">
              Hola {currentUser.name.split(" ")[0]}👋,{" "}
              <span className="d-block">¿Cómo puedo ayudarte?</span>
            </h1>
            <p className="text-center">
              Sube documentos, habla conmigo y ahórrate mucho tiempo!
            </p>
          </motion.div>

          {/* Cards with actions (upload, chat, history...) */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="w-100"
            style={{ maxHeight: "40vh", overflowY: "auto" }}
          >
            <div className="row g-3 w-100 w-xxl-50 mx-auto text-center text-md-start">
              {HOME_CARDS.map((card, idx) => (
                <HomeCard key={idx} {...card} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          className="text-center p-3"
        >
          <p className="text-secondary m-0 text-center">
            Hecho con el ❤️ por Lorenzo Cremonese
          </p>
        </motion.div>
      </Container>
    </>
  );
}

export default Home;
