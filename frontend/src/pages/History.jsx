import { useState, useEffect } from "react";
import { Container, Table, Spinner, Button } from "react-bootstrap";
import Header from "../components/Header";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { getData } from "../utils/api";
import { useSelector } from "react-redux";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar todos los mensajes de un día específico
  /*const deleteMessagesByDate = async (date) => {
    try {
      // Llamar a la API para eliminar los mensajes de esa fecha
      const response = await fetch(
        `http://localhost:8000/api/v1/messages/delete/${date}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Filtrar los mensajes eliminados
        setHistory((prevMessages) =>
          prevMessages.filter(
            (message) => formatDate(message.created_at) !== date
          )
        );
        alert(`Mensajes de ${date} eliminados correctamente.`);
      } else {
        alert("Hubo un error al eliminar los mensajes.");
      }
    } catch (error) {
      console.log("Error al eliminar los mensajes:", error);
    }
  };*/

  // Obtener los mensajes cuando el componente se monta
  useEffect(() => {
    dataFetch();
  }, []);

  // Agrupar los mensajes por fecha
  const groupedMessages = groupMessagesByDate(history);

  return (
    <Container>
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
                {/* Eliminar mensajes por fecha (comentado, pero aún accesible si se reactiva) */}
                {/* <Button
              variant="danger"
              className="d-flex align-items-center gap-2"
              onClick={() => deleteMessagesByDate(date)}
              aria-label="Eliminar todos los mensajes de esta fecha"
            >
              <i className="bi bi-trash"></i>
              Eliminar todos los mensajes
            </Button> */}
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
                      aria-live="polite" // Esto hace que el cambio en la tabla sea anunciado por los lectores de pantalla
                    >
                      <td>
                        {message.user_id === null
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
                      {message.user_id === null ? "Semantiq" : currentUser.name}
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
    </Container>
  );
}

export default History;
