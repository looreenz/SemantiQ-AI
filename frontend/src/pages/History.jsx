import React, { useState, useEffect, useMemo, memo } from "react";
import { Container, Table, Spinner, Button } from "react-bootstrap";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { getData } from "../utils/api";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function History() {
  const currentUser = useSelector((s) => s.user.user);
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    (async () => {
      const data = await getData(`messages/${currentUser.id}`);
      setMsgs(data);
      setLoading(false);
    })();
  }, [currentUser.id]);

  const grouped = useMemo(() => {
    const sorted = [...msgs].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    return sorted.reduce((acc, m) => {
      const d = new Date(m.created_at).toLocaleDateString("es-ES");
      acc[d] = acc[d] || [];
      acc[d].push(m);
      return acc;
    }, {});
  }, [msgs]);

  const pages = Math.ceil(msgs.length / perPage);
  const slice = useMemo(
    () => msgs.slice((page - 1) * perPage, page * perPage),
    [msgs, page]
  );
  const slicedGrouped = useMemo(() => {
    const res = {};
    slice.forEach((m) => {
      const d = new Date(m.created_at).toLocaleDateString("es-ES");
      if (!res[d]) res[d] = [];
      res[d].push(m);
    });
    return res;
  }, [slice]);

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
      {Object.entries(slicedGrouped).map(([date, items]) => (
        <div key={date} className="w-100 w-xl-75 mx-auto py-3 border-bottom border-message">
          <h4 className="w-75 mx-auto text-center text-md-start">{date}</h4>
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
      ))}
      <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <Button
          className="bg-purple border-purple fw-bold"
          onClick={() => setPage((p) => p - 1)}
          disabled={page <= 1}
        >
          <i className="bi bi-arrow-left" aria-hidden="true"></i>
        </Button>
        <span>
          Página {page} de {pages}
        </span>
        <Button
          className="bg-purple border-purple fw-bold"
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= pages}
        >
          <i className="bi bi-arrow-right" aria-hidden="true"></i>
        </Button>
      </div>
    </Container>
  );
}

export default memo(History);
