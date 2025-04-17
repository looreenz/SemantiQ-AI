import React, { useState, useEffect, useMemo, memo } from "react";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { Container, Spinner, Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getFileExtensionFromMime } from "../utils/helpers";
import { getData } from "../utils/api";

function Stats() {
  const [data, setData] = useState({ docs: [], messages: [], size: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const docsApi = await getData("documents");
      const msgsApi = await getData("messages");

      const countByType = docsApi.reduce(
        (a, doc) => ((a[doc.type] = (a[doc.type] || 0) + 1), a),
        {}
      );
      const sizeByType = docsApi.reduce((a, doc) => {
        if (!a[doc.type]) a[doc.type] = { total: 0, cnt: 0 };
        a[doc.type].total += doc.size;
        a[doc.type].cnt++;
        return a;
      }, {});

      const formattedDocs = Object.entries(countByType).map(([t, c]) => ({
        name: getFileExtensionFromMime(t),
        count: c,
      }));
      const formattedSize = Object.entries(sizeByType).map(
        ([t, { total, cnt }]) => ({
          name: getFileExtensionFromMime(t),
          avgSize: +(total / cnt / 1024).toFixed(2),
        })
      );

      const last5 = [...Array(5)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString("es-ES");
      });
      const countByDay = last5.reduce((a, day) => ((a[day] = 0), a), {});
      msgsApi.forEach((m) => {
        const d = new Date(m.created_at).toLocaleDateString("es-ES");
        if (d in countByDay) countByDay[d]++;
      });
      const formattedMsgs = last5
        .reverse()
        .map((d) => ({ name: d, count: countByDay[d] }));

      setData({
        docs: formattedDocs,
        size: formattedSize,
        messages: formattedMsgs,
      });
      setLoading(false);
    })();
  }, []);

  const TooltipFormatter = useMemo(
    () =>
      ({ active, payload, label }) =>
        active && payload?.length ? (
          <div>
            <p>{`${label}: ${payload[0].value}`}</p>
          </div>
        ) : null,
    []
  );

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p>Cargando estadísticas...</p>
      </div>
    );

  return (
    <Container fluid>
      <SEO
        title="Estadísticas"
        description="Métricas sobre tus documentos y consultas."
        endpoint="stats"
      />
      <Header title="Estadísticas" />
      <div className="row py-4 g-4">
        {[
          { title: "Documentos por Formato", data: data.docs, key: "count" },
          {
            title: "Mensajes por Día (Últimos 5 días)",
            data: data.messages,
            key: "count",
          },
          {
            title: "Tamaño Promedio por Formato (KB)",
            data: data.size,
            key: "avgSize",
          },
        ].map((conf, idx) => (
          <div
            className={`col-12 col-md-${conf.key === "avgSize" ? 12 : 6}`}
            key={idx}
          >
            <Card
              className="rounded-4 p-2 border-gradient"
              role="region"
              aria-labelledby={`chart-${idx}`}
            >
              <Card.Title
                id={`chart-${idx}`}
                className="text-center fs-4 py-2 text-white"
              >
                {conf.title}
              </Card.Title>
              <ResponsiveContainer height={300} role="img">
                <BarChart data={conf.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<TooltipFormatter />} />
                  <Bar
                    dataKey={conf.key}
                    fill="#27ccee"
                    activeBar={{ fill: "#8b5cf6" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default memo(Stats);
