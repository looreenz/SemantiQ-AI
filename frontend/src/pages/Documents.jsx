import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
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
import { uuidv7 } from "uuidv7";

import Header from "../components/Header";
import SEO from "../components/SEO";
import PaginationControls from "../components/PaginationControls";

import { getFileExtension } from "../utils/helpers";
import { getData, postData, deleteData } from "../utils/api";

function Documents() {
  // Global state
  const currentUser = useSelector((s) => s.user.user);

  // Local state
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading of document list
  const [fileLoading, setFileLoading] = useState(false); // Loading state for file actions
  const [modalAction, setModalAction] = useState(); // 'upload' or 'delete'
  const [selected, setSelected] = useState(null); // File object (upload) or file ID (delete)
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, success: true }); // Toast for notifications
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Fetch user's documents
  const fetchData = useCallback(async () => {
    const data = await getData(`documents/${currentUser.id}`);
    setFiles(data);
    setLoading(false);
  }, [currentUser.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Upload document to the backend
  const uploadFile = useCallback(async () => {
    setFileLoading(true);
    try {
      await postData(
        "documents/upload",
        { document: selected, id: uuidv7(), user_id: currentUser.id },
        true // FormData upload
      );
      setToast({ show: true, success: true });
      fetchData(); // Refresh document list
    } catch (e) {
      setToast({ show: true, success: false });
      setError(e.response?.data || e.message);
    } finally {
      setFileLoading(false);
      setModalAction(null);
      setSelected(null);
    }
  }, [selected, currentUser.id, fetchData]);

  // Delete selected document
  const deleteFile = useCallback(async () => {
    setFileLoading(true);
    try {
      await deleteData(`documents/delete/${selected}`);
      setToast({ show: true, success: true });
      fetchData(); // Refresh document list
    } catch (e) {
      setToast({ show: true, success: false });
      setError(e.response?.data || e.message);
    } finally {
      setFileLoading(false);
      setModalAction(null);
      setSelected(null);
    }
  }, [selected, fetchData]);

  // Pagination logic
  const paginated = files.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(files.length / perPage);

  // Loading screen
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

      {/* Upload button */}
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

      {/* Empty state */}
      {files.length === 0 ? (
        <div className="text-center py-5">
          <p>No hay documentos</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
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

          {/* Mobile file cards */}
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

          {/* Pagination controls */}
          <PaginationControls page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}

      {/* Modal for upload or delete confirmation */}
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
                <Form.Text className="text-white">Solo formato PDF o txt, máximo 5MB</Form.Text>
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

      {/* Toast notifications */}
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
