import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';

function Home() {
  /*const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setCurrentUser(data.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);*/

  const currentUser = useSelector(state => state.user.user);
  console.log("User: ", currentUser);

  return (
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
              />
              <h1 className="text-center">
                Hola {currentUser.name.split(" ")[0]} 👋, <span className="d-block">como puedo ayudarte?</span>
              </h1>
              <p className="text-center">
                Sube documentos, habla conmigo y ahorrate mucho tiempo!
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
          <div className="col-12 col-md-6">
            <Link to="/documents" className="text-decoration-none">
              <Card className="rounded-4 border-gradient">
                <Card.Body>
                  <Card.Title className="d-flex flex-row justify-content-between align-items-center">
                    <div className="text-purple w-100 text-center text-md-start">
                      <i className="bi bi-file-earmark-text pe-1 text-purple"></i>
                      Documentos
                    </div>
                    <i className="bi bi-arrow-right"></i>
                  </Card.Title>
                  <Card.Text>
                    Sube tus documentos PDF o de texto plano para que el modelo
                    pueda procesarlos.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
          <div className="col-12 col-md-6">
            <Link to="/chat" className="text-decoration-none">
              <Card className="rounded-4 border-gradient">
                <Card.Body>
                  <Card.Title className="d-flex flex-row justify-content-between align-items-center">
                    <div className="text-purple w-100 text-center text-md-start">
                      <i className="bi bi-chat pe-1 text-purple"></i>
                      Chat
                    </div>
                    <i className="bi bi-arrow-right"></i>
                  </Card.Title>
                  <Card.Text>
                    Conversa con nuestro modelo para preguntarle todo lo que
                    quieras sobre tus documentos.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
          <div className="col-12 col-md-7">
            <Link to="/history" className="text-decoration-none">
              <Card className="rounded-4 border-gradient">
                <Card.Body>
                  <Card.Title className="d-flex flex-row justify-content-between align-items-center">
                    <div className="text-purple w-100 text-center text-md-start">
                      <i className="bi bi-clock-history pe-1 text-purple"></i>
                      Historial
                    </div>
                    <i className="bi bi-arrow-right"></i>
                  </Card.Title>
                  <Card.Text>
                    Consulta los mensajes enviados y recibidos cuando quieras.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
          <div className="col-12 col-md-5">
            <Link to="/stats" className="text-decoration-none">
              <Card className="rounded-4 border-gradient">
                <Card.Body>
                  <Card.Title className="d-flex flex-row justify-content-between align-items-center">
                    <div className="text-purple w-100 text-center text-md-start">
                      <i className="bi bi-bar-chart-line pe-1 text-purple"></i>
                      Estadísticas
                    </div>
                    <i className="bi bi-arrow-right"></i>
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
  );
}

export default Home;
