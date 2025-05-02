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
  const currentUser = useSelector((state) => state.user.user);
  console.log("User: ", currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    logout();
    dispatch(logoutUser());
    navigate("/login");
  }

  return (
    <>
      <SEO
        title="Inicio"
        description="SemantiQ AI es una plataforma inteligente para analizar y consultar documentos mediante inteligencia artificial."
      ></SEO>
      <Container
        fluid
        className="py-3 d-flex justify-content-end align-items-center"
      >
        <UserDropdown currentUser={currentUser} onLogout={handleLogout} />
      </Container>
      <Container className="d-flex min-vh-100 flex-column justify-content-center align-items-center">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
                className="text-center"
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
            </div>
          </div>
        </div>

        <motion.div
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          className="text-center"
        >
          <div className="row g-3 w-100 w-xxl-75 mx-auto text-center text-md-start">
            {HOME_CARDS.map((card, idx) => (
              <HomeCard key={idx} {...card} />
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          className="text-center"
        >
          <div className="row">
            <div className="col-12">
              <div className="d-flex p-4 justify-content-center align-items-center align-self-bottom">
                <p className="text-secondary m-0 text-center">
                  Hecho con el ❤️ por Lorenzo Cremonese
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </>
  );
}

export default Home;
