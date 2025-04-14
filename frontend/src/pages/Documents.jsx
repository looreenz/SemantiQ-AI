import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Table,
  Container,
  Spinner,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { getFileExtension } from "../utils/helpers";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { getData, postData, deleteData } from "../utils/api";
import { uuidv7 } from "uuidv7";
import { useSelector } from "react-redux";

function Documents() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileLoading, setFileLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastSuccess, setToastSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Puedes ajustar este valor
  const currentUser = useSelector((state) => state.user.user);

  function handleUpload() {
    setModalType("Subir");
    setShowModal(true);
    setError(null);
  }

  function formatDate(dateISO) {
    const date = new Date(dateISO);
    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }

  async function uploadFile() {
    if (!fileSelected) return setError("Selecciona un fichero");

    setFileLoading(true);
    try {
      const newId = uuidv7();
      const data = {
        document: fileSelected,
        id: newId,
        user_id: currentUser.id,
      };
      await postData("documents/upload", data, true);
      setToastSuccess(true);
      dataFetch();
    } catch (error) {
      setError(
        "Error al subir el archivo: " + (error.response?.data || error.message)
      );
      setToastSuccess(false);
    } finally {
      setFileLoading(false);
      setFileSelected(null);
      setShowModal(false);
      setShowToast(true);
    }
  }

  function handleDelete(id) {
    setModalType("Eliminar");
    setShowModal(true);
    setFileToDelete(id);
    setError(null);
  }

  async function deleteFile() {
    if (!fileToDelete) return;

    setFileLoading(true);

    try {
      const data = await deleteData(`documents/delete/${fileToDelete}`);
      console.log(data);

      setShowModal(false);
      setFileToDelete(null); // Limpiar el estado
      dataFetch(); // Refrescar la lista de archivos
    } catch (error) {
      setFileLoading(false);
      setError(
        "Error al eliminar el archivo: " +
          (error.response?.data || error.message)
      );
      console.log("Error:", error);
    } finally {
      setFileLoading(false); // Aseguramos que el loading se apague
    }
  }

  function getFileName(filename) {
    return filename.split(".").slice(0, -1).join(".");
  }

  const dataFetch = async () => {
    try {
      const data = await getData(`documents/${currentUser.id}`);
      setFiles(data);
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const paginatedFiles = files.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      <SEO
        title="Documentos"
        description="Sube, gestiona y organiza tus documentos para analizarlos fácilmente con la inteligencia artificial de SemantiQ AI."
        endpoint="documents"
      ></SEO>
      <Header title="Documentos" />
      {loading ? (
        <div className="text-center py-5" aria-live="assertive">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando documentos...</p>
        </div>
      ) : (
        <>
          <div className="w-100 w-xl-75 w-xxl-100 mx-auto d-flex justify-content-center justify-content-xl-end">
            <Button
              onClick={handleUpload}
              className="d-flex gap-2 align-items-center mb-3 bg-gradient border-gradient rounded-4"
              aria-label="Subir fichero"
            >
              <i className="bi bi-plus-circle"></i>
              Subir fichero
            </Button>
          </div>

          <Table
            hover
            className="w-100 w-xl-75 w-xxl-100 mx-auto d-none d-md-table"
            aria-labelledby="table-documents"
          >
            <thead>
              <tr>
                <th
                  className="py-3 rounded-3 rounded-bottom-0 rounded-end-0 w-50"
                  scope="col"
                >
                  Nombre
                </th>
                <th className="py-3" scope="col">
                  Formato
                </th>
                <th className="py-3" scope="col">
                  Tamaño (KB)
                </th>
                <th className="py-3 w-25" scope="col">
                  Fecha
                </th>
                <th
                  className="py-3 rounded-3 rounded-bottom-0 rounded-start-0"
                  scope="col"
                ></th>
              </tr>
            </thead>
            <tbody>
              {paginatedFiles.map((file) => (
                <motion.tr
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  key={file.id}
                  className="align-middle"
                  aria-labelledby={`file-${file.id}`}
                >
                  <td>{getFileName(file.name)}</td>
                  <td>{getFileExtension(file.name)}</td>
                  <td>{(file.size / 1024).toFixed(2)}</td>
                  <td>{formatDate(file.created_at)}</td>
                  <td>
                    <Button
                      className="danger-hover"
                      onClick={() => handleDelete(file.id)}
                      aria-label={`Eliminar archivo ${file.name}`}
                    >
                      <i className="bi bi-trash text-danger"></i>
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </Table>

          {/* Versión móvil como "tarjetas" */}
          <div className="d-md-none py-3 border-top border-message">
            {paginatedFiles.map((file) => (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                key={file.id}
                className="file-card border-gradient w-75 mx-auto p-3 mb-3 rounded-3 shadow-sm text-center"
                aria-labelledby={`file-card-${file.id}`}
              >
                <p>
                  <strong>Nombre:</strong> {file.name}
                </p>
                <p>
                  <strong>Formato:</strong> {getFileExtension(file.name)}
                </p>
                <p>
                  <strong>Tamaño (KB):</strong> {(file.size / 1024).toFixed(2)}
                </p>
                <p>
                  <strong>Fecha:</strong> {formatDate(file.created_at)}
                </p>
                <Button
                  className="danger-hover rounded-4 w-25 mx-auto"
                  onClick={() => handleDelete(file.id)}
                  aria-label={`Eliminar archivo ${file.name}`}
                >
                  <i className="bi bi-trash text-danger"></i>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="d-flex justify-content-center align-items-center my-4 gap-3">
            <Button
              className="bg-purple border-purple fw-bold"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <i className="bi bi-arrow-left" aria-hidden="true"></i>
            </Button>
            <span>Página {currentPage} de {Math.ceil(files.length / itemsPerPage)}</span>
            <Button
              className="bg-purple border-purple fw-bold"
              disabled={currentPage * itemsPerPage >= files.length}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Button>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header className="bg-grey border-purple">
          <Modal.Title>{modalType} fichero</Modal.Title>
          <button
            onClick={() => setShowModal(!showModal)}
            className="btn btn-close close-btn-purple"
            aria-label="Cerrar ventana modal"
          ></button>
        </Modal.Header>

        <Modal.Body className="bg-grey">
          {modalType === "Subir" ? (
            <Form className="bg-grey">
              <Form.Group>
                <Form.Control
                  type="file"
                  className="text-white"
                  onChange={(e) => setFileSelected(e.target.files[0])}
                  aria-label="Seleccionar fichero para subir"
                />
                <Form.Text className="text-white">Máximo 5MB</Form.Text>
              </Form.Group>
            </Form>
          ) : (
            <div>
              <p>¿Estás seguro de que quieres eliminar el fichero?</p>
              <p className="badge text-bg-danger m-0">
                Es una acción irreversible.
              </p>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="bg-grey border-purple">
          <Button
            variant="outline-secondary"
            className="text-purple border-purple rounded-4"
            onClick={() => setShowModal(!showModal)}
            aria-label="Cerrar modal"
          >
            Cerrar
          </Button>
          <Button
            className="rounded-4"
            variant="success"
            onClick={modalType === "Subir" ? uploadFile : deleteFile}
            disabled={fileLoading}
            aria-label={
              modalType === "Subir" ? "Subir fichero" : "Confirmar eliminación"
            }
          >
            {fileLoading ? (
              <Spinner animation="border" size="sm" />
            ) : modalType === "Subir" ? (
              "Subir"
            ) : (
              "Estoy Seguro"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={10000}
          autohide
          aria-live="polite"
        >
          <Toast.Body
            className={`${
              toastSuccess === true ? "text-success" : "text-danger"
            } rounded-4`}
          >
            {toastSuccess === true
              ? "Archivo subido con éxito!"
              : `Error al subir el archivo: ${error}`}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Documents;
