import React, { useState, useEffect, useMemo, memo } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import Header from "../components/Header";
import SEO from "../components/SEO";
import PaginationControls from "../components/PaginationControls";

import { getData } from "../utils/api";

function History() {
  // Get the current user from Redux
  const currentUser = useSelector((s) => s.user.user);

  // Local state for messages, loading, and pagination
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 8;

  // Fetch message history on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getData(`messages/${currentUser.id}`);
        setMsgs(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMsgs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUser.id]);

  // String for today's date (used to label "Hoy")
  const todayStr = useMemo(() => new Date().toLocaleDateString("es-ES"), []);

  // Sort messages by newest first
  const sortedMsgs = useMemo(
    () =>
      [...msgs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    [msgs]
  );

  // Total number of pages
  const pages = useMemo(
    () => Math.ceil(sortedMsgs.length / perPage),
    [sortedMsgs.length]
  );

  // Get current page slice
  const slice = useMemo(
    () => sortedMsgs.slice((page - 1) * perPage, page * perPage),
    [sortedMsgs, page]
  );

  // Group current page slice by date
  const slicedGrouped = useMemo(() => {
    return slice.reduce((acc, m) => {
      const d = new Date(m.created_at).toLocaleDateString("es-ES");
      if (!acc[d]) acc[d] = [];
      acc[d].push(m);
      return acc;
    }, {});
  }, [slice]);

  // Dates in descending order for rendering
  const sortedDates = useMemo(
    () => Object.keys(slicedGrouped).sort((a, b) => new Date(b) - new Date(a)),
    [slicedGrouped]
  );

  // Show loading spinner while fetching
  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p>Cargando historial...</p>
      </div>
    );

  return (
    <Container>
      <SEO
        title="Historial"
        description="Revisa tus consultas anteriores."
        endpoint="history"
      />
      <Header title="Historial" />

      {/* If no messages */}
      {sortedDates.length === 0 ? (
        <div className="text-center py-5">
          <p>No hay mensajes</p>
        </div>
      ) : (
        <>
          {/* Grouped messages by date */}
          {sortedDates.map((date) => {
            const items = slicedGrouped[date];
            return (
              <div
                key={date}
                className="w-100 w-xl-75 mx-auto py-3 border-bottom border-message"
              >
                {/* Section heading */}
                <h4 className="w-75 mx-auto text-center text-md-start">
                  {date === todayStr ? "Hoy" : date}
                </h4>

                {/* Desktop table view */}
                <Table hover className="d-none d-md-table mx-auto w-75">
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
                    {items.map((m) => (
                      <motion.tr
                        key={m.id}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <td>{m.question_id ? "Semantiq" : currentUser.name}</td>
                        <td>{m.message}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </Table>

                {/* Mobile card view */}
                <div className="d-md-none">
                  {items.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="file-card p-3 mb-3 rounded-3 shadow-sm text-center"
                    >
                      <p>
                        <strong>Usuario:</strong>{" "}
                        {m.question_id ? "Semantiq" : currentUser.name}
                      </p>
                      <p>
                        <strong>Mensaje:</strong> {m.message}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Pagination controls */}
          <PaginationControls page={page} totalPages={pages} setPage={setPage} />
        </>
      )}
    </Container>
  );
}

export default memo(History);
