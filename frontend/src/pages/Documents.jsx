import React, { useState, useEffect, useCallback, memo } from "react";
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
import { getData, postData, deleteData } from "../utils/api";
import { uuidv7 } from "uuidv7";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Documents() {
  const currentUser = useSelector((s) => s.user.user);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileLoading, setFileLoading] = useState(false);
  const [modalAction, setModalAction] = useState(); // 'upload' or 'delete'
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, success: true });
  const [page, setPage] = useState(1);
  const perPage = 10;

  const fetchData = useCallback(async () => {
    const data = await getData(`documents/${currentUser.id}`);
    setFiles(data);
    setLoading(false);
  }, [currentUser.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const uploadFile = useCallback(async () => {
    setFileLoading(true);
    try {
      await postData(
        "documents/upload",
        { document: selected, id: uuidv7(), user_id: currentUser.id },
        true
      );
      setToast({ show: true, success: true });
      fetchData();
    } catch (e) {
      setToast({ show: true, success: false });
      setError(e.response?.data || e.message);
    } finally {
      setFileLoading(false);
      setModalAction(null);
      setSelected(null);
    }
  }, [selected, currentUser.id, fetchData]);

  const deleteFile = useCallback(async () => {
    setFileLoading(true);
    try {
      await deleteData(`documents/delete/${selected}`);
      setToast({ show: true, success: true });
      fetchData();
    } catch (e) {
      setToast({ show: true, success: false });
      setError(e.response?.data || e.message);
    } finally {
      setFileLoading(false);
      setModalAction(null);
      setSelected(null);
    }
  }, [selected, fetchData]);

  const paginated = files.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(files.length / perPage);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p>Cargando documentos...</p>
      </div>
    );
  }

  return (
    <Container>
      <SEO
        title="Documentos"
        description="Gestiona tus documentos."
        endpoint="documents"
      />
      <Header title="Documentos" />

      <div className="w-100 w-xl-75 w-xxl-100 mx-auto d-flex justify-content-center justify-content-xl-end">
        <Button
          onClick={() => setModalAction("upload")}
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
          {paginated.map((f) => {
            const date = new Date(f.created_at).toLocaleDateString("es-ES");
            return (
              <motion.tr
                key={f.id}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                className="align-middle"
                aria-labelledby={`file-${f.id}`}
              >
                <td>{f.name.replace(/\.[^.]+$/, "")}</td>
                <td>{getFileExtension(f.name)}</td>
                <td>{(f.size / 1024).toFixed(2)}</td>
                <td>{date}</td>
                <td>
                  <Button
                    className="danger-hover"
                    onClick={() => {
                      setSelected(f.id);
                      setModalAction("delete");
                    }}
                    variant="outline-danger"
                    aria-label={`Eliminar archivo ${f.name}`}
                  >
                    <i className="bi bi-trash text-danger"></i>
                  </Button>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </Table>

      <div className="d-md-none py-3 border-top border-message">
        {paginated.map((f) => {
          const date = new Date(f.created_at).toLocaleDateString("es-ES");
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="file-card border-gradient w-75 mx-auto p-3 mb-3 rounded-3 shadow-sm text-center"
            >
              <p>
                <strong>Nombre:</strong> {f.name}
              </p>
              <p>
                <strong>Formato:</strong> {getFileExtension(f.name)}
              </p>
              <p>
                <strong>Tamaño (KB):</strong> {(f.size / 1024).toFixed(2)}
              </p>
              <p>
                <strong>Fecha:</strong> {date}
              </p>
              <Button
                onClick={() => {
                  setSelected(f.id);
                  setModalAction("delete");
                }}
                className="danger-hover rounded-4 w-25 mx-auto"
                aria-label={`Eliminar archivo ${f.name}`}
              >
                <i className="bi bi-trash text-danger"></i>
              </Button>
            </motion.div>
          );
        })}
      </div>

      <div className="d-flex justify-content-center align-items-center my-4 gap-3">
        <Button
          className="bg-purple border-purple fw-bold"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page <= 1}
        >
          <i className="bi bi-arrow-left" aria-hidden="true"></i>
        </Button>
        <span>
          Página {page} de {totalPages}
        </span>
        <Button
          className="bg-purple border-purple fw-bold"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
        >
          <i className="bi bi-arrow-right" aria-hidden="true"></i>
        </Button>
      </div>

      <Modal show={modalAction} onHide={() => setModalAction()} centered>
        <Modal.Header className="bg-grey border-purple">
          <Modal.Title>
            {modalAction === "upload" ? "Subir fichero" : "Eliminar fichero"}
          </Modal.Title>
          <button
            onClick={() => setModalAction()}
            className="btn btn-close close-btn-purple"
            aria-label="Cerrar ventana modal"
          ></button>
        </Modal.Header>
        <Modal.Body className="bg-grey">
          {modalAction === "upload" ? (
            <Form className="bg-grey">
              <Form.Group>
                <Form.Control
                  className="text-white"
                  type="file"
                  onChange={(e) => setSelected(e.target.files[0])}
                  aria-label="Seleccionar fichero para subir"
                />
                <Form.Text className="text-white">Máximo 5MB</Form.Text>
              </Form.Group>
            </Form>
          ) : (
            <div>
              <p>¿Estás seguro de que deseas eliminar este documento?</p>
              <p className="badge text-bg-danger m-0">
                Es una acción irreversible.
              </p>
            </div>
          )}
          {error && <div className="text-danger mt-2">{error}</div>}
        </Modal.Body>
        <Modal.Footer className="bg-grey border-purple">
          <Button
            className="text-purple border-purple rounded-4"
            variant="outline-secondary"
            onClick={() => setModalAction()}
            aria-label="Cerrar modal"
          >
            Cancelar
          </Button>
          <Button
            className="rounded-4"
            variant="success"
            onClick={modalAction === "upload" ? uploadFile : deleteFile}
            disabled={fileLoading}
          >
            {fileLoading ? (
              <Spinner animation="border" size="sm" />
            ) : modalAction === "upload" ? (
              "Subir"
            ) : (
              "Eliminar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          show={toast.show}
          bg={toast.success ? "success" : "danger"}
          delay={4000}
          autohide
        >
          <Toast.Body className="text-white rounded-4">
            {toast.success
              ? "Operación realizada con éxito."
              : "Ha ocurrido un error."}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default memo(Documents);
