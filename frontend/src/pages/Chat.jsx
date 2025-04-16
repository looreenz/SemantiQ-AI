import { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Button,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";
import Header from "../components/Header";
import SEO from "../components/SEO";
import { useSelector, useDispatch } from "react-redux";
import { uuidv7 } from "uuidv7";
import { getData, postData } from "../utils/api";
import { setChatMode } from "../redux/slices/userSlice";

const MODELS = {
  local: "deepseek-r1",
  gpt: "gtp-4o-mini",
  claude: "claude-3.7-sonnet",
  gemini: "gemini-2.0-flash",
};

function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [engine, setEngine] = useState(null);
  const [initProgress, setInitProgress] = useState("");
  const chatMode = useSelector((state) => state.user.chatMode);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({
    message: "",
    variant: "info",
  });
  const messagesEndRef = useRef(null);
  const hasCreatedEngineRef = useRef(false);
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

    setInitProgress(selectedModel.split("-")[0]);
    setEngine(newEngine);
  }

  async function askQuestion() {
    if (!question.trim()) return;

    const newMessageId = uuidv7();
    const newMessage = {
      id: newMessageId,
      user_id: currentUser.id,
      question_id: null,
      message: question,
    };

    setLoading(true);

    try {
      const context = (await getRelevantChunks(question)) || "";
      if (!context) throw new Error("No se pudo obtener el contexto.");

      const prompt = `Si la pregunta contiene un saludo (como 'Hola', 'Buenos días', 'Qué tal', 'Buenas tardes') o una despedida (como 'Adiós', 'Hasta luego', 'Nos vemos'), 
        responde apropiadamente con un saludo o despedida. 
        Basándote en el contexto proporcionado, responde directamente a la pregunta con la respuesta completa. 
        Si el contexto no es relevante o no contiene información suficiente, responde claramente: \"No puedo encontrar una respuesta en el contenido disponible.\" \n
        Contexto: ${context}\n
        Pregunta: ${question}`;
      console.log(prompt);
      const response = await postData("ask", {
        model: chatMode,
        question: question,
        context: context,
      });
      const reply = {
        id: uuidv7(),
        user_id: currentUser.id,
        question_id: newMessageId,
        message: response.content,
      };

      const newReply = { ...reply, question_id: newMessageId };
      await postData("messages", [newMessage, newReply]);

      setMessages((prev) => [...prev, newMessage, newReply]);
      setQuestion("");
    } catch (error) {
      console.error("Error enviando mensaje:", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getRelevantChunks(question) {
    const questionObj = { question: question };
    console.log("Enviando pregunta a postData:", questionObj);
    try {
      const data = await postData("get-chunks", questionObj);
      console.log("Data: ", data);

      if (!data || !data.relevantChunks) {
        throw new Error("No se encontraron chunks relevantes");
      }

      console.log("Contexto recibido:", data.relevantChunks);
      return data.relevantChunks;
    } catch (error) {
      console.error("Error obteniendo chunks relevantes:", error);
      return [];
    }
  }

  async function generateResponse(context) {
    const query = `Si la pregunta contiene un saludo (como 'Hola', 'Buenos días', 'Qué tal', 'Buenas tardes') 
    o una despedida (como 'Adiós', 'Hasta luego', 'Nos vemos'), responde apropiadamente con un saludo o despedida. 
    Basándote en el contexto proporcionado, responde directamente a la pregunta con la respuesta completa. 
    Si el contexto no es relevante o no contiene información suficiente, responde claramente: \"No puedo encontrar una respuesta en el contenido disponible.\" \n
    Contexto: ${context}\n
    Pregunta: ${question}`;

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
      user_id: currentUser.id,
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
  }, []);

  // useEffect(() => {
  //   if (chatMode === "local" && !hasCreatedEngineRef.current) {
  //     setToastContent({
  //       message: "Inicializando modelo local. Puede tardar unos segundos...",
  //       variant: "info",
  //     });
  //     setShowToast(true);
  //     createEngine().then(() => {
  //       setToastContent({
  //         message: "Modelo local listo para usar.",
  //         variant: "success",
  //       });
  //       setShowToast(true);
  //     });
  //     hasCreatedEngineRef.current = true;
  //   }
  // }, [chatMode]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <SEO
        title="Chat"
        description="Haz preguntas en lenguaje natural sobre tus documentos y obtén respuestas inteligentes con tecnología RAG e IA avanzada."
        endpoint="chat"
      ></SEO>
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
                message.question_id !== null ? "start" : "end"
              } mb-3`}
            >
              <div
                className={`d-flex flex-column p-3 rounded-4 ${
                  message.question_id !== null
                    ? "message-agent"
                    : "message-user"
                }`}
                aria-label={`Mensaje de ${
                  message.question_id !== null ? "Semantiq" : "Tú"
                }`}
              >
                <span
                  className={`d-flex justify-content-${
                    message.question_id !== null ? "start" : "end"
                  }`}
                >
                  <img
                    className={`img-fluid ${
                      message.question_id === null && "rounded-circle"
                    } pb-2`}
                    style={{ width: "30px" }}
                    src={
                      message.question_id !== null
                        ? "/logoPrimary.svg"
                        : currentUser.avatar
                    }
                    alt=""
                  />
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
        <Form className="d-flex flex-column p-3 rounded-4 chat-input">
          <Form.Control
            as="textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                askQuestion();
              }
            }}
            placeholder="Escribe tu pregunta"
            className="border-0 p-0 text-white"
            rows={1}
            aria-label="Escribe tu pregunta"
            aria-required="true"
          />
          <div className="d-flex justify-content-end">
            <div className="position-relative w-auto d-none d-md-flex align-items-center model-select-wrapper">
              <Form.Select
                className="model-select py-0 rounded-4"
                value={chatMode}
                onChange={(e) => dispatch(setChatMode(e.target.value))}
              >
                <option value="gpt">ChatGPT</option>
                <option value="claude">Claude</option>
                <option value="gemini">Gemini</option>
                <option value="local">Modelo Local</option>
              </Form.Select>
              <i
                className="bi bi-chevron-down custom-select-icon"
                aria-hidden="true"
              ></i>
            </div>

            <Button
              variant=""
              className="align-self-end border-0 py-0 pe-0"
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
          </div>
        </Form>
        <small aria-live="polite">
          {MODELS[chatMode] ?? "Modelo no definido"}
        </small>
      </Container>

      <ToastContainer
        position="bottom-end"
        className="p-3"
        role="status"
        aria-live="polite"
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={toastContent.variant === "success" ? 10000 : undefined}
          autohide={toastContent.variant === "success"}
        >
          <Toast.Body className={`d-flex align-items-center gap-2 rounded-4`}>
            <i
              className={`bi ${
                toastContent.variant === "success"
                  ? "bi-check-circle-fill"
                  : "bi-info-circle-fill"
              } text-${toastContent.variant} `}
              aria-hidden="true"
            ></i>
            <span className={`text-${toastContent.variant} `}>
              {toastContent.message}
            </span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default Chat;
