import { useState, useEffect } from "react";
import { Container, Table, Spinner, Button } from "react-bootstrap";
import Header from "../components/Header";
import SEO from "../components/SEO";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { getData } from "../utils/api";
import { useSelector } from "react-redux";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const currentUser = useSelector((state) => state.user.user);

  // Formatear la fecha a un formato más legible
  function formatDate(dateISO) {
    const date = new Date(dateISO);
    const today = new Date();

    // Compara la fecha sin horas, minutos y segundos
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      return "Hoy";
    } else {
      const formattedDate = date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return formattedDate;
    }
  }

  // Función para agrupar los mensajes por fecha
  const groupMessagesByDate = (messages) => {
    return messages
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Ordenar por fecha descendente
      .reduce((acc, message) => {
        const messageDate = formatDate(message.created_at); // Agrupar por la fecha (sin hora)
        if (!acc[messageDate]) {
          acc[messageDate] = [];
        }
        acc[messageDate].push(message);
        return acc;
      }, {});
  };

  // Fetch de los mensajes desde la API
  const dataFetch = async () => {
    try {
      const data = await getData(`messages/${currentUser.id}`);
      setHistory(data);
      setCurrentPage(1);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener los mensajes cuando el componente se monta
  useEffect(() => {
    dataFetch();
  }, []);

  const paginatedHistory = history
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  // Agrupar los mensajes por fecha
  const groupedMessages = groupMessagesByDate(paginatedHistory);

  return (
    <Container>
      <SEO
        title="Historial"
        description="Revisa todas las preguntas que has realizado y las respuestas obtenidas mediante la IA de SemantiQ AI."
        endpoint="history"
      ></SEO>
      <Header title="Historial" />
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando historial...</p>
        </div>
      ) : (
        <>
          {Object.keys(groupedMessages).map((date, index) => (
            <div key={index} className="py-3 border-bottom border-message">
              <div className="w-100 w-xl-75 w-xxl-100 mx-auto d-flex justify-content-between align-items-center">
                <h4
                  className="w-100 text-center text-md-start"
                  id={`date-${index}`}
                >
                  {date}
                </h4>
              </div>

              <Table
                hover
                className="w-100 w-xl-75 w-xxl-100 mx-auto d-none d-md-table"
                aria-labelledby={`date-${index}`}
              >
                <thead>
                  <tr>
                    <th
                      className="py-3 w-25 rounded-3 rounded-bottom-0 rounded-end-0"
                      scope="col"
                    >
                      Usuario
                    </th>
                    <th
                      className="py-3 rounded-3 rounded-bottom-0 rounded-start-0"
                      scope="col"
                    >
                      Mensaje
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupedMessages[date].map((message) => (
                    <motion.tr
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      key={message.id}
                      aria-live="polite"
                    >
                      <td>
                        {message.question_id !== null
                          ? "Semantiq"
                          : currentUser.name}
                      </td>
                      <td>{message.message}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </Table>

              {/* Versión móvil como "tarjetas" */}
              <div className="d-md-none">
                {groupedMessages[date].map((message) => (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    key={message.id}
                    className="file-card border-gradient w-75 mx-auto p-3 mb-3 rounded-3 shadow-sm text-center"
                    aria-labelledby={`message-${message.id}`}
                  >
                    <p id={`message-${message.id}`} className="text-break">
                      <strong>Usuario:</strong>{" "}
                      {message.question_id !== null
                        ? "Semantiq"
                        : currentUser.name}
                    </p>
                    <p>
                      <strong>Mensaje:</strong> {message.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
      <div className="d-flex justify-content-center align-items-center my-4 gap-3">
        <Button
          className="bg-purple border-purple fw-bold"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <i className="bi bi-arrow-left" aria-hidden="true"></i>
        </Button>
        <span>Página {currentPage}</span>
        <Button
          className="bg-purple border-purple fw-bold"
          disabled={currentPage * itemsPerPage >= history.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <i className="bi bi-arrow-right" aria-hidden="true"></i>
        </Button>
      </div>
    </Container>
  );
}

export default History;
