import React, { useState, useEffect, useMemo, memo } from "react";
import { Container, Spinner, Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Header from "../components/Header";
import SEO from "../components/SEO";

import { getFileExtensionFromMime } from "../utils/helpers";
import { getData } from "../utils/api";
import { CHART_CONFIG } from "../utils/consts";

function Stats() {
  // Local state for chart data and loading status
  const [data, setData] = useState({ docs: [], messages: [], size: [] });
  const [loading, setLoading] = useState(true);

  // Fetch documents and messages data on mount
  useEffect(() => {
    (async () => {
      const docsApi = await getData("documents");
      const msgsApi = await getData("messages");

      // Count number of documents per MIME type
      const countByType = docsApi.reduce(
        (acc, doc) => ((acc[doc.type] = (acc[doc.type] || 0) + 1), acc),
        {}
      );

      // Calculate average size per document type
      const sizeByType = docsApi.reduce((acc, doc) => {
        if (!acc[doc.type]) acc[doc.type] = { total: 0, cnt: 0 };
        acc[doc.type].total += doc.size;
        acc[doc.type].cnt++;
        return acc;
      }, {});

      // Format data for charting
      const formattedDocs = Object.entries(countByType).map(([t, c]) => ({
        name: getFileExtensionFromMime(t),
        count: c,
      }));
      const formattedSize = Object.entries(sizeByType).map(
        ([t, { total, cnt }]) => ({
          name: getFileExtensionFromMime(t),
          avgSize: +(total / cnt / 1024).toFixed(2), // Convert bytes to KB
        })
      );

      // Prepare message count by day (last 5 days)
      const last5 = [...Array(5)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString("es-ES");
      });
      const countByDay = last5.reduce((acc, day) => ((acc[day] = 0), acc), {});
      msgsApi.forEach((m) => {
        const d = new Date(m.created_at).toLocaleDateString("es-ES");
        if (d in countByDay) countByDay[d]++;
      });
      const formattedMsgs = last5
        .reverse()
        .map((d) => ({ name: d, count: countByDay[d] }));

      // Set all processed data
      setData({
        docs: formattedDocs,
        size: formattedSize,
        messages: formattedMsgs,
      });
      setLoading(false);
    })();
  }, []);

  // Tooltip component for charts
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

  // Loading indicator
  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p>Cargando estadísticas...</p>
      </div>
    );

  return (
    <Container fluid>
      {/* <SEO
        title="Estadísticas"
        description="Métricas sobre tus documentos y consultas."
        endpoint="stats"
      /> */}
      <Header title="Estadísticas" />

      {/* Statistics dashboard */}
      <div className="row py-4 g-4">
        {data.docs.length == 0 ? (
          <div className="text-center py-5">
            <p>No hay datos disponibles</p>
          </div>
        ) : (
          CHART_CONFIG.map((conf) => (
            <div className={`col-12 col-md-${conf.colSize}`} key={conf.id}>
              <Card
                className="rounded-4 p-2 border-gradient"
                role="region"
                aria-labelledby={conf.id}
              >
                <Card.Title
                  id={conf.id}
                  className="text-center fs-4 py-2 text-white"
                >
                  {conf.title}
                </Card.Title>

                {/* Responsive bar chart */}
                <ResponsiveContainer height={300} role="img">
                  <BarChart data={data[conf.dataKey]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<TooltipFormatter />} />
                    <Bar
                      dataKey={conf.valueKey}
                      fill="#27ccee"
                      activeBar={{ fill: "#8b5cf6" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}

export default memo(Stats);
