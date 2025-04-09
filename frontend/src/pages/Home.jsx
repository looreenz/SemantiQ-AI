import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Card, Modal, Button } from "react-bootstrap";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { logout } from "../utils/api";
import { logoutUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

function Home() {
  const currentUser = useSelector((state) => state.user.user);
  console.log("User: ", currentUser);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    logout();
    dispatch(logoutUser());
    navigate("/login");
  }

  return (
    <>
      <Container
        fluid
        className="py-3 d-flex justify-content-end align-items-center"
      >
        <div className="dropdown">
          <Link
            className="text-decoration-none text-white hover-underline-purple d-flex align-items-center"
            href="#"
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
            {/* Documentos Section */}
            <div className="col-12 col-md-6">
              <Link
                to="/documents"
                className="text-decoration-none"
                aria-label="Ir a la sección de documentos"
              >
                <Card className="rounded-4 border-gradient">
                  <Card.Body>
                    <Card.Title className="d-flex flex-row justify-content-between align-items-center">
                      <div className="text-purple w-100 text-center text-md-start">
                        <i
                          className="bi bi-file-earmark-text pe-1 text-purple"
                          aria-hidden="true"
                        ></i>
                        Documentos
                      </div>
                      <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </Card.Title>
                    <Card.Text>
                      Sube tus documentos PDF o de texto plano para que el
                      modelo pueda procesarlos.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>

            {/* Chat Section */}
            <div className="col-12 col-md-6">
              <Link
                to="/chat"
                className="text-decoration-none"
                aria-label="Ir a la sección de chat"
              >
                <Card className="rounded-4 border-gradient">
                  <Card.Body>
                    <Card.Title className="d-flex flex-row justify-content-between align-items-center">
                      <div className="text-purple w-100 text-center text-md-start">
                        <i
                          className="bi bi-chat pe-1 text-purple"
                          aria-hidden="true"
                        ></i>
                        Chat
                      </div>
                      <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </Card.Title>
                    <Card.Text>
                      Conversa con nuestro modelo para preguntarle todo lo que
                      quieras sobre tus documentos.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>

            {/* History Section */}
            <div className="col-12 col-md-7">
              <Link
                to="/history"
                className="text-decoration-none"
                aria-label="Ir a la sección de historial"
              >
                <Card className="rounded-4 border-gradient">
                  <Card.Body>
                    <Card.Title className="d-flex flex-row justify-content-between align-items-center">
                      <div className="text-purple w-100 text-center text-md-start">
                        <i
                          className="bi bi-clock-history pe-1 text-purple"
                          aria-hidden="true"
                        ></i>
                        Historial
                      </div>
                      <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </Card.Title>
                    <Card.Text>
                      Consulta los mensajes enviados y recibidos cuando quieras.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>

            {/* Statistics Section */}
            <div className="col-12 col-md-5">
              <Link
                to="/stats"
                className="text-decoration-none"
                aria-label="Ir a la sección de estadísticas"
              >
                <Card className="rounded-4 border-gradient">
                  <Card.Body>
                    <Card.Title className="d-flex flex-row justify-content-between align-items-center">
                      <div className="text-purple w-100 text-center text-md-start">
                        <i
                          className="bi bi-bar-chart-line pe-1 text-purple"
                          aria-hidden="true"
                        ></i>
                        Estadísticas
                      </div>
                      <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </Card.Title>
                    <Card.Text>Hazte una idea con las estadísticas.</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
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
