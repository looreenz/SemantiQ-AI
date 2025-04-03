import { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { uuidv7 } from "uuidv7";
import { getData, postData } from "../utils/api";

function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [engine, setEngine] = useState(null);
  const [initProgress, setInitProgress] = useState("");
  const messagesEndRef = useRef(null);
  const currentUser = useSelector((state) => state.user.user);

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function createEngine() {
    const selectedModel = import.meta.env.VITE_AI_MODEL_ID;

    const initProgressCallback = (initProgress) => {
      console.log(initProgress.text);
      setInitProgress(initProgress.text);
    };

    const newEngine = await CreateMLCEngine(selectedModel, {
      initProgressCallback: initProgressCallback,
    });

    setEngine(newEngine);
  }

  async function askQuestion() {
    if (!question.trim() || !engine) return;

    const newMessageId = uuidv7();
    const newMessage = {
      id: newMessageId,
      user_id: currentUser.id,
      question_id: 0,
      message: question,
    };

    setLoading(true);

    try {
      const context = await getRelevantChunks(question);
      if (!context) throw new Error("No se pudo obtener el contexto.");

      console.log("Contexto: ", context);

      const reply = await generateResponse(context);
      const newReply = { ...reply, question_id: newMessageId };

      const response = await postData("messages", [newMessage, newReply]);

      // 🚨 Corregido: `response.ok` no existe en `axios`
      if (!response || response.error)
        throw new Error("Error al enviar el mensaje");

      setMessages((prevMessages) => [...prevMessages, newMessage, newReply]);
      setQuestion(""); // Limpiar el input
    } catch (error) {
      console.error("Error enviando mensaje:", error.message);
    } finally {
      setLoading(false);
      setQuestion(""); // Limpiar input
    }
  }

  async function getRelevantChunks(question) {
    const questionObj = { question: question };
    console.log("Enviando pregunta a postData:", questionObj);
    try {
      const data = await postData("get-chunks", questionObj);
      console.log("Data: ", data);

      // Verificar si `data.relevantChunks` realmente existe
      if (!data || !data.relevantChunks) {
        throw new Error("No se encontraron chunks relevantes");
      }

      console.log("Contexto recibido:", data.relevantChunks);
      return data.relevantChunks;
    } catch (error) {
      console.error("Error obteniendo chunks relevantes:", error);
      return []; // Devolver un array vacío en caso de error
    }
  }

  async function generateResponse(context) {
    const query = `Basandote en el contexto contesta la pregunta.\nContexto: ${context}\nPregunta: ${question}`;
    console.log("Query: ", query);
    const messages = [
      { role: "system", content: "You are a helpful AI assistant." },
      { role: "user", content: query },
    ];

    const reply = await engine.chat.completions.create({
      messages,
    });

    console.log(reply.choices[0].message.content);
    const newReplyId = uuidv7();
    return {
      id: newReplyId,
      user_id: null,
      message: reply.choices[0].message.content,
    };
  }

  const dataFetch = async () => {
    setIsLoadingMessages(true);
    try {
      const data = (await getData(`messages/${currentUser.id}`)) || [];
      setMessages(data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    dataFetch();
    createEngine();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <Header title="Chat" />

      <Container className="w-75 w-xxl-50 mx-auto overflow-hidden">
        {isLoadingMessages ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" aria-live="assertive">
              <span className="visually-hidden">Cargando mensajes...</span>
            </Spinner>
            <p aria-live="assertive">Cargando mensajes...</p>
          </div>
        ) : messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`d-flex justify-content-${
                message.user_id === null ? "start" : "end"
              } mb-3`}
            >
              <div
                className={`d-flex flex-column p-3 rounded-4 ${
                  message.user_id === null ? "message-agent" : "message-user"
                }`}
                aria-label={`Mensaje de ${
                  message.user_id === null ? "Semantiq" : "Tú"
                }`}
              >
                <span
                  className={`d-flex justify-content-${
                    message.user_id === null ? "start" : "end"
                  }`}
                >
                  {message.user_id === null ? "Semantiq" : "Tú"}
                </span>
                <span>{message.message}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5" aria-live="assertive">
            <p>Hola, ¿cómo puedo ayudarte?</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </Container>

      <Container className="py-2 w-75 w-xxl-50 mx-auto sticky-bottom bg-grey">
        <Form className="d-flex gap-3 p-3 rounded-4 chat-input">
          <Form.Control
            as="textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Evita el salto de línea en el textarea
                askQuestion(); // Envía el mensaje
              }
            }}
            placeholder="Escribe tu pregunta"
            className="border-0 p-0 text-white"
            rows={1}
            aria-label="Escribe tu pregunta"
            aria-required="true"
          />
          <Button
            variant=""
            className="align-self-end border-0"
            onClick={askQuestion}
            disabled={loading}
            aria-label={loading ? "Enviando mensaje..." : "Enviar mensaje"}
          >
            {loading ? (
              <Spinner animation="border" size="sm" aria-hidden="true" />
            ) : (
              <i
                className="bi bi-arrow-up-circle-fill fs-3 send-button"
                aria-hidden="true"
              ></i>
            )}
          </Button>
        </Form>
        <small aria-live="polite">{initProgress}</small>
      </Container>
    </Container>
  );
}

export default Chat;
