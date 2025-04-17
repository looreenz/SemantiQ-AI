import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { uuidv7 } from "uuidv7";

import Header from "../components/Header";
import SEO from "../components/SEO";
import { getData, postData } from "../utils/api";
import { setChatMode } from "../redux/slices/userSlice";
import { MODELS } from "../utils/consts";

// Message bubble component
const MessageBubble = React.memo(({ message, isAgent, avatar }) => {
  const alignment = isAgent ? "start" : "end";
  const bubbleClass = isAgent ? "message-agent" : "message-user";

  return (
    <div className={`d-flex justify-content-${alignment} mb-3`}>
      <div
        className={`d-flex flex-column p-3 rounded-4 ${bubbleClass}`}
        aria-label={isAgent ? "Mensaje de Semantiq" : "Mensaje tuyo"}
      >
        <div className={`d-flex justify-content-${alignment}`}>
          <img
            src={isAgent ? "/logoPrimary.svg" : avatar}
            alt=""
            className={isAgent ? "img-fluid" : "img-fluid rounded-circle"}
            style={{ width: 30 }}
          />
        </div>
        <span>{message.message}</span>
      </div>
    </div>
  );
});

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const chatMode = useSelector((state) => state.user.chatMode);
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const endRef = useRef();

  const scrollToBottom = () =>
    endRef.current?.scrollIntoView({ behavior: "smooth" });

  // Fetch existing messages
  const loadMessages = useCallback(async () => {
    setFetching(true);
    try {
      const data = await getData(`messages/${currentUser.id}`);
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching messages", err);
    } finally {
      setFetching(false);
    }
  }, [currentUser.id]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRelevantChunks = useCallback(async (text) => {
    try {
      const { relevantChunks } = await postData("get-chunks", {
        question: text,
      });
      return relevantChunks || "";
    } catch (err) {
      console.error("Error fetching context", err);
      return "";
    }
  }, []);

  const askQuestion = useCallback(async () => {
    if (!question.trim()) return;
    setLoading(true);

    const questionId = uuidv7();
    const newMsg = {
      id: questionId,
      user_id: currentUser.id,
      question_id: null,
      message: question,
    };

    try {
      const context = await getRelevantChunks(question);
      if (!context) throw new Error("Sin contexto relevante");

      const response = await postData("ask", {
        model: chatMode,
        question,
        context,
      });
      const reply = {
        id: uuidv7(),
        user_id: currentUser.id,
        question_id: questionId,
        message: response.content,
      };

      await postData("messages", [newMsg, reply]);
      setMessages((prev) => [...prev, newMsg, reply]);
      setQuestion("");
    } catch (err) {
      console.error("Error sending message", err);
    } finally {
      setLoading(false);
    }
  }, [question, chatMode, currentUser.id, getRelevantChunks]);

  // Handler for Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <SEO
        title="Chat"
        description="Haz preguntas en lenguaje natural..."
        endpoint="chat"
      />
      <Header title="Chat" />

      <Container className="w-75 w-xxl-50 mx-auto flex-grow-1 overflow-auto">
        {fetching ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
            <p>Cargando mensajes...</p>
          </div>
        ) : messages.length ? (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isAgent={!!msg.question_id}
              avatar={currentUser.avatar}
            />
          ))
        ) : (
          <div className="text-center py-5">
            <p>Hola, ¿cómo puedo ayudarte?</p>
          </div>
        )}
        <div ref={endRef} />
      </Container>

      <Container className="sticky-bottom bg-grey py-2 w-75 w-xxl-50 mx-auto">
        <Form className="d-flex flex-column p-3 rounded-4 chat-input">
          <Form.Control
            as="textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
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
                aria-label="Selecciona el modelo"
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
              onClick={askQuestion}
              disabled={loading}
              aria-label={loading ? "Enviando" : "Enviar"}
              variant="link"
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <i className="bi bi-arrow-up-circle-fill fs-3" />
              )}
            </Button>
          </div>
        </Form>
        <small>{MODELS[chatMode] || "Modelo no definido"}</small>
      </Container>
    </Container>
  );
};

export default Chat;
