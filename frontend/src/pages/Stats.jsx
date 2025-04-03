import { useState, useEffect } from "react";
import Header from "../components/Header";
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
  const [docs, setDocs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sizeData, setSizeData] = useState();

  const fetchDocuments = async () => {
    try {
      const data = await getData("documents");

      const countByType = data.reduce((acc, doc) => {
        acc[doc.type] = (acc[doc.type] || 0) + 1;
        return acc;
      }, {});

      const sizeByType = data.reduce((acc, doc) => {
        if (!acc[doc.type]) {
          acc[doc.type] = { totalSize: 0, count: 0 };
        }
        acc[doc.type].totalSize += doc.size;
        acc[doc.type].count += 1;
        return acc;
      }, {});

      const formattedTypeData = Object.entries(countByType).map(
        ([type, count]) => ({
          name: getFileExtensionFromMime(type),
          count: count,
        })
      );

      const formattedSizeData = Object.entries(sizeByType).map(
        ([type, { totalSize, count }]) => ({
          name: getFileExtensionFromMime(type),
          avgSize: (totalSize / count / 1024).toFixed(2), // Convertir a KB y redondear a 2 decimales
        })
      );

      setDocs(formattedTypeData);
      setSizeData(formattedSizeData);
    } catch (error) {
      console.log("Error al obtener documentos:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const data = await getData("messages");

      const today = new Date();
      const lastFiveDays = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - i);
        return `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
      });

      const countByDay = lastFiveDays.reduce((acc, day) => {
        acc[day] = 0;
        return acc;
      }, {});

      data.forEach((msg) => {
        const msgDate = new Date(msg.created_at);
        const formattedDate = `${msgDate
          .getDate()
          .toString()
          .padStart(2, "0")}/${(msgDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${msgDate.getFullYear()}`;

        if (Object.hasOwn(countByDay, formattedDate)) {
          countByDay[formattedDate]++;
        }
      });

      const formattedMessages = Object.entries(countByDay).map(
        ([day, count]) => ({
          name: day,
          count: count,
        })
      );

      setMessages(formattedMessages.reverse());
    } catch (error) {
      console.log("Error al obtener mensajes:", error);
    }
  };

  useEffect(() => {
    Promise.all([fetchDocuments(), fetchMessages()]).then(() =>
      setLoading(false)
    );
  }, []);

  const CustomTooltip = ({ active, payload, text }) => {
    if (active && payload && payload.length && text) {
      return (
        <div>
          <p className="label">{`${text} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Container fluid="xl">
      <Header title="Estadísticas" />
      {loading ? (
        <div className="text-center py-5" aria-live="polite">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p>Cargando estadísticas...</p>
        </div>
      ) : (
        <div className="row py-4 g-4">
          <div className="col-12 col-md-6">
            <Card
              className="rounded-4 p-2 border-gradient"
              role="region"
              aria-labelledby="doc-format-chart"
            >
              <Card.Title
                className="text-center text-white fs-4 py-2"
                id="doc-format-chart"
              >
                Documentos por Formato
              </Card.Title>
              <ResponsiveContainer
                className="w-100"
                height={300}
                role="img"
                aria-label="Gráfico de documentos por formato"
              >
                <BarChart data={docs}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip text="Cantidad" />} />
                  <Bar
                    dataKey="count"
                    fill="#8b5cf6"
                    activeBar={{ fill: "#6d28d9" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="col-12 col-md-6">
            <Card
              className="rounded-4 p-2 border-gradient"
              role="region"
              aria-labelledby="messages-by-day-chart"
            >
              <Card.Title
                className="text-center text-white fs-4 py-2"
                id="messages-by-day-chart"
              >
                Mensajes por Día (Últimos 5 días)
              </Card.Title>
              <ResponsiveContainer
                className="w-100"
                height={300}
                role="img"
                aria-label="Gráfico de mensajes por día"
              >
                <BarChart data={messages}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip text="Cantidad" />} />
                  <Bar
                    dataKey="count"
                    fill="#22c55e"
                    activeBar={{ fill: "#15803d" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="col-12">
            <Card
              className="rounded-4 p-2 border-gradient"
              role="region"
              aria-labelledby="avg-size-by-format-chart"
            >
              <Card.Title
                className="text-center text-white fs-3 py-2"
                id="avg-size-by-format-chart"
              >
                Tamaño Promedio por Formato (KB)
              </Card.Title>
              <ResponsiveContainer
                className="w-100"
                height={300}
                role="img"
                aria-label="Gráfico de tamaño promedio por formato"
              >
                <BarChart data={sizeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip text="Tamaño" />} />
                  <Bar
                    dataKey="avgSize"
                    fill="#34d399"
                    activeBar={{ fill: "#059669" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Stats;
